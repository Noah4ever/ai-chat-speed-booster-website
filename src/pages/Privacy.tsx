import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { links } from "../lib/links";
import styles from "./Privacy.module.scss";

const UPDATED = "May 22, 2026";

export default function Privacy() {
  return (
    <main className={styles.page}>
      <div className="container">
        <Link to="/" className={styles.back}>
          <ArrowLeft size={16} strokeWidth={2} />
          Back to home
        </Link>

        <p className="eyebrow">Privacy policy</p>
        <h1 className={styles.title}>Your privacy.</h1>
        <p className={styles.lead}>
          This policy explains what happens to your data when you visit this
          website. Last updated {UPDATED}.
        </p>

        <article className={styles.doc}>
          <div className={styles.summary}>
            <p>
              This site uses cookie-free, privacy-friendly analytics that
              cannot identify you and never follow you across other websites.
              It sets no cookies, shows no ads, and never sells your data.
            </p>
          </div>

          <h2>What this policy covers</h2>
          <p>
            This policy applies to the AI Chat Speed Booster website, the page
            you are reading now. The AI Chat Speed Booster browser extension is
            a separate program with its own behavior; see{" "}
            <strong>The browser extension</strong> below.
          </p>

          <h2>Analytics</h2>
          <p>
            To understand which pages are useful and roughly how many people
            visit, this site uses{" "}
            <a href="https://umami.is" target="_blank" rel="noreferrer noopener">
              Umami
            </a>
            , an open-source, privacy-focused analytics tool. It is self-hosted
            on the same infrastructure as this website, so your visit is not
            shared with Google Analytics or any third-party analytics company.
          </p>
          <p>
            Umami is cookie-free and collects no personal information. It cannot
            identify you and never tracks you across other websites. For each
            visit it records only aggregate, non-identifying details:
          </p>
          <ul>
            <li>the page visited and the referring link</li>
            <li>
              approximate location (country), derived from your IP address
              (the IP address itself is not stored)
            </li>
            <li>browser, operating system, device type, and screen size</li>
          </ul>
          <p>
            There are no user accounts, no visitor profiles, and no advertising
            identifiers.
          </p>

          <h2>Cookies</h2>
          <p>This website does not use cookies.</p>

          <h2>Third-party services</h2>
          <p>A few features load content from GitHub:</p>
          <ul>
            <li>the GitHub star count shown on the home page</li>
            <li>
              the Safari install guide and demo content, fetched live from the
              project&rsquo;s repository
            </li>
          </ul>
          <p>
            When this happens, GitHub receives a normal web request, including
            your IP address, under{" "}
            <a
              href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub&rsquo;s privacy policy
            </a>
            . The install buttons link to the Chrome Web Store and Firefox
            Add-ons; if you click them you visit those sites, which have their
            own privacy policies.
          </p>

          <h2>The browser extension</h2>
          <p>
            The AI Chat Speed Booster extension is a separate, open-source
            program. It runs entirely inside your browser to change how
            messages are displayed on supported AI chat sites. This website
            does not receive any data from the extension. Because the extension
            is open source, you can review exactly what it does in its{" "}
            <a href={links.github} target="_blank" rel="noreferrer noopener">
              source code
            </a>
            .
          </p>

          <h2>Data sharing</h2>
          <p>
            Data collected by this website is never sold, rented, or shared for
            advertising. Aggregate analytics data stays on infrastructure
            operated by the project maintainer.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Please{" "}
            <a href={links.issues} target="_blank" rel="noreferrer noopener">
              open an issue on GitHub
            </a>
            .
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If this policy changes, the &ldquo;last updated&rdquo; date near the
            top of this page will change with it.
          </p>
        </article>
      </div>
    </main>
  );
}
