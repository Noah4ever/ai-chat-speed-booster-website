import { Code, Globe, ShieldCheck, Sparkles, Undo2, Zap, type LucideIcon } from "lucide-react";
import styles from "./Features.module.scss";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Always fast",
    body: "Long chats load just as quickly as new ones. No more lag, no more freezing.",
  },
  {
    icon: Undo2,
    title: "Nothing gets lost",
    body: "Older messages are just hidden, not deleted. Tap once to bring them back.",
  },
  {
    icon: Globe,
    title: "All your AI tools",
    body: "Works on ChatGPT, Claude, Gemini, and more sites you can add yourself.",
  },
  {
    icon: ShieldCheck,
    title: "Completely private",
    body: "Your messages never leave your browser. No accounts, no servers, no tracking.",
  },
  {
    icon: Sparkles,
    title: "Free and open source",
    body: "No subscription, no upsell. MIT licensed and public on GitHub.",
  },
  {
    icon: Code,
    title: "Every browser",
    body: "Chrome, Firefox, Edge, and Safari. One extension, everywhere you work.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <p className="eyebrow">Features</p>
        <h2>Built to get out of your way.</h2>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.title} className={styles.card}>
              <feature.icon
                className={styles.icon}
                size={22}
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.body}>{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
