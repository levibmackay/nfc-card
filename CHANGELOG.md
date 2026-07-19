# Changelog

## 2026-07-19
- Rewrote the site as plain HTML, CSS, and JS for faster loading. No more React, TypeScript, Vite, or build step; the deploy workflow now publishes the repo root as-is.
- "Save Contact" now downloads a prebuilt `Levi-Mackay.vcf` instead of generating one in JS.
- Dropped the Inter webfont in favor of the system font stack (SF Pro on Apple devices).
- Moved everything from `public/` to the repo root; all asset paths are relative, so the site works under any base path.

## 2026-07-16
- Minor tweaks and touch-ups.
