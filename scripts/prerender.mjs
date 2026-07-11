import { build } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const ssrOutDir = path.join(root, "dist-ssr");

await build({
  root,
  build: {
    ssr: "src/entry-server.tsx",
    outDir: "dist-ssr",
    emptyOutDir: true,
  },
  logLevel: "warn",
});

const entryPath = path.join(ssrOutDir, "entry-server.js");
const { render } = await import(`file://${entryPath}`);
const appHtml = render();

const indexPath = path.join(root, "dist", "index.html");
const html = fs.readFileSync(indexPath, "utf-8");
const injected = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

if (injected === html) {
  throw new Error('Prerender failed: <div id="root"></div> placeholder not found in dist/index.html');
}

fs.writeFileSync(indexPath, injected);
fs.rmSync(ssrOutDir, { recursive: true, force: true });

console.log(`Prerendered ${appHtml.length} chars of markup into dist/index.html`);
