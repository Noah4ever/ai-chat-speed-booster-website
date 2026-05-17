import { useEffect, useRef, useState } from "react";
import { links } from "../lib/links";
import styles from "./PopupShowcase.module.scss";

const POPUP_HTML =
  "https://raw.githubusercontent.com/Noah4ever/ai-chat-speed-booster/main/src/popup/popup.html";
const POPUP_CSS =
  "https://raw.githubusercontent.com/Noah4ever/ai-chat-speed-booster/main/src/popup/popup.css";

// Builds a self-contained document: inline the stylesheet and strip the
// extension script (it needs chrome.* APIs that don't exist on the web).
// State is initialised via DOM manipulation after the iframe loads.
function buildDocument(html: string, css: string): string {
  return html
    .replace(/<link[^>]*popup\.css[^>]*>/i, `<style>${css}</style>`)
    .replace(/<script[^>]*><\/script>/gi, "");
}

export default function PopupShowcase() {
  const [doc, setDoc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [height, setHeight] = useState(420);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch(POPUP_HTML).then((r) => (r.ok ? r.text() : Promise.reject())),
      fetch(POPUP_CSS).then((r) => (r.ok ? r.text() : Promise.reject())),
    ])
      .then(([html, css]) => {
        if (active) setDoc(buildDocument(html, css));
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  function handleLoad() {
    const iframeDoc = frameRef.current?.contentDocument;
    if (!iframeDoc) return;

    const setText = (id: string, text: string) => {
      const el = iframeDoc.getElementById(id);
      if (el) el.textContent = text;
    };

    const setChecked = (id: string) => {
      const el = iframeDoc.getElementById(id) as HTMLInputElement | null;
      if (el) el.checked = true;
    };

    const setValue = (id: string, val: string) => {
      const el = iframeDoc.getElementById(id) as HTMLInputElement | null;
      if (el) el.value = val;
    };

    setText("status-text", "Active on this page");
    setText("version-text", "v1.2.0");
    setChecked("toggle-enabled");
    setChecked("toggle-fetch-intercept");
    setChecked("toggle-hide-old");
    setValue("visible-limit", "20");
    setValue("batch-size", "10");

    const body = iframeDoc.body;
    if (body) setHeight(body.scrollHeight + 8);
  }

  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <p className="eyebrow">The popup</p>
            <h2>Every setting in one popup.</h2>
            <p className={styles.text}>
              No options pages to dig through. The panel on the right is the
              real extension popup, loaded straight from the source on GitHub.
            </p>
            <a
              className={styles.link}
              href={`${links.github}/blob/main/src/popup/popup.html`}
              target="_blank"
              rel="noreferrer noopener"
            >
              See the popup source
            </a>
          </div>

          <div className={styles.stage}>
            {doc && (
              <iframe
                ref={frameRef}
                className={styles.frame}
                title="AI Chat Speed Booster popup"
                srcDoc={doc}
                sandbox="allow-same-origin"
                style={{ height }}
                onLoad={handleLoad}
              />
            )}
            {failed && (
              <p className={styles.fallback}>
                The live popup could not load. View it on GitHub instead.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
