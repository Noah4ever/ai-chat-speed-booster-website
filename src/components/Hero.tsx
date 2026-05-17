import Button from "./Button";
import BrowserMark from "./BrowserMark";
import { detectBrowser } from "../lib/browser";
import { links, section } from "../lib/links";
import styles from "./Hero.module.scss";

const browser = detectBrowser();

export default function Hero() {
  const isFirefox = browser === "firefox";
  const isChrome = browser === "chrome" || browser === "edge";

  const mainButton = isFirefox ? (
    <Button href={links.firefox} external size="lg" variant="primary">
      <BrowserMark browser="firefox" size={24} />
      Add to Firefox
    </Button>
  ) : (
    <Button href={links.chrome} external size="lg" variant="primary">
      <BrowserMark browser="chrome" size={24} />
      Add to Chrome
    </Button>
  );

  const otherBrowsersLabel = isFirefox
    ? "Also for Chrome, Edge and Safari"
    : isChrome
      ? "Also for Firefox and Safari"
      : "Available for Chrome, Firefox, Edge and Safari";

  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.headline}>Make your AI chats feel <span className={styles.fast}>fast</span> again.</h1>

        <p className={styles.sub}>
          ChatGPT, Claude and Gemini get slower the longer a chat runs. AI Chat
          Speed Booster keeps only your recent messages on screen, so the page
          stays quick however far back the conversation goes.
        </p>

        <div className={styles.actions}>
          {mainButton}
        </div>

        <a className={styles.more} href={section("install")}>
          {otherBrowsersLabel}
        </a>
      </div>
    </section>
  );
}
