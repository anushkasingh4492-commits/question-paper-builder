Paper Generator — Next.js app for creating and exporting practice papers.

Getting started

- Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

- Open http://localhost:3000 in your browser. The app will hot-reload as you edit source files.

What changed in this repo

- Design system: added token files and core component CSS under `tokens/` and `components/`.
- Design-system preview page available at `/design-system` (`app/design-system/page.tsx`).
- Fonts: loaded via a top-level CSS `@import` in `app/globals.css` (Source Serif 4 + Work Sans). If you prefer `next/font` or self-hosted fonts, I can convert this.
- Build: `npm run build` completes successfully after fixing a CSS `@import` ordering warning.

Notes

- The original README referenced `next/font` and a sample Geist font. This template text has been replaced with the repo's current configuration (see `app/globals.css` and `tokens/typography.css`).
- I committed and pushed the design-system changes to `origin/main`.

Learn more

- Next.js docs: https://nextjs.org/docs
- Deploy: https://nextjs.org/docs/app/building-your-application/deploy

If you want I can:
- convert fonts to `next/font` using self-hosted files,
- remove the `app/page.tsx` redirect and show a landing page instead,
- open a PR with these changes and a fuller changelog.
