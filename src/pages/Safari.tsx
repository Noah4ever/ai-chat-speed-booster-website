import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import Button from "../components/Button";
import { links } from "../lib/links";
import styles from "./Safari.module.scss";

const RAW = "https://raw.githubusercontent.com/Noah4ever/ai-chat-speed-booster/main/";
const GUIDE = `${RAW}docs/install/safari.md`;

// The guide lives at docs/install/safari.md, so its relative links and images
// resolve against that folder. This turns them into absolute raw URLs.
function resolveFromGuide(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const segments = `docs/install/${path}`.split("/");
  const out: string[] = [];
  for (const segment of segments) {
    if (segment === "..") out.pop();
    else if (segment !== "." && segment !== "") out.push(segment);
  }
  return RAW + out.join("/");
}

const components: Components = {
  img: ({ src, alt }) => (
    <img
      className={styles.shot}
      src={typeof src === "string" ? resolveFromGuide(src) : undefined}
      alt={alt ?? ""}
      loading="lazy"
    />
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  ),
};

type Status = "loading" | "ready" | "error";

export default function Safari() {
  const [markdown, setMarkdown] = useState("");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let active = true;
    fetch(GUIDE)
      .then((response) => (response.ok ? response.text() : Promise.reject()))
      .then((text) => {
        if (active) {
          setMarkdown(text);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          <Link to="/" className={styles.back}>
            <ArrowLeft size={16} strokeWidth={2} />
            Back to home
          </Link>

          <p className="eyebrow">Safari install guide</p>
          <h1 className={styles.title}>Run the booster in Safari.</h1>
          <p className={styles.lead}>
            Safari has no one-click store listing yet, so it is built locally
            with Xcode. The steps below are loaded live from the guide in the
            repository, so they always match the latest release.
          </p>

          {status === "loading" && <p className={styles.note}>Loading the guide.</p>}

          {status === "error" && (
            <div className={styles.note}>
              <p>The guide could not be loaded right now.</p>
              <Button href={links.safariGuide} external size="lg">
                Read it on GitHub
              </Button>
            </div>
          )}

          {status === "ready" && (
            <article className={styles.doc}>
              <Markdown components={components}>{markdown}</Markdown>
            </article>
          )}

          <div className={styles.foot}>
            <Button href={links.safariGuide} external size="lg" variant="secondary">
              View this guide on GitHub
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
