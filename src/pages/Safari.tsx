import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Button from "../components/Button";
import Placeholder from "../components/Placeholder";
import { links } from "../lib/links";
import styles from "./Safari.module.scss";

function Code({ children }: { children: string }) {
  return <pre className={styles.code}>{children}</pre>;
}

interface Step {
  title: string;
  body: ReactNode;
}

const requirements = [
  "A Mac running macOS",
  "Xcode, free from the Mac App Store",
  "Node.js 18 or newer",
  "A free Apple ID",
];

const steps: Step[] = [
  {
    title: "Clone the repo and install dependencies",
    body: (
      <Code>{`git clone https://github.com/Noah4ever/ai-chat-speed-booster
cd ai-chat-speed-booster
npm install`}</Code>
    ),
  },
  {
    title: "Build the Safari extension files",
    body: <Code>npm run safari:setup</Code>,
  },
  {
    title: "Open the Xcode project",
    body: (
      <Code>open "safari-app/AI Chat Speed Booster/AI Chat Speed Booster.xcodeproj"</Code>
    ),
  },
  {
    title: "Add your Apple ID to Xcode",
    body: (
      <>
        <p>
          This lets Xcode sign the app, and you only do it once. In Xcode open{" "}
          <strong>Settings</strong> with ⌘, then the <strong>Accounts</strong>{" "}
          tab, click <strong>Add Apple Account</strong> and sign in.
        </p>
        <Placeholder
          label="Xcode Settings, Accounts tab, with the Apple ID added. Available in the extension repo at assets/docs/xcode-account.png."
        />
      </>
    ),
  },
  {
    title: "Set your team on the macOS targets",
    body: (
      <>
        <p>
          Select the <strong>AI Chat Speed Booster</strong> project, then under{" "}
          <strong>Targets</strong> open <strong>Signing &amp; Capabilities</strong>{" "}
          and pick your name under <strong>Team</strong>. It shows as "Personal
          Team". Do this for both the <strong>macOS (App)</strong> and{" "}
          <strong>macOS (Extension)</strong> targets.
        </p>
        <p className={styles.tip}>
          If Xcode reports "Failed to register bundle identifier", click{" "}
          <strong>Try Again</strong>. It usually clears on its own.
        </p>
        <Placeholder
          label="Signing & Capabilities tab with the team selected. Available in the extension repo at assets/docs/xcode-signing.png."
        />
      </>
    ),
  },
  {
    title: "Run the app",
    body: (
      <>
        <p>
          Set the scheme in the top bar to <strong>macOS (App)</strong> and{" "}
          <strong>My Mac</strong>, then press <strong>Run</strong>. Xcode asks
          for your Mac login password to sign the build.
        </p>
        <Placeholder
          label="Xcode top bar with the macOS (App) scheme selected. Available in the extension repo at assets/docs/xcode-target.png."
        />
      </>
    ),
  },
  {
    title: "Enable the extension in Safari",
    body: (
      <>
        <p>
          When the app launches it asks you to enable the extension. Open{" "}
          <strong>Safari, Settings, Extensions</strong> and tick{" "}
          <strong>AI Chat Speed Booster</strong>.
        </p>
        <Placeholder
          label="Safari Settings, Extensions, with the booster enabled. Available in the extension repo at assets/docs/safari-extension.png."
        />
      </>
    ),
  },
  {
    title: "Allow it on your AI chat sites",
    body: (
      <p>
        Click the extension icon in the Safari toolbar and allow it to run on
        the sites you use, such as chatgpt.com and claude.ai.
      </p>
    ),
  },
];

export default function Safari() {
  return (
    <main className={styles.page}>
      <div className="container">
        <Link to="/" className={styles.back}>
          <ArrowLeft size={16} strokeWidth={2} />
          Back to home
        </Link>

        <p className="eyebrow">Safari install guide</p>
        <h1 className={styles.title}>Run the booster in Safari.</h1>
        <p className={styles.lead}>
          Safari has no one-click store listing yet, so the extension is built
          locally with Xcode. It is free. You only need a free Apple ID, not a
          paid developer account. Plan for about ten minutes.
        </p>

        <div className={styles.requirements}>
          <h2 className={styles.reqTitle}>Before you start</h2>
          <ul>
            {requirements.map((item) => (
              <li key={item}>
                <Check size={16} strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.num}>{index + 1}</span>
              <div className={styles.stepBody}>
                <h2 className={styles.stepTitle}>{step.title}</h2>
                {step.body}
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.foot}>
          <p>
            The guide in the repository is kept current with every release.
          </p>
          <div className={styles.footActions}>
            <Button href={links.safariGuide} external size="lg">
              Guide on GitHub
              <ArrowUpRight size={18} strokeWidth={2} />
            </Button>
            <Button href={links.issues} external size="lg" variant="secondary">
              Ask a question
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
