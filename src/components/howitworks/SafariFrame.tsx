import { Lock, MousePointer2 } from "lucide-react";
import { extensionIcon } from "../../lib/logos";
import DemoChat from "./DemoChat";
import type { Phase } from "./types";
import styles from "./HowItWorks.module.scss";

interface SafariFrameProps {
  phase: Phase;
  enabled: boolean;
  cursor: { x: number; y: number };
  cursorVisible: boolean;
  clicking: boolean;
}

export default function SafariFrame({
  phase,
  enabled,
  cursor,
  cursorVisible,
  clicking,
}: SafariFrameProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.toolbar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>

        <span className={styles.address}>
          <Lock size={11} strokeWidth={2.4} />
          chatgpt.com
        </span>

        <button
          className={enabled ? `${styles.extButton} ${styles.extOn}` : styles.extButton}
          aria-hidden="true"
          tabIndex={-1}
        >
          <img src={extensionIcon} alt="" width={18} height={18} />
        </button>
      </div>

      <div className={styles.viewport}>
        <DemoChat phase={phase} />

        {phase === "enabling" && (
          <div className={styles.popup}>
            <div className={styles.popupTop}>
              <img src={extensionIcon} alt="" width={20} height={20} />
              <span>AI Chat Speed Booster</span>
            </div>
            <div className={styles.popupRow}>
              <span>Enabled</span>
              <span className={enabled ? `${styles.toggle} ${styles.toggleOn}` : styles.toggle}>
                <span className={styles.knob} />
              </span>
            </div>
          </div>
        )}

        {cursorVisible && (
          <div
            className={`${styles.cursor} ${styles[`cursor_${phase}`]}`}
            style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
            aria-hidden="true"
          >
            {clicking && <span className={styles.clickRing} />}
            <MousePointer2 size={22} fill="#fff" color="#1d1d1f" strokeWidth={1.5} />
          </div>
        )}
      </div>
    </div>
  );
}
