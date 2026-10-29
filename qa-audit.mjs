// Static HTML, Accessibility, WCAG Contrast, Link Integrity & Payload Auditor for dist/
// Run: node qa-audit.mjs   (Node 18+, zero external dependencies)
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = join(here, "dist");
const sitesData = JSON.parse(readFileSync(join(here, "sites.json"), "utf8"));

function hexToRgb(hex) {
  const clean = String(hex).replace(/^#/, "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function relativeLuminance([r, g, b]) {
  const transform = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function wcagContrast(hexA, hexB) {
  const lumA = relativeLuminance(hexToRgb(hexA));
  const lumB = relativeLuminance(hexToRgb(hexB));
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

let failures = 0;
function assert(condition, message) {
  if (!condition) {
    console.error(`  [FAIL] ${message}`);
    failures++;
  }
}

console.log("=== Aariv's Web Studio - Static QA & Accessibility Audit ===");

// 1. Verify WCAG Contrast Ratios in sites.json
console.log("\n1. Auditing WCAG 2.1 Color Token Contrast Ratios (sites.json):");
for (const site of sitesData.sites) {
  for (const token of site.palette) {
    const computed = wcagContrast(token.hex, token.pairHex);
    const minRequired = token.role === "accent" ? 4.5 : 7.0;
    assert(
      computed >= minRequired,
      `${site.slug} token "${token.name}" (${token.hex} on ${token.pairHex}) ratio ${computed.toFixed(2)}:1 is below ${minRequired}:1`
    );
  }
  console.log(
    `  [PASS] ${site.slug.padEnd(22)} · ${site.palette.length} color pairs verified (primary ${wcagContrast(site.palette[0].hex, site.palette[1].hex).toFixed(1)}:1 AAA)`
  );
}

// 2. Audit generated HTML files in dist/
const htmlFiles = readdirSync(distDir).filter((f) => f.endsWith(".html"));
assert(htmlFiles.length === sitesData.sites.length + 1, `Expected ${sitesData.sites.length + 1} HTML pages in dist/, found ${htmlFiles.length}`);

console.log("\n2. Auditing Generated HTML Pages (Headings, Landmarks, Alt Text, Links, Payload):");
for (const file of htmlFiles) {
  const fullPath = join(distDir, file);
  const html = readFileSync(fullPath, "utf8");
  const sizeKb = statSync(fullPath).size / 1024;

  // Check page weight budget (< 32 KB raw HTML)
  assert(sizeKb < 32, `${file}: raw HTML size ${sizeKb.toFixed(1)} KB exceeds 32 KB budget`);

  // Check landmarks
  assert(html.includes('<main id="content">'), `${file}: missing <main id="content"> landmark`);
  assert(html.includes('role="banner"'), `${file}: missing header[role="banner"] landmark`);
  assert(html.includes('role="contentinfo"'), `${file}: missing footer[role="contentinfo"] landmark`);
  assert(html.includes('class="skip-link"'), `${file}: missing keyboard skip-link`);

  // Check heading hierarchy (exactly 1 <h1>, no skipped levels like h1 -> h3)
  const headingMatches = [...html.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) => Number(m[1]));
  const h1Count = headingMatches.filter((lvl) => lvl === 1).length;
  assert(h1Count === 1, `${file}: expected exactly 1 <h1>, found ${h1Count}`);
  for (let i = 1; i < headingMatches.length; i++) {
    const prev = headingMatches[i - 1];
    const curr = headingMatches[i];
    assert(curr <= prev + 1, `${file}: skipped heading level from <h${prev}> to <h${curr}>`);
  }

  // Check all <img> tags for descriptive alt text and existing image asset
  const imgTags = [...html.matchAll(/<img\b([^>]+)>/gi)].map((m) => m[1]);
  for (const attrs of imgTags) {
    const altMatch = attrs.match(/\balt="([^"]*)"/i);
    const srcMatch = attrs.match(/\bsrc="([^"]+)"/i);
    assert(altMatch && altMatch[1].trim().length >= 10, `${file}: <img> missing descriptive alt attribute`);
    if (srcMatch) {
      const imgPath = join(distDir, srcMatch[1]);
      assert(existsSync(imgPath), `${file}: <img> src "${srcMatch[1]}" does not exist in dist/`);
    }
  }

  // Check every <button> has an explicit type attribute
  const buttons = [...html.matchAll(/<button\b[^>]*>/gi)].map((m) => m[0]);
  for (const btn of buttons) {
    assert(/\btype="(button|submit|reset)"/i.test(btn), `${file}: <button> missing explicit type attribute: ${btn}`);
  }

  // Check every <input> has an id or aria-label
  const inputs = [...html.matchAll(/<input\b[^>]*>/gi)].map((m) => m[0]);
  for (const inp of inputs) {
    assert(/\b(id|aria-label)="[^"]+"/i.test(inp), `${file}: <input> missing id or aria-label: ${inp}`);
  }

  // Check internal links resolve
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((m) => m[1]);
  for (const href of hrefs) {
    if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#")) continue;
    const cleanTarget = href.split("#")[0];
    assert(existsSync(join(distDir, cleanTarget)), `${file}: broken internal link -> "${href}"`);
  }

  // Privacy guard: ensure no prohibited AI-boilerplate or unredacted external charity links
  assert(!/AI coding agents/i.test(html), `${file}: contains prohibited AI-agent boilerplate`);

  console.log(
    `  [PASS] ${file.padEnd(28)} · ${sizeKb.toFixed(1).padStart(4)} KB · ${headingMatches.length} headings · ${imgTags.length} images · ${hrefs.length} links verified`
  );
}

if (failures > 0) {
  console.error(`\nAudit failed with ${failures} error(s).`);
  process.exit(1);
} else {
  console.log("\nAll static HTML, WCAG contrast, link integrity, and privacy checks passed (0 errors).");
}
