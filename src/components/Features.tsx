import {
  AppWindow,
  ArrowUpToLine,
  Code,
  Database,
  EyeOff,
  Gauge,
  Globe,
  Infinity as InfinityIcon,
  Layers,
  ShieldCheck,
  SlidersHorizontal,
  SunMoon,
  Tag,
  Zap,
  type LucideIcon,
} from "lucide-react";
import styles from "./Features.module.scss";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  tag?: string;
}

interface FeatureGroup {
  name: string;
  features: Feature[];
}

const groups: FeatureGroup[] = [
  {
    name: "Speed",
    features: [
      {
        icon: Layers,
        title: "Recent messages first",
        body: "Renders your latest turns, not the whole history.",
      },
      {
        icon: Zap,
        title: "Fast mode",
        body: "Trims the chat in the network response, before render.",
      },
      {
        icon: EyeOff,
        title: "Hide old turns",
        body: "Drops older turns past the visible limit.",
      },
      {
        icon: Database,
        title: "Recent chat cache",
        body: "Caches your last five chats for quick switching.",
      },
    ],
  },
  {
    name: "Control",
    features: [
      {
        icon: ArrowUpToLine,
        title: "Load more on demand",
        body: "Brings older messages back in batches.",
      },
      {
        icon: InfinityIcon,
        title: "Auto load",
        body: "Reveals one older message as you reach the top.",
        tag: "Beta",
      },
      {
        icon: SlidersHorizontal,
        title: "Adjustable limits",
        body: "Set how many messages stay visible.",
      },
      {
        icon: Tag,
        title: "Status badge",
        body: "A corner badge shows hidden versus visible turns.",
      },
      {
        icon: Gauge,
        title: "Request counter",
        body: "Counts the messages you send each week.",
      },
      {
        icon: SunMoon,
        title: "Light and dark popup",
        body: "The settings popup has both themes.",
      },
    ],
  },
  {
    name: "Compatible and open",
    features: [
      {
        icon: Globe,
        title: "Multi-site support",
        body: "ChatGPT, Claude, Gemini, and more you can add.",
      },
      {
        icon: AppWindow,
        title: "Every major browser",
        body: "Chrome, Firefox, Edge, and Safari.",
      },
      {
        icon: ShieldCheck,
        title: "Private by design",
        body: "No message content read, no tracking.",
      },
      {
        icon: Code,
        title: "Open source",
        body: "MIT licensed and public on GitHub.",
      },
    ],
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <p className="eyebrow">Features</p>
        <h2>What the extension does.</h2>

        {groups.map((group) => (
          <div key={group.name} className={styles.group}>
            <h3 className={styles.groupName}>{group.name}</h3>
            <div className={styles.grid}>
              {group.features.map((feature) => (
                <div key={feature.title} className={styles.card}>
                  <feature.icon
                    className={styles.icon}
                    size={20}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <h4 className={styles.title}>
                    {feature.title}
                    {feature.tag && <span className={styles.tag}>{feature.tag}</span>}
                  </h4>
                  <p className={styles.body}>{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
