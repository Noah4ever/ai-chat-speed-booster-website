import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { links } from "../lib/links";
import styles from "./GithubStars.module.scss";

function format(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

// Live star count for the extension repo. Renders nothing until the count
// loads, and stays hidden if the GitHub API is unreachable.
export default function GithubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    fetch("https://api.github.com/repos/Noah4ever/ai-chat-speed-booster")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (active && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (stars === null) return null;

  return (
    <a
      className={styles.stars}
      href={`${links.github}/stargazers`}
      target="_blank"
      rel="noreferrer noopener"
    >
      <Star size={15} strokeWidth={2} fill="currentColor" />
      {format(stars)}
      <span className={styles.word}>on GitHub</span>
    </a>
  );
}
