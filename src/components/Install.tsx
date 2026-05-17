import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BrowserMark, { type BrowserName } from "./BrowserMark";
import { links } from "../lib/links";
import styles from "./Install.module.scss";

interface InstallTarget {
  browser: BrowserName;
  name: string;
  note: string;
  cta: string;
  href?: string;
  to?: string;
}

const targets: InstallTarget[] = [
  {
    browser: "chrome",
    name: "Chrome",
    note: "Install from the Chrome Web Store. Updates on its own.",
    cta: "Add to Chrome",
    href: links.chrome,
  },
  {
    browser: "firefox",
    name: "Firefox",
    note: "Install from Firefox Add-ons. Updates on its own.",
    cta: "Add to Firefox",
    href: links.firefox,
  },
  {
    browser: "edge",
    name: "Edge",
    note: "Edge runs Chrome extensions, so install from the Chrome Web Store.",
    cta: "Get for Edge",
    href: links.chrome,
  },
  {
    browser: "safari",
    name: "Safari",
    note: "Safari needs a short local build with Xcode. The guide covers it.",
    cta: "Read the Safari guide",
    to: "/safari",
  },
];

export default function Install() {
  return (
    <section id="install" className="section">
      <div className="container">
        <p className="eyebrow">Install</p>
        <h2>Add it to your browser.</h2>
        <p className={styles.intro}>
          The extension is free and the same on every browser. Store listings
          can sit a version or two behind a release while a review is pending.
        </p>

        <div className={styles.grid}>
          {targets.map((target) => {
            const content = (
              <>
                <BrowserMark browser={target.browser} size={36} />
                <h3 className={styles.name}>{target.name}</h3>
                <p className={styles.note}>{target.note}</p>
                <span className={styles.cta}>
                  {target.cta}
                  <ArrowRight size={16} strokeWidth={2} />
                </span>
              </>
            );

            return target.to ? (
              <Link key={target.name} to={target.to} className={styles.card}>
                {content}
              </Link>
            ) : (
              <a
                key={target.name}
                href={target.href}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.card}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
