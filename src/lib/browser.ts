export type DetectedBrowser = "chrome" | "firefox" | "edge" | "safari" | "other";

// Best-effort detection of the visitor's browser from the user agent.
// Used to lead with the matching install button.
export function detectBrowser(): DetectedBrowser {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/Firefox\//.test(ua)) return "firefox";
  if (/Edg\//.test(ua)) return "edge";
  if (/Chrome\//.test(ua)) return "chrome";
  if (/Safari\//.test(ua)) return "safari";
  return "other";
}
