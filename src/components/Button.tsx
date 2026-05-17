import type { ReactNode } from "react";
import styles from "./Button.module.scss";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], styles[size], className].join(" ");

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noreferrer noopener" }
      : {};
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        {...externalProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
