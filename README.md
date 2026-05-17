# AI Chat Speed Booster website

Marketing site for the [AI Chat Speed Booster](https://github.com/Noah4ever/ai-chat-speed-booster)
browser extension.

Built with React, TypeScript, Vite and SCSS. It is a single page plus a Safari
install guide, with one interactive demo that shows a long AI chat lagging and
then recovering once the extension is switched on.

## Develop

```bash
npm install
npm run dev
```

The dev server runs under the `/ai-chat-speed-booster/` base path, so open the
URL Vite prints (it already includes the prefix).

## Build

```bash
npm run build      # type-check, then build into dist/
npm run preview    # serve the built site locally
```

## Deploy

The site is served from `projects.thiering.org/ai-chat-speed-booster`. The base
path is set in `vite.config.ts` and the router `basename` in `src/App.tsx`.

It uses client-side routing, so the host needs a single-page fallback that
serves `index.html` for unknown paths (for example `/ai-chat-speed-booster/safari`).

## Layout

```
src/
  styles/        design tokens, reset, base styles
  components/    Nav, Hero, Features, Install, OpenSource, Footer and friends
    howitworks/  the interactive demo (state machine, Safari frame, chat)
  pages/         Home and the Safari install guide
  lib/           external links and imported logo assets
public/          favicon and static images
```

## Assets

Browser logos are the official SVGs from Wikimedia Commons. Interface icons
come from [lucide](https://lucide.dev). Screenshots that still need to be added
are listed in `IMAGE_TODO.md`.
