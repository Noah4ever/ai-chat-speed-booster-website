import { useState } from "react";
import Button from "./Button";
import BrowserMark from "./BrowserMark";
import { detectBrowser } from "../lib/browser";
import { links, section } from "../lib/links";
import styles from "./Hero.module.scss";

export default function Hero() {
  const [browser] = useState(detectBrowser);
  const firefoxFirst = browser === "firefox";

  const chrome = (
    <Button
      key="chrome"
      href={links.chrome}
      external
      size="lg"
      variant={firefoxFirst ? "secondary" : "primary"}
    >
      <BrowserMark browser="chrome" size={20} />
      Add to Chrome
    </Button>
  );

  const firefox = (
    <Button
      key="firefox"
      href={links.firefox}
      external
      size="lg"
      variant={firefoxFirst ? "primary" : "secondary"}
    >
      <BrowserMark browser="firefox" size={20} />
      Add to Firefox
    </Button>
  );

  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.headline}>Make your AI chats feel fast again.</h1>

        <p className={styles.sub}>
          ChatGPT, Claude and Gemini get slower the longer a chat runs. AI Chat
          Speed Booster keeps only your recent messages on screen, so the page
          stays quick however far back the conversation goes.
        </p>

        <div className={styles.actions}>
          {firefoxFirst ? [firefox, chrome] : [chrome, firefox]}
        </div>

        <a className={styles.more} href={section("install")}>
          Also for Edge and Safari
        </a>
      </div>
    </section>
  );
}
