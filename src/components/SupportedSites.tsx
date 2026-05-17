import { links } from "../lib/links";
import styles from "./SupportedSites.module.scss";

const sites = ["ChatGPT", "Claude", "Gemini"];

export default function SupportedSites() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <div className={styles.row}>
          <div>
            <h2 className={styles.heading}>
              Tested on the chats you already use.
            </h2>
            <p className={styles.text}>
              ChatGPT, Claude and Gemini are supported and tested. Each site is
              one entry in an open config file, so adding another AI chat takes
              a few lines.{" "}
              <a href={links.sitesConfig} target="_blank" rel="noreferrer noopener">
                See sites.config.json
              </a>
              .
            </p>
          </div>
          <ul className={styles.sites}>
            {sites.map((site) => (
              <li key={site}>{site}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
