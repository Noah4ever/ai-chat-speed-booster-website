import styles from "./Placeholder.module.scss";

// A labelled stand-in for a screenshot that still needs to be added.
// Each one matches an entry in IMAGE_TODO.md.
export default function Placeholder({
  label,
  ratio = "16 / 10",
}: {
  label: string;
  ratio?: string;
}) {
  return (
    <div className={styles.placeholder} style={{ aspectRatio: ratio }} role="img" aria-label={label}>
      <span className={styles.tag}>Screenshot to add</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
