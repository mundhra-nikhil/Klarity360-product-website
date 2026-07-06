"use client";
import { forwardRef } from "react";
import { PRODUCT_NAME } from '@/lib/constants';


interface AnnouncementBarProps {
  /** Called when the user clicks the close button. */
  onClose: () => void;
}

/**
 * AnnouncementBar — dismissible top banner.
 *
 * Uses forwardRef so the parent can hold a ref to the wrapper element and
 * measure its height for the hero sticky offset calculation.
 */
const AnnouncementBar = forwardRef<HTMLDivElement, AnnouncementBarProps>(
  function AnnouncementBar({ onClose }, ref) {
    return (
      <div id="abar-wrap" ref={ref}>
        <div id="abar">
          {PRODUCT_NAME} is now available on Microsoft Fabric Marketplace
          <a href="https://marketplace.microsoft.com/en-us/product/saas/kanerikainc1719422858450.karl-on-fabric?tab=overview" target="_blank" rel="noopener noreferrer">Learn more -&gt;</a>

          <button
            className="aclose"
            type="button"
            aria-label="Close announcement"
            onClick={onClose}
          >
            x
          </button>
        </div>
      </div>
    );
  }
);

export default AnnouncementBar;
