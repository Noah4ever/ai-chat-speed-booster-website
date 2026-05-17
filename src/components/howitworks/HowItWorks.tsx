import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import Button from "../Button";
import SafariFrame from "./SafariFrame";
import type { Phase } from "./types";
import styles from "./HowItWorks.module.scss";

const startPoint = { x: 24, y: 74 };

const captions: Record<Phase, string> = {
  idle: "A long conversation, before and after the booster. Press play to watch.",
  lagging: "Scrolling lags because the page keeps redrawing every message in the thread.",
  enabling: "The cursor turns AI Chat Speed Booster on.",
  ready: "Scrolling is smooth again. Scroll up inside the window and load older messages yourself.",
};

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HowItWorks() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cursor, setCursor] = useState(startPoint);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [finished, setFinished] = useState(false);

  const demoRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const schedule = (delay: number, action: () => void) => {
    timers.current.push(window.setTimeout(action, delay));
  };

  const click = () => {
    setClicking(true);
    schedule(360, () => setClicking(false));
  };

  // Measures a marked element and returns its centre as a percentage of the
  // browser frame, so the cursor lands exactly on it at any size.
  const pointAt = (name: "ext" | "toggle") => {
    const root = demoRef.current;
    if (!root) return null;
    const frame = root.querySelector('[data-demo="frame"]');
    const target = root.querySelector(`[data-demo="${name}"]`);
    if (!frame || !target) return null;
    const f = frame.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    return {
      x: ((t.left + t.width / 2 - f.left) / f.width) * 100,
      y: ((t.top + t.height / 2 - f.top) / f.height) * 100,
    };
  };

  const play = useCallback(() => {
    clearTimers();
    setFinished(false);
    setEnabled(false);

    if (reducedMotion()) {
      setPhase("ready");
      setEnabled(true);
      setCursorVisible(false);
      setFinished(true);
      return;
    }

    setCursorVisible(true);
    setCursor(startPoint);
    setPhase("lagging");

    // Drift jankily towards the extension icon.
    schedule(60, () => {
      const point = pointAt("ext");
      if (point) setCursor(point);
    });

    // Open the popup, then move to its toggle.
    schedule(3400, () => {
      click();
      setPhase("enabling");
    });
    schedule(3540, () => {
      const point = pointAt("toggle");
      if (point) setCursor(point);
    });
    schedule(4300, () => {
      click();
      setEnabled(true);
    });

    // Hand control back to the visitor.
    schedule(5100, () => {
      setPhase("ready");
      setCursorVisible(false);
      setFinished(true);
    });
  }, [clearTimers]);

  return (
    <section id="how" className="section">
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 className={styles.heading}>See a slow chat speed up.</h2>
        <p className={styles.intro}>
          This is a small browser window running a long AI chat. Play the demo
          to watch scrolling stall, then watch it recover the moment the
          extension is switched on.
        </p>

        <div className={styles.demo} ref={demoRef}>
          <SafariFrame
            phase={phase}
            enabled={enabled}
            cursor={cursor}
            cursorVisible={cursorVisible}
            clicking={clicking}
          />

          <div className={styles.panel}>
            <p className={styles.caption}>{captions[phase]}</p>
            {phase === "idle" ? (
              <Button size="lg" onClick={play}>
                <Play size={18} fill="currentColor" strokeWidth={0} />
                See how it works
              </Button>
            ) : (
              <Button size="lg" variant="secondary" onClick={play}>
                <RotateCcw size={18} strokeWidth={2} />
                Play again
              </Button>
            )}
            {finished && (
              <p className={styles.hint}>
                The window above is live. Scroll it and use Load older messages.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
