import { Star } from "lucide-react";
import styles from "./Reviews.module.scss";

interface Review {
  name: string;
  stars: number;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Andrew Konesky",
    stars: 5,
    text: "Instantly solved my problem, saved me time, made my work more efficient and prevented me from believing I had to spend more money with OpenAI to get better performance! Thank you!",
  },
  {
    name: "Ashajbfn Psiyfn",
    stars: 5,
    text: "WORKS! Is simple, effortless, and free. Clearly coded with love and care, unlike other extensions. Have been using this for my AI workflow as a software dev. This extension is a must!",
  },
  {
    name: "MDMustahsin",
    stars: 5,
    text: "A true GOAT for making it free. Very simple and minimalistic — works like magic. Thank you very much.",
  },
  {
    name: "A A",
    stars: 5,
    text: "GPT should be the ones fixing their @#$% lag. Instead, you were the ones who created a successful workaround. Thanks!",
  },
  {
    name: "Yanping Wu",
    stars: 5,
    text: "Amazing extension, it makes my ChatGPT page much more smooth.",
  },
  {
    name: "Yury Bolkonsky",
    stars: 5,
    text: "Best opensource tool",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={i < count ? 0 : 1.5}
          fill={i < count ? "currentColor" : "none"}
          className={i < count ? styles.starFilled : styles.starEmpty}
        />
      ))}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue = (name.charCodeAt(0) * 37 + name.charCodeAt(name.length - 1) * 13) % 360;
  return (
    <span
      className={styles.avatar}
      style={{ "--hue": hue } as React.CSSProperties}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <p className="eyebrow">Reviews</p>
        <h2>Loved by&nbsp;people who work with&nbsp;AI.</h2>

        <div className={styles.summary}>
          <span className={styles.ratingBig}>4.8</span>
          <Stars count={5} />
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.meta}>24 ratings</span>
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.meta}>2,000 users</span>
          <a
            href="https://chromewebstore.google.com/detail/ai-chat-speed-booster/fgefgkfmapdjjjdekejanelknedclfik/reviews"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.storeLink}
          >
            See all on Chrome Web Store
          </a>
        </div>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <div key={review.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <Avatar name={review.name} />
                <div className={styles.cardMeta}>
                  <span className={styles.reviewerName}>{review.name}</span>
                  <Stars count={review.stars} />
                </div>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
