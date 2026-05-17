import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import Button from "../Button";
import SafariFrame from "./SafariFrame";
import type { Phase } from "./types";
import styles from "./HowItWorks.module.scss";

const captions: Record<Phase, string> = {
  idle: "A long conversation, before and after the booster. Press play to watch.",
  lagging: "Without the extension, scrolling stutters because the browser redraws every message.",
  enabling: "One click. The extension toggle turns on.",
  boosted: "With the extension enabled, the same chat scrolls smoothly.",
  ready: "Try it yourself. Scroll inside the window and load older messages.",
};

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HowItWorks() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cursor, setCursor] = useState({ x: 48, y: 66 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [clicking, setClicking] = useState(false);

  const demoRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const play = useCallback(() => {
    clearTimers();
    setEnabled(false);

    const schedule = (delay: number, action: () => void) => {
      timers.current.push(window.setTimeout(action, delay));
    };

    const click = () => {
      setClicking(true);
      schedule(360, () => setClicking(false));
    };

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

    if (reducedMotion()) {
      setPhase("ready");
      setEnabled(true);
      setCursorVisible(false);
      return;
    }

    setCursorVisible(false);
    setCursor({ x: 48, y: 66 });
    setPhase("lagging");

    // 50 ms after first render: cursor appears and starts lagging toward the ext icon.
    schedule(50, () => {
      setCursorVisible(true);
      const point = pointAt("ext");
      if (point) setCursor(point);
    });

    // Cursor arrives near ext icon — click it, popup opens.
    schedule(3300, () => {
      click();
      setPhase("enabling");
    });

    // Cursor lags to the toggle button.
    schedule(3350, () => {
      const point = pointAt("toggle");
      if (point) setCursor(point);
    });

    // Click the toggle — extension enabled.
    schedule(4050, () => {
      click();
      setEnabled(true);
    });

    // Smooth animation phase — cursor drifts to center-bottom.
    schedule(4200, () => {
      setPhase("boosted");
      setCursor({ x: 50, y: 82 });
    });

    // Cursor disappears.
    schedule(4700, () => {
      setCursorVisible(false);
    });

    // After smooth scroll cycles finish, hand control to the visitor.
    schedule(8100, () => {
      setPhase("ready");
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
          </div>
        </div>
      </div>
    </section>
  );
}
