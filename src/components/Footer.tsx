import { Link } from "react-router-dom";
import Logo from "./Logo";
import { links, section } from "../lib/links";
import styles from "./Footer.module.scss";

interface FooterLink {
  label: string;
  href?: string;
  to?: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  items: FooterLink[];
}

const columns: FooterColumn[] = [
  {
    title: "Install",
    items: [
      { label: "Chrome", href: links.chrome, external: true },
      { label: "Firefox", href: links.firefox, external: true },
      { label: "Edge", href: links.chrome, external: true },
      { label: "Safari guide", to: "/safari" },
    ],
  },
  {
    title: "Project",
    items: [
      { label: "GitHub", href: links.github, external: true },
      { label: "Releases", href: links.releases, external: true },
      { label: "Report an issue", href: links.issues, external: true },
      { label: "MIT license", href: links.license, external: true },
    ],
  },
  {
    title: "This page",
    items: [
      { label: "How it works", href: section("how") },
      { label: "Features", href: section("features") },
      { label: "Open source", href: section("open-source") },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.tagline}>
              Keeps long AI conversations fast by rendering only your recent
              messages. Free, open source, no tracking.
            </p>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.repo}
            >
              github.com/Noah4ever/ai-chat-speed-booster
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className={styles.colTitle}>{column.title}</p>
              <ul className={styles.colLinks}>
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to}>{item.label}</Link>
                    ) : (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer noopener" : undefined}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} AI Chat Speed Booster. MIT licensed.</span>
          <span>Not affiliated with OpenAI, Anthropic, Google, or any browser vendor.</span>
        </div>
      </div>
    </footer>
  );
}
