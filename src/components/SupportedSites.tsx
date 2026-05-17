import { links } from "../lib/links";
import styles from "./SupportedSites.module.scss";

const sites = ["ChatGPT", "Claude", "Gemini"];

export default function SupportedSites() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <h2 className={styles.heading}>
          Tested on the chats you already use.
        </h2>
        <p className={styles.text}>
          Supported and tested on the big three. Each site is one entry in an
          open config file, so adding another AI chat takes a few lines.{" "}
          <a href={links.sitesConfig} target="_blank" rel="noreferrer noopener">
            See sites.config.json
          </a>
          .
        </p>
        <ul className={styles.chips}>
          {sites.map((site) => (
            <li key={site} className={styles.chip}>
              {site}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
