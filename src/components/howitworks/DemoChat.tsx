import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
import { conversation, initialWindow, loadStep, type Phase } from "./types";
import styles from "./HowItWorks.module.scss";

const staticSlice = conversation.slice(-18);

function Bubble({ id, role, lines }: (typeof conversation)[number]) {
  const isUser = role === "user";
  return (
    <div className={isUser ? styles.rowUser : styles.rowAi}>
      <div className={isUser ? styles.bubbleUser : styles.bubbleAi}>
        {Array.from({ length: lines }).map((_, line) => (
          <span
            key={line}
            className={styles.line}
            style={{ width: `${92 - line * 13 - ((id + line) % 3) * 7}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function DemoChat({ phase }: { phase: Phase }) {
  const live = phase === "ready";
  const [count, setCount] = useState(initialWindow);
  const scrollRef = useRef<HTMLDivElement>(null);

  // When the booster turns on, jump the view to the latest messages.
  useEffect(() => {
    if (live && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [live]);

  function loadOlder() {
    const el = scrollRef.current;
    const before = el ? el.scrollHeight : 0;
    setCount((current) => Math.min(current + loadStep, conversation.length));
    // Keep the reading position steady after older messages are prepended.
    requestAnimationFrame(() => {
      if (el) el.scrollTop += el.scrollHeight - before;
    });
  }

  if (!live) {
    return (
      <div className={styles.chatStatic}>
        <div
          className={
            phase === "lagging"
              ? `${styles.stream} ${styles.streamLagging}`
              : styles.stream
          }
        >
          {staticSlice.map((message) => (
            <Bubble key={message.id} {...message} />
          ))}
        </div>
      </div>
    );
  }

  const shown = conversation.slice(conversation.length - count);
  const allLoaded = count >= conversation.length;

  return (
    <div className={styles.chatLive} ref={scrollRef}>
      <div className={styles.stream}>
        {allLoaded ? (
          <p className={styles.startMarker}>Start of the conversation</p>
        ) : (
          <button className={styles.loadOlder} onClick={loadOlder}>
            <ChevronUp size={16} strokeWidth={2} />
            Load older messages
          </button>
        )}
        {shown.map((message) => (
          <Bubble key={message.id} {...message} />
        ))}
      </div>
    </div>
  );
}
