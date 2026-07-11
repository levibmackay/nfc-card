# Levi Mackay — NFC Card Link Hub

A single-screen, Apple-inspired landing page built for an NFC business card. Someone taps the card, lands here, and can immediately download your resume, save your contact card, email you, or jump to your other links (GitHub, LinkedIn, portfolio).

Built with React 19, TypeScript, Vite, and Tailwind CSS v4. Deploys to GitHub Pages automatically via GitHub Actions on every push to `main`.

This is a **separate, standalone repo** from [`levibmackay/Portfolio`](https://github.com/levibmackay/Portfolio) (your full portfolio site). This one exists purely so an NFC tap has a fast, minimal landing spot — the "Portfolio" link in the socials row points back to your real site.

**Prerendered, not just client-rendered.** The build renders the page to static HTML at build time (`scripts/prerender.mjs` + `src/entry-server.tsx`) and injects it into `dist/index.html`, then the client hydrates on top of it (`hydrateRoot` in `src/main.tsx`). This means a phone paints the real name/tagline/buttons the instant the HTML arrives, instead of showing a blank screen until the JS bundle downloads and executes. One consequence: don't reach for browser-only APIs (`window`, `document`, `localStorage`, etc.) directly in a component's render body — only inside `useEffect`/event handlers — or the server render will throw.

## 1. Folder structure

```
nfc-card/
├── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages on push to main
├── scripts/
│   └── prerender.mjs              # Build-time SSR pass, injects static HTML into dist/index.html
├── public/                        # Static files copied as-is to the site root
│   ├── favicon.svg                # Browser tab icon (gradient "LM" monogram)
│   ├── apple-touch-icon.png       # iOS "Add to Home Screen" icon
│   ├── og-image.png               # Social share preview image (1200×630)
│   ├── resume.pdf                 # ⚠️ Placeholder — replace with your real resume
│   ├── headshot.jpg               # Your photo — swap this file to change it
│   ├── robots.txt
│   ├── sitemap.xml
│   └── .nojekyll                  # Tells GitHub Pages not to run Jekyll on the build
├── index.html                     # Document shell + SEO/OpenGraph meta tags
├── src/
│   ├── main.tsx                   # Client entry point, hydrates the prerendered HTML
│   ├── entry-server.tsx           # Build-time SSR entry, used only by scripts/prerender.mjs
│   ├── App.tsx                    # Composes the page: gradient bg + Hero + Footer
│   ├── index.css                  # Design tokens, dark theme, glassmorphism, animations
│   ├── config/
│   │   └── site.ts                # ⭐ All editable content lives here — start here
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx           # Name, taglines, action buttons, socials
│   │   │   └── Footer.tsx
│   │   └── ui/                    # Reusable primitives (Button, SocialLinks,
│   │                                BrandIcons, Avatar, CopyButton, FloatingGradient)
│   ├── lib/
│   │   ├── vcard.ts               # Builds and downloads the .vcf contact card
│   │   └── utils.ts                # `cn()` class-merging helper
│   └── types/index.ts             # Shared TypeScript types
├── vite.config.ts                 # Tailwind plugin, `@/` path alias, GitHub Pages base path
└── package.json
```

**Why it's this small:** your full portfolio already lives at `levibmackay/Portfolio`. This site's only job is to get someone from an NFC tap to the right place in one glance, so there's no Projects/About/Skills scroll — just the hero.

## 2. How to update your information

Almost everything lives in **`src/config/site.ts`**:

- `siteConfig.name`, `taglines`, `email`, `phone`, `location` — shown in the hero and baked into the downloadable `.vcf`.
- `siteConfig.url` — your production URL. Update this if you attach a custom domain (see §4).
- `socialLinks` — edit the `href` for GitHub, LinkedIn, and Portfolio. Removing an entry removes it from the page.

**Resume:** replace `public/resume.pdf` with your real resume, keeping the filename `resume.pdf` (or update `siteConfig.resumeUrl` if you rename it).

**Headshot:** drop a photo at `public/headshot.jpg`. The `Avatar` component (`src/components/ui/Avatar.tsx`) automatically swaps from the gradient "LM" monogram to your photo once that file exists — no code change needed.

**Colors/fonts:** the palette (accent blue → purple gradient, dark background) and font stack live at the top of `src/index.css` under `@theme`.

**SEO/OG tags:** `index.html` has hardcoded title/description/OG/Twitter meta tags (a static site can't template these at request time). If you change your name or URL in `site.ts`, update the matching text in `index.html`, `public/robots.txt`, and `public/sitemap.xml` too.

Run it locally with:

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run lint
```

## 3. How to deploy to GitHub Pages

Deployment is already wired up via `.github/workflows/deploy.yml` using GitHub's official Pages Actions (`upload-pages-artifact` + `deploy-pages`) — no `gh-pages` branch or extra tokens needed.

One-time setup on GitHub:

1. Push this repo to GitHub as `levibmackay/nfc-card`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

From then on, every push to `main` triggers the workflow: it builds the site and publishes `dist/` to Pages automatically. You can also trigger it manually from the **Actions** tab (`workflow_dispatch`).

Your site will be live at:

```
https://levibmackay.github.io/nfc-card/
```

**Important — the base path.** GitHub Pages serves project repos (as opposed to a `<user>.github.io` repo) from a `/RepoName/` sub-path, so `vite.config.ts` sets:

```ts
const BASE = "/nfc-card/";
```

This only applies to the production build (`command === "build"`) — `npm run dev` still runs at `/`. If you ever rename the repo, update `BASE` to match.

## 4. Connecting a custom domain later

1. Buy/point a domain (or subdomain, e.g. `card.levimackay.dev`) at GitHub Pages:
   - **Apex domain**: add `A` records to GitHub's Pages IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`).
   - **Subdomain**: add a `CNAME` record pointing to `levibmackay.github.io`.
2. In **Settings → Pages → Custom domain**, enter your domain and save (GitHub commits a `CNAME` file to Pages for you automatically — you don't need to add one manually).
3. Once the domain is verified, **switch the base path back to root** so asset URLs aren't served from a `/nfc-card/` sub-path that no longer exists:
   ```ts
   // vite.config.ts
   const BASE = "/";
   ```
4. Update `siteConfig.url` in `src/config/site.ts`, plus the hardcoded absolute URLs in `index.html` (`canonical`, `og:url`, `og:image`, `twitter:image`), `public/robots.txt`, and `public/sitemap.xml` to your new domain.
5. Commit and push — the next Actions run deploys with the new paths, and GitHub Pages handles HTTPS for your custom domain automatically (may take a few minutes to provision).
