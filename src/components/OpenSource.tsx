import { ArrowUpRight, Check } from "lucide-react";
import Button from "./Button";
import GithubIcon from "./GithubIcon";
import GithubStars from "./GithubStars";
import { links } from "../lib/links";
import styles from "./OpenSource.module.scss";

const points = [
  "No message content is ever read or sent. The extension only counts and hides message elements on the page.",
  "No analytics and no third-party scripts. Your settings stay in your browser's own storage.",
  "Every line is on GitHub under the MIT license, free to read, build and fork.",
  "Releases, issues and history are public. Pull requests are welcome, especially new site configs.",
];

export default function OpenSource() {
  return (
    <section id="open-source" className={styles.wrap}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.lead}>
            <p className="eyebrow">Open source</p>
            <h2>You can check what it does.</h2>
            <p className={styles.text}>
              A performance extension is only worth trusting if you can read
              it. AI Chat Speed Booster is open source under the MIT license,
              free to use and free to inspect.
            </p>

            <div className={styles.buttons}>
              <Button href={links.github} external size="lg">
                <GithubIcon size={18} />
                View on GitHub
              </Button>
              <Button href={links.releases} external size="lg" variant="secondary">
                Releases
              </Button>
              <Button href={links.issues} external size="lg" variant="secondary">
                Report an issue
                <ArrowUpRight size={17} strokeWidth={2} />
              </Button>
              <GithubStars />
            </div>
          </div>

          <ul className={styles.points}>
            {points.map((point) => (
              <li key={point}>
                <Check size={16} strokeWidth={2.5} className={styles.check} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
