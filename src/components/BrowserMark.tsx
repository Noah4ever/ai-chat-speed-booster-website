import { Compass } from "lucide-react";
import { browserLogos } from "../lib/logos";

export type BrowserName = "chrome" | "firefox" | "edge" | "safari";

// Chrome, Firefox and Edge use their official logos. Safari's logo is not
// freely licensed, so it falls back to a compass glyph in Safari blue.
export default function BrowserMark({
  browser,
  size = 36,
}: {
  browser: BrowserName;
  size?: number;
}) {
  if (browser === "safari") {
    return <Compass size={size} color="#1d75e8" strokeWidth={1.6} aria-hidden="true" />;
  }

  return (
    <img
      src={browserLogos[browser]}
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
    />
  );
}
