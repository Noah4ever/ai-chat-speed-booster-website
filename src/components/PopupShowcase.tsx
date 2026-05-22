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
function buildDocument(html: string, css: string, theme: "light" | "dark"): string {
  return (
    html
      .replace(/<link[^>]*popup\.css[^>]*>/i, `<style>${css}</style>`)
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      // The popup is themed via [data-theme] on <html>, which popup.ts sets at
      // runtime. That script is stripped, so bake the theme in to avoid an
      // unthemed first paint.
      .replace(/<html\b/i, `<html data-theme="${theme}"`)
  );
}

export default function PopupShowcase() {
  const [doc, setDoc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [height, setHeight] = useState(420);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let active = true;
    const initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    // Always fetch fresh (no-cache) so any popup.html/css update is picked up.
    const opts: RequestInit = { cache: "no-cache" };
    Promise.all([
      fetch(POPUP_HTML, opts).then((r) => (r.ok ? r.text() : Promise.reject())),
      fetch(POPUP_CSS, opts).then((r) => (r.ok ? r.text() : Promise.reject())),
    ])
      .then(([html, css]) => {
        if (active) setDoc(buildDocument(html, css, initialTheme));
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

    // Theme toggle: popup.ts normally wires the sun/moon button and swaps the
    // [data-theme] attribute. That script is stripped, so replicate its
    // applyTheme() here and drive the button ourselves.
    const root = iframeDoc.documentElement;
    const sunIcon = iframeDoc.querySelector<HTMLElement>(
      ".theme-toggle__icon.lucide-sun",
    );
    const moonIcon = iframeDoc.querySelector<HTMLElement>(
      ".theme-toggle__icon.lucide-moon",
    );
    const themeToggle = iframeDoc.getElementById("theme-toggle");

    const applyTheme = (dark: boolean) => {
      root.setAttribute("data-theme", dark ? "dark" : "light");
      themeToggle?.setAttribute("aria-pressed", String(!dark));
      sunIcon?.classList.toggle("hidden", !dark);
      moonIcon?.classList.toggle("hidden", dark);
    };

    applyTheme(root.getAttribute("data-theme") !== "light");
    themeToggle?.addEventListener("click", () => {
      applyTheme(root.getAttribute("data-theme") === "light");
    });

    // The popup CSS hides .popup-settings by default (display:none) because the
    // extension JS shows it only on supported sites. Force it visible here.
    const settings = iframeDoc.querySelector<HTMLElement>(".popup-settings");
    if (settings) settings.style.display = "flex";

    // Show the weekly request counter (hidden attribute set in HTML).
    const counter = iframeDoc.getElementById("request-counter");
    if (counter) counter.removeAttribute("hidden");

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
    setText("version-text", "v1.4.5");
    setChecked("toggle-enabled");
    setChecked("toggle-fetch-intercept");
    setChecked("toggle-hide-old");
    setChecked("toggle-status");
    setValue("visible-limit", "3");
    setValue("batch-size", "3");

    // Activate the bottom-right position picker button to match real default.
    const picker = iframeDoc.querySelector<HTMLElement>(
      '.position-picker__btn[data-pos="bottom-right"]',
    );
    if (picker) picker.classList.add("active");

    // Show a realistic request count.
    setText("request-count-value", "154");
    setValue("request-limit-input", "3000");
    setText("request-counter-hint", `Resets Mon, May 18`);

    // Resize iframe to fit the full rendered height now that settings are visible.
    requestAnimationFrame(() => {
      const body = iframeDoc.body;
      if (body) setHeight(body.scrollHeight + 4);
    });
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
