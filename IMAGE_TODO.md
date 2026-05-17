# Images to add

Most of the site needs no image files. Browser logos are official SVGs,
interface icons come from lucide, and the "How it works" demo is built from
plain HTML and CSS. Only the items below are still missing.

## Safari guide screenshots

The Safari install page (`/safari`) shows four labelled placeholders. The real
screenshots already exist in the extension repository under `assets/docs/`.
Copy them into `public/images/` and replace each `<Placeholder>` in
`src/pages/Safari.tsx` with an `<img>`.

| Placeholder in the guide   | File in the extension repo            |
| -------------------------- | ------------------------------------- |
| Xcode Accounts tab         | `assets/docs/xcode-account.png`       |
| Signing and Capabilities   | `assets/docs/xcode-signing.png`       |
| Xcode scheme selector      | `assets/docs/xcode-target.png`        |
| Safari Extensions settings | `assets/docs/safari-extension.png`    |

## Social share image

`index.html` points `og:image` and `twitter:image` at `/images/og-image.png`.
Add a 1200x630 image there (logo plus a short line of text) so link previews
render. Without it, shared links show a broken image.
