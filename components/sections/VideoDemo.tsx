"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import React from "react";
import styles from "@/app/styles/VideoDemo.module.css";


/* ─── Component ─────────────────────────────────────────────────────────── */
import { chapters } from "@/lib/data/videoChapters";
import type { Chapter } from "@/lib/data/videoChapters";
import { PRODUCT_NAME, BASE_PATH } from '@/lib/constants';


interface ChapterSegment extends Chapter {
  duration: number;
  segmentProgress: number;
}

/**
 * VideoDemo — demo video player with a chapter sidebar.
 * Owns all video state internally; no props required.
 */
export default function VideoDemo() {
  /* ── All original state & refs preserved ── */
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const demoVideoRef = useRef<HTMLVideoElement>(null);

  /* ── Refs for measuring title-span positions (not the whole button) ── */
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  /* ── State for measured dot positions (percentages along the bar) ── */
  const [dotPositions, setDotPositions] = useState<number[]>([]);

  /* ── Measure title-span center positions relative to the bar ── */
  const measureTabPositions = useCallback(() => {
    const barEl = barWrapRef.current;
    if (!barEl) return;

    const barRect = barEl.getBoundingClientRect();
    const barHeight = barRect.height;
    if (barHeight === 0) return;

    const positions: number[] = [];
    for (let i = 0; i < chapters.length; i++) {
      const titleEl = titleRefs.current[i];
      if (!titleEl) {
        // Fallback: use timestamp proportion
        const fallbackDuration = chapters[chapters.length - 1].timestamp + 10;
        const dur = videoDuration || fallbackDuration;
        positions.push((chapters[i].timestamp / dur) * 100);
        continue;
      }
      const titleRect = titleEl.getBoundingClientRect();
      // Vertical center of the title span, relative to the bar's top
      const titleCenterY = titleRect.top + titleRect.height / 2 - barRect.top;
      const pct = Math.max(0, Math.min(100, (titleCenterY / barHeight) * 100));
      positions.push(pct);
    }
    setDotPositions(positions);
  }, [videoDuration]);

  /* ── Recalculate on mount, resize, active chapter change, and video duration changes ── */

  // When the active chapter changes the description expands/collapses over 200ms.
  // We wait 210ms (just past the transition end) so all tabs have settled.
  useEffect(() => {
    const id = setTimeout(measureTabPositions, 210);
    return () => clearTimeout(id);
  }, [measureTabPositions, activeChapter]);

  useEffect(() => {
    // Observe both the bar and the tabs container so any height change
    // (e.g. description opening/closing) triggers an accurate remeasure.
    const observer = new ResizeObserver(measureTabPositions);
    if (barWrapRef.current) observer.observe(barWrapRef.current);
    if (tabsRef.current) observer.observe(tabsRef.current);
    window.addEventListener("resize", measureTabPositions);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureTabPositions);
    };
  }, [measureTabPositions]);

  /* ── Original handler logic preserved exactly ── */
  const updateVideoState = (video: HTMLVideoElement | null): void => {
    if (!video?.duration) return;

    const progress = Math.max(0, Math.min(1, video.currentTime / video.duration));
    setVideoTime(video.currentTime);
    setVideoProgress(progress * 100);

    const nextActive = chapters.reduce<number>(
      (current, chapter, index) =>
        chapter.timestamp <= video.currentTime ? index : current,
      0
    );
    setActiveChapter(nextActive);
  };

  const handleTimeUpdate = (): void => updateVideoState(demoVideoRef.current);

  const handleLoadedMetadata = (): void => {
    const video = demoVideoRef.current;
    if (video?.duration) {
      setVideoDuration(video.duration);
      updateVideoState(video);
    }
  };

  const seekToChapter = (timestamp: number, index: number): void => {
    const video = demoVideoRef.current;
    if (video) {
      video.currentTime = timestamp;
      updateVideoState(video);
      video.play().catch(() => {});
    }
    setActiveChapter(index);
  };

  /* ── Derived values ── */
  const fallbackDuration = chapters[chapters.length - 1].timestamp + 10;
  const measuredDuration = videoDuration || fallbackDuration;

  /**
   * Calculate the progress bar fill height as a percentage of the bar.
   *
   * The fill must be proportional to section durations (not raw time),
   * so that the fill reaches each dot exactly when that chapter is active.
   *
   * We map videoTime into the [dotPositions[i], dotPositions[i+1]] range
   * proportionally to where we are within that chapter's time segment.
   */
  const getBarFillPct = (): number => {
    if (dotPositions.length === 0 || dotPositions.length !== chapters.length) {
      // Fallback to raw time proportion
      return videoProgress;
    }

    const currentTime = videoTime;

    // Find which chapter segment we're in
    let segmentIndex = 0;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].timestamp) {
        segmentIndex = i;
        break;
      }
    }

    const chapterStart = chapters[segmentIndex].timestamp;
    const chapterEnd =
      segmentIndex < chapters.length - 1
        ? chapters[segmentIndex + 1].timestamp
        : measuredDuration;
    const segmentDuration = chapterEnd - chapterStart;

    const dotStart = dotPositions[segmentIndex];
    const dotEnd =
      segmentIndex < dotPositions.length - 1
        ? dotPositions[segmentIndex + 1]
        : 100;

    if (segmentDuration <= 0) return dotStart;

    const segmentProgress = Math.max(
      0,
      Math.min(1, (currentTime - chapterStart) / segmentDuration)
    );
    return dotStart + segmentProgress * (dotEnd - dotStart);
  };

  const barFillPct = getBarFillPct();

  return (
    <>
      <section className={styles["vd-section"]}>
        <div className={styles["vd-inner-row"]}>
        {/* ── Left: tab list ── */}
        <div ref={tabsRef} className={styles["vd-tabs"]} role="tablist" aria-label={`${PRODUCT_NAME} feature tabs`}>
          {chapters.map((chapter, i) => (
            <button
              key={chapter.title}
              role="tab"
              aria-selected={activeChapter === i}
              type="button"
              className={`${styles["vd-tab"]} ${activeChapter === i ? styles["vd-active"] : ""}`}
              onClick={() => seekToChapter(chapter.timestamp, i)}
            >
              <span
                ref={(el) => { titleRefs.current[i] = el; }}
                className={styles["vd-tab-title"]}
              >
                {chapter.title}
              </span>
              <span className={styles["vd-tab-desc"]}>{chapter.description}</span>
            </button>
          ))}
        </div>

        {/* ── Right: single video with padding wrapper ── */}
        <div className={styles["vd-video-col"]}>
          <div className={styles["vd-video-pad"]}>
            <div className={styles["vd-video-wrapper"]}>
              {/* ── Middle: golden vertical progress bar (Moved to precisely match video height) ── */}
              <div
                ref={barWrapRef}
                className={styles["vd-bar-wrap"]}
                aria-hidden="true"
              >
                {/* Fill height mapped to dot positions for proportional section scaling */}
                <div
                  className={styles["vd-bar-fill"]}
                  style={{ height: `${barFillPct}%` }}
                />

                {/* Per-chapter marker dots at measured tab-center positions */}
                {chapters.map((chapter, i) => {
                  const topPct =
                    dotPositions.length === chapters.length
                      ? dotPositions[i]
                      : (chapter.timestamp / measuredDuration) * 100;
                  return (
                    <div
                      key={chapter.title}
                      className={`${styles["vd-dot"]} ${activeChapter === i ? styles["vd-dot-active"] : ""}`}
                      style={{ top: `${topPct}%` }}
                      onClick={() => seekToChapter(chapter.timestamp, i)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Jump to ${chapter.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          seekToChapter(chapter.timestamp, i);
                        }
                      }}
                    />
                  );
                })}
              </div>

              <video
                ref={demoVideoRef}
                id="demo-video"
                className={styles["vd-video"]}
                autoPlay
                muted
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                onLoadedMetadata={handleLoadedMetadata}
                onSeeked={handleTimeUpdate}
                onTimeUpdate={handleTimeUpdate}
              >
                <source src={`${BASE_PATH}/klarity360-demo.mp4`} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
