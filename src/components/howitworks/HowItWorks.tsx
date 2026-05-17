import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import Button from "../Button";
import SafariFrame from "./SafariFrame";
import type { Phase } from "./types";
import styles from "./HowItWorks.module.scss";

const cursorSpots = {
  start: { x: 24, y: 70 },
  extension: { x: 93, y: 13 },
  toggle: { x: 85, y: 36 },
};

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
  const [cursor, setCursor] = useState(cursorSpots.start);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [finished, setFinished] = useState(false);

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
    setCursor(cursorSpots.start);
    setPhase("lagging");
    schedule(60, () => setCursor(cursorSpots.extension));

    schedule(3400, () => {
      click();
      setPhase("enabling");
      setCursor(cursorSpots.toggle);
    });
    schedule(4200, () => {
      click();
      setEnabled(true);
    });
    schedule(5000, () => {
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

        <div className={styles.demo}>
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
