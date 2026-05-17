import Button from "./Button";
import BrowserMark from "./BrowserMark";
import { links, section } from "../lib/links";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <p className="eyebrow">Browser extension</p>

        <h1 className={styles.headline}>Long AI chats stay fast.</h1>

        <p className={styles.sub}>
          ChatGPT, Claude and Gemini slow down once a conversation gets long,
          because the page keeps redrawing every message you have ever sent.
          AI Chat Speed Booster shows only the recent ones and loads the rest
          when you ask for them.
        </p>

        <div className={styles.actions}>
          <Button href={links.chrome} external size="lg">
            <BrowserMark browser="chrome" size={20} />
            Add to Chrome
          </Button>
          <Button href={links.firefox} external size="lg" variant="secondary">
            <BrowserMark browser="firefox" size={20} />
            Add to Firefox
          </Button>
        </div>

        <p className={styles.meta}>
          <a href={section("install")}>Also for Edge and Safari</a>
          <span aria-hidden="true">·</span>
          Free and open source
          <span aria-hidden="true">·</span>
          No tracking
        </p>
      </div>
    </section>
  );
}
