// Every external link the site points at, kept in one place.

const repo = "https://github.com/Noah4ever/ai-chat-speed-booster";
const chromeStore =
  "https://chromewebstore.google.com/detail/ai-chat-speed-booster/fgefgkfmapdjjjdekejanelknedclfik";

export const links = {
  chrome: chromeStore,
  chromeReviews: `${chromeStore}/reviews`,
  firefox: "https://addons.mozilla.org/en-US/firefox/addon/ai-chat-speed-booster/",
  github: repo,
  issues: `${repo}/issues`,
  releases: `${repo}/releases`,
  license: `${repo}/blob/main/LICENSE`,
  sitesConfig: `${repo}/blob/main/sites.config.json`,
  safariGuide: `${repo}/blob/main/docs/install/safari.md`,
};

// The site lives under a sub-path, so in-page anchors need that prefix to
// also work when you are on the /safari route.
export const home = import.meta.env.BASE_URL;
export const section = (id: string) => `${home}#${id}`;
