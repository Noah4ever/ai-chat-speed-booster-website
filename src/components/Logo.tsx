import { extensionIcon } from "../lib/logos";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <span className={styles.logo}>
      <img src={extensionIcon} alt="" width={26} height={26} className={styles.mark} />
      <span className={styles.text}>Speed Booster</span>
    </span>
  );
}
