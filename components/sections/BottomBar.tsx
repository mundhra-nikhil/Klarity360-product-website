import Link from "next/link";

/**
 * BottomBar — thin strip below the hero showing target industries and a CTA.
 * Stateless; no props required.
 */
export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="bb-left">
        <span className="bb-label">Built for enterprise teams in:</span>
        <div className="industries">
          <Link href="/manufacturing" className="industry cursor-pointer text-decoration-none">Manufacturing</Link>
          <Link href="/retail" className="industry cursor-pointer text-decoration-none">Retail</Link>
          <Link href="/pharma" className="industry cursor-pointer text-decoration-none">Pharma</Link>
          <Link href="/banking" className="industry cursor-pointer text-decoration-none">Financial Services</Link>
        </div>
      </div>
      <div className="bb-right">
        <a href="#">See how it works -&gt;</a>
      </div>
    </div>
  );
}
