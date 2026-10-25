// Renders the studio case studies from sites.json into dist/.
// Run: node build.mjs   (Node 18+, no dependencies)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "sites.json"), "utf8"));
mkdirSync(join(here, "dist", "screenshots"), { recursive: true });
// dist/ is self-contained: pages reference screenshots/... relative to the page.
for (const s of data.sites) copyFileSync(join(here, s.screenshot), join(here, "dist", s.screenshot));

const page = (title, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>body{font:16px/1.6 -apple-system,system-ui,sans-serif;max-width:44rem;margin:2rem auto;padding:0 1rem;color:#222}img{max-width:100%;border-radius:8px;border:1px solid #ddd}a{color:#06c}h1,h2{line-height:1.2}li{margin:.3rem 0}</style></head>
<body>${body}<p><a href="index.html">All case studies</a></p></body></html>`;

const cards = data.sites.map(s => `<article><h2><a href="${s.slug}.html">${s.name}</a></h2>
<p><em>${s.kind}</em></p><img src="${s.screenshot}" alt="${s.name} screenshot" width="640"><p>${s.what}</p></article>`).join("\n");

writeFileSync(join(here, "dist", "index.html"),
  page("Aariv's web studio - case studies",
    `<h1>Aariv's web studio</h1><p>${data.studio.method}</p><p>Portfolio: <a href="${data.studio.portfolio}">${data.studio.portfolio.replace("https://", "")}</a></p>${cards}`));

for (const s of data.sites) {
  writeFileSync(join(here, "dist", s.slug + ".html"),
    page(s.name, `<h1>${s.name}</h1><p><em>${s.kind}</em></p>
<img src="${s.screenshot}" alt="${s.name} screenshot"><p>${s.what}</p>`));
}
console.log(`wrote ${data.sites.length + 1} pages to dist/`);
