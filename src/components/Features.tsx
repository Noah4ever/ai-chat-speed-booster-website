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
        body: "The page renders only your latest turns, three by default, so the browser stops redrawing the whole history on every scroll.",
      },
      {
        icon: Zap,
        title: "Fast mode",
        body: "Trims the conversation inside the network response before the app renders it, which is quicker than hiding messages afterwards.",
      },
      {
        icon: EyeOff,
        title: "Hide old turns",
        body: "Removes older turns from the page beyond the visible limit. You can switch it off per site if a page renders better on its own.",
      },
      {
        icon: Database,
        title: "Recent chat cache",
        body: "Keeps your five most recent conversations cached so switching between chats stays quick.",
      },
    ],
  },
  {
    name: "Control",
    features: [
      {
        icon: ArrowUpToLine,
        title: "Load more on demand",
        body: "A button at the top of the thread brings back older messages in batches, whenever you want them.",
      },
      {
        icon: InfinityIcon,
        title: "Auto load",
        body: "Brings back one older message as you reach the top of the thread, with no clicking.",
        tag: "Beta",
      },
      {
        icon: SlidersHorizontal,
        title: "Adjustable limits",
        body: "Choose how many messages stay visible (1 to 200) and how many each load reveals (1 to 50).",
      },
      {
        icon: Tag,
        title: "On-page status badge",
        body: "A small badge shows how many turns are hidden versus visible. Put it in any corner, or hide it.",
      },
      {
        icon: Gauge,
        title: "Weekly request counter",
        body: "Counts the messages you send each week and resets on Monday. Set a limit to match your plan.",
      },
      {
        icon: SunMoon,
        title: "Light and dark popup",
        body: "The settings popup has a clean light and dark theme you can switch with one tap.",
      },
    ],
  },
  {
    name: "Compatible and open",
    features: [
      {
        icon: Globe,
        title: "Multi-site support",
        body: "Tested on ChatGPT, Claude and Gemini. Other AI chats can be added with one entry in a config file.",
      },
      {
        icon: AppWindow,
        title: "Every major browser",
        body: "Built for Chrome, Firefox and Edge, with a build-it-yourself path for Safari.",
      },
      {
        icon: ShieldCheck,
        title: "Private by design",
        body: "No message content is read or sent anywhere. No analytics, no tracking. Settings stay in your browser.",
      },
      {
        icon: Code,
        title: "Open source",
        body: "The whole extension is on GitHub under the MIT license, so anyone can read or audit it.",
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
                <div key={feature.title} className={styles.feature}>
                  <feature.icon
                    className={styles.icon}
                    size={22}
                    strokeWidth={1.6}
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
