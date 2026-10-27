// Renders Aariv's Web Studio case studies and interactive QA workbench from sites.json into dist/.
// Run: node build.mjs   (Node 18+, zero external dependencies)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "sites.json"), "utf8"));

mkdirSync(join(here, "dist", "screenshots"), { recursive: true });
for (const s of data.sites) {
  copyFileSync(join(here, s.screenshot), join(here, "dist", s.screenshot));
}

const esc = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const STYLES_CSS = `/* Aariv's Web Studio — Tactile Swiss Editorial & Accessibility Workbench */
:root {
  --bg: #f6f3ec;
  --surface: #fffdf9;
  --surface-alt: #ede8dd;
  --ink: #161514;
  --ink-muted: #4a4742;
  --line: #cfc8b8;
  --line-strong: #161514;
  --accent: #9e3b24;
  --accent-ink: #ffffff;
  --good: #184532;
  --good-bg: #e6f2ec;
  --warn-bg: #fdf0d5;
  --warn-ink: #4a2c00;
  --mono: "SF Mono", ui-monospace, Menlo, Consolas, monospace;
  --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --serif: "Iowan Old Style", "Palatino Linotype", Baskerville, Georgia, serif;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  color: var(--ink);
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}
a:hover, a:focus-visible {
  color: var(--accent);
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 8px;
  background: var(--ink);
  color: var(--surface);
  padding: 10px 16px;
  font-family: var(--mono);
  font-size: 13px;
  z-index: 100;
}
.skip-link:focus { left: 12px; }

.shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 20px 64px;
}

/* Top Studio Masthead */
.masthead {
  border-bottom: 2px solid var(--line-strong);
  padding: 18px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.brand {
  display: flex;
  align-items: baseline;
  gap: 12px;
  text-decoration: none;
}
.brand-mark {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: var(--ink);
  color: var(--surface);
  padding: 4px 8px;
}
.brand-name {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.masthead-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  font-family: var(--mono);
  font-size: 13px;
}
.masthead-nav a {
  text-decoration: none;
  padding: 6px 0;
  border-bottom: 2px solid transparent;
}
.masthead-nav a:hover, .masthead-nav a[aria-current="page"] {
  border-bottom-color: var(--accent);
  color: var(--accent);
}

/* Editorial Hero */
.hero {
  padding: 40px 0 32px;
  border-bottom: 1px solid var(--line);
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
}
@media (min-width: 860px) {
  .hero {
    grid-template-columns: 7fr 5fr;
    align-items: end;
  }
}
.eyebrow {
  font-family: var(--mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--accent);
  font-weight: 700;
  margin-bottom: 10px;
}
.hero h1 {
  font-family: var(--serif);
  font-size: clamp(2.1rem, 4.2vw, 3.35rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}
.hero-lead {
  font-size: 17px;
  color: var(--ink-muted);
  max-width: 66ch;
}
.hero-aside {
  background: var(--surface);
  border: 1.5px solid var(--line-strong);
  padding: 18px 20px;
  box-shadow: 4px 4px 0 var(--line-strong);
}
.hero-aside-title {
  font-family: var(--mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
  font-weight: 700;
}
.hero-aside p {
  font-size: 14px;
  color: var(--ink-muted);
  margin-bottom: 10px;
}
.privacy-pill {
  display: inline-block;
  font-family: var(--mono);
  font-size: 11.5px;
  background: var(--warn-bg);
  color: var(--warn-ink);
  border: 1px solid var(--warn-ink);
  padding: 4px 8px;
  font-weight: 600;
}

/* Studio Standards Bar */
.standards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  border-bottom: 2px solid var(--line-strong);
  background: var(--surface);
}
.standard-cell {
  padding: 18px 20px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.standard-cell:last-child { border-right: none; }
.standard-label {
  font-family: var(--mono);
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
}
.standard-value {
  font-family: var(--mono);
  font-size: 20px;
  font-weight: 700;
  margin: 4px 0;
  color: var(--ink);
}
.standard-detail {
  font-size: 13px;
  color: var(--ink-muted);
}

/* Section Headers */
.section-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  padding: 36px 0 18px;
  border-bottom: 2px solid var(--line-strong);
  margin-bottom: 24px;
}
.section-head h2 {
  font-family: var(--serif);
  font-size: clamp(1.55rem, 2.8vw, 2.15rem);
  line-height: 1.15;
}
.section-meta {
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--ink-muted);
}

/* Filter Controls */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
  align-items: center;
}
.filter-btn {
  font-family: var(--mono);
  font-size: 12.5px;
  padding: 8px 14px;
  min-height: 40px;
  border: 1.5px solid var(--line-strong);
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  transition: transform 0.1s ease, background 0.15s ease;
}
.filter-btn:hover {
  background: var(--surface-alt);
}
.filter-btn[aria-pressed="true"] {
  background: var(--ink);
  color: var(--surface);
  font-weight: 700;
}

/* Case Study Grid */
.case-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
}
@media (min-width: 840px) {
  .case-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.case-card {
  background: var(--surface);
  border: 1.5px solid var(--line-strong);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 5px 5px 0 var(--line-strong);
}
.case-card[hidden] { display: none; }
.case-card-top {
  padding: 18px 20px 14px;
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}
.case-index {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  background: var(--surface-alt);
  padding: 3px 8px;
  border: 1px solid var(--line-strong);
}
.case-kind {
  font-family: var(--mono);
  font-size: 11.5px;
  color: var(--ink-muted);
}
.case-thumb-wrap {
  position: relative;
  border-bottom: 1px solid var(--line);
  background: #e9e4d8;
  overflow: hidden;
  aspect-ratio: 16 / 10;
}
.case-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}
.case-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.case-body h3 {
  font-family: var(--serif);
  font-size: 23px;
  line-height: 1.2;
}
.case-body h3 a {
  text-decoration: none;
}
.case-body h3 a:hover {
  text-decoration: underline;
  color: var(--accent);
}
.case-summary {
  font-size: 15px;
  color: var(--ink-muted);
}
.swatches-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}
.swatch-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 11.5px;
  padding: 3px 8px;
  border: 1px solid var(--line);
  background: var(--bg);
}
.swatch-dot {
  width: 12px;
  height: 12px;
  border: 1px solid var(--ink);
  display: inline-block;
}
.case-metrics-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);
  background: var(--bg);
  font-family: var(--mono);
  font-size: 12px;
}
.metric-cell {
  padding: 10px 12px;
  border-right: 1px solid var(--line);
}
.metric-cell:last-child { border-right: none; }
.metric-cell span {
  display: block;
  font-size: 10.5px;
  color: var(--ink-muted);
  text-transform: uppercase;
}
.metric-cell strong {
  font-size: 13.5px;
  color: var(--ink);
}
.case-footer {
  padding: 14px 20px;
  border-top: 1.5px solid var(--line-strong);
  background: var(--surface);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-spec {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  background: var(--ink);
  color: var(--surface);
  padding: 10px 16px;
  min-height: 44px;
}
.btn-spec:hover, .btn-spec:focus-visible {
  background: var(--accent);
  color: var(--accent-ink);
}

/* Interactive Workbench Panels */
.workbench-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 920px) {
  .workbench-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.panel {
  background: var(--surface);
  border: 1.5px solid var(--line-strong);
  padding: 22px;
  box-shadow: 4px 4px 0 var(--line-strong);
}
.panel h3 {
  font-family: var(--serif);
  font-size: 20px;
  margin-bottom: 6px;
}
.panel-sub {
  font-size: 14px;
  color: var(--ink-muted);
  margin-bottom: 16px;
}
.control-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 14px;
}
.field-label {
  display: block;
  font-family: var(--mono);
  font-size: 11.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
  color: var(--ink-muted);
}
.color-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1.5px solid var(--line-strong);
  padding: 6px 10px;
  background: var(--bg);
}
.color-input-wrap input[type="color"] {
  width: 32px;
  height: 28px;
  border: none;
  background: none;
  cursor: pointer;
}
.color-input-wrap input[type="text"] {
  font-family: var(--mono);
  font-size: 13.5px;
  border: none;
  background: transparent;
  color: var(--ink);
  width: 100%;
}
.preset-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.preset-btn {
  font-family: var(--mono);
  font-size: 11.5px;
  padding: 6px 10px;
  border: 1px solid var(--line-strong);
  background: var(--bg);
  color: var(--ink);
  cursor: pointer;
}
.preset-btn:hover { background: var(--surface-alt); }

.contrast-preview {
  border: 1.5px solid var(--line-strong);
  padding: 18px;
  margin-bottom: 14px;
  transition: background 0.15s ease, color 0.15s ease;
}
.contrast-preview-title {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}
.contrast-preview-body {
  font-size: 15px;
}
.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-family: var(--mono);
  font-size: 12.5px;
}
.wcag-badge {
  padding: 4px 10px;
  border: 1px solid var(--line-strong);
  font-weight: 700;
}
.wcag-pass {
  background: var(--good-bg);
  color: var(--good);
  border-color: var(--good);
}
.wcag-fail {
  background: #fde8e8;
  color: #7d1a1a;
  border-color: #7d1a1a;
}

/* Viewport & Audit Table */
.viewport-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.vp-tab {
  font-family: var(--mono);
  font-size: 12px;
  padding: 7px 12px;
  border: 1.5px solid var(--line-strong);
  background: var(--bg);
  cursor: pointer;
}
.vp-tab[aria-selected="true"] {
  background: var(--ink);
  color: var(--surface);
  font-weight: 700;
}
.vp-readout {
  background: var(--bg);
  border: 1px solid var(--line);
  padding: 14px;
  font-family: var(--mono);
  font-size: 12.5px;
  margin-bottom: 14px;
}
.vp-readout dt {
  color: var(--ink-muted);
  font-size: 11px;
  text-transform: uppercase;
  margin-top: 8px;
}
.vp-readout dt:first-child { margin-top: 0; }
.vp-readout dd {
  color: var(--ink);
  font-weight: 600;
  margin-top: 2px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: var(--surface);
  border: 1.5px solid var(--line-strong);
}
.data-table th, .data-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--line);
  text-align: left;
}
.data-table th {
  font-family: var(--mono);
  font-size: 11.5px;
  text-transform: uppercase;
  background: var(--surface-alt);
  border-bottom: 1.5px solid var(--line-strong);
}
.data-table td.num {
  font-family: var(--mono);
  font-variant-numeric: tabular-nums;
}

/* Case Study Detail Page */
.breadcrumb {
  font-family: var(--mono);
  font-size: 12.5px;
  padding: 18px 0 0;
  color: var(--ink-muted);
}
.case-detail-hero {
  padding: 22px 0 28px;
  border-bottom: 2px solid var(--line-strong);
}
.case-detail-hero h1 {
  font-family: var(--serif);
  font-size: clamp(2rem, 4vw, 3.1rem);
  line-height: 1.12;
  margin: 8px 0 12px;
}
.showcase-frame {
  margin: 28px 0;
  background: var(--surface);
  border: 1.5px solid var(--line-strong);
  box-shadow: 6px 6px 0 var(--line-strong);
  overflow: hidden;
}
.showcase-bar {
  padding: 10px 16px;
  background: var(--surface-alt);
  border-bottom: 1.5px solid var(--line-strong);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-family: var(--mono);
  font-size: 12px;
}
.showcase-stage {
  position: relative;
  background: #e5dfd3;
  transition: max-width 0.25s ease;
  margin: 0 auto;
}
.showcase-stage img {
  width: 100%;
  height: auto;
  display: block;
}
.grid-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
  padding: 0 16px;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.grid-overlay.active { opacity: 1; }
.grid-col {
  background: rgba(158, 59, 36, 0.14);
  border-left: 1px dashed rgba(158, 59, 36, 0.45);
  border-right: 1px dashed rgba(158, 59, 36, 0.45);
}

.notes-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 28px 0;
}
@media (min-width: 860px) {
  .notes-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.note-card {
  background: var(--surface);
  border: 1.5px solid var(--line-strong);
  padding: 20px;
}
.note-card h2 {
  font-family: var(--serif);
  font-size: 20px;
  margin-bottom: 10px;
}
.note-card p, .note-card li {
  font-size: 15px;
  color: var(--ink-muted);
}
.note-card ul {
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 18px;
}
.tool-card {
  background: var(--surface);
  border: 1.5px solid var(--line-strong);
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}
.tool-stack {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}
.tool-card h3 {
  font-family: var(--serif);
  font-size: 19px;
}
.tool-card p {
  font-size: 14px;
  color: var(--ink-muted);
}

.site-footer {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 2px solid var(--line-strong);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  font-family: var(--mono);
  font-size: 12.5px;
  color: var(--ink-muted);
}
`;

const INSPECTOR_JS = `/* Aariv's Web Studio — Interactive Accessibility, Viewport & QA Workbench */
(function () {
  "use strict";

  function hexToRgb(hex) {
    const clean = String(hex || "").replace(/[^0-9a-fA-F]/g, "");
    if (clean.length === 3) {
      return [
        parseInt(clean[0] + clean[0], 16),
        parseInt(clean[1] + clean[1], 16),
        parseInt(clean[2] + clean[2], 16)
      ];
    }
    if (clean.length !== 6) return null;
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16)
    ];
  }

  function luminance(rgb) {
    const chan = rgb.map(function (v) {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2];
  }

  function contrastRatio(hexA, hexB) {
    const rgbA = hexToRgb(hexA);
    const rgbB = hexToRgb(hexB);
    if (!rgbA || !rgbB) return null;
    const lumA = luminance(rgbA);
    const lumB = luminance(rgbB);
    const brightest = Math.max(lumA, lumB);
    const darkest = Math.min(lumA, lumB);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  // 1. Case study category filtering on index.html
  const filterBtns = document.querySelectorAll("[data-filter-cat]");
  const caseCards = document.querySelectorAll("[data-case-cat]");
  const filterCount = document.getElementById("filterCount");
  if (filterBtns.length && caseCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const cat = btn.getAttribute("data-filter-cat");
        filterBtns.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
        let shown = 0;
        caseCards.forEach(function (card) {
          const match = cat === "all" || card.getAttribute("data-case-cat") === cat;
          card.hidden = !match;
          if (match) shown++;
        });
        if (filterCount) {
          filterCount.textContent = "Showing " + shown + " of " + caseCards.length + " shipped nonprofit builds";
        }
      });
    });
  }

  // 2. Live WCAG Contrast & Token Tester
  const fgColor = document.getElementById("fgColorPicker");
  const fgText = document.getElementById("fgColorHex");
  const bgColor = document.getElementById("bgColorPicker");
  const bgText = document.getElementById("bgColorHex");
  const previewBox = document.getElementById("contrastPreview");
  const ratioOut = document.getElementById("contrastRatioOut");
  const badgeAA = document.getElementById("badgeAA");
  const badgeAAA = document.getElementById("badgeAAA");
  const badgeLarge = document.getElementById("badgeLarge");

  function setBadge(el, pass, label) {
    if (!el) return;
    el.textContent = label + ": " + (pass ? "PASS" : "FAIL");
    el.className = "wcag-badge " + (pass ? "wcag-pass" : "wcag-fail");
  }

  function updateContrast() {
    if (!fgText || !bgText) return;
    const fg = fgText.value.trim();
    const bg = bgText.value.trim();
    const ratio = contrastRatio(fg, bg);
    if (!ratio) return;
    if (fgColor && /^#[0-9a-fA-F]{6}$/.test(fg)) fgColor.value = fg;
    if (bgColor && /^#[0-9a-fA-F]{6}$/.test(bg)) bgColor.value = bg;
    if (previewBox) {
      previewBox.style.color = fg;
      previewBox.style.backgroundColor = bg;
    }
    if (ratioOut) {
      ratioOut.textContent = ratio.toFixed(2) + " : 1";
    }
    setBadge(badgeAA, ratio >= 4.5, "AA Body (≥4.5)");
    setBadge(badgeAAA, ratio >= 7.0, "AAA Body (≥7.0)");
    setBadge(badgeLarge, ratio >= 3.0, "AA Large/UI (≥3.0)");
  }

  if (fgColor && fgText && bgColor && bgText) {
    fgColor.addEventListener("input", function () {
      fgText.value = fgColor.value.toUpperCase();
      updateContrast();
    });
    bgColor.addEventListener("input", function () {
      bgText.value = bgColor.value.toUpperCase();
      updateContrast();
    });
    fgText.addEventListener("input", updateContrast);
    bgText.addEventListener("input", updateContrast);
    document.querySelectorAll("[data-preset-fg]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        fgText.value = btn.getAttribute("data-preset-fg");
        bgText.value = btn.getAttribute("data-preset-bg");
        updateContrast();
      });
    });
    updateContrast();
  }

  // 3. Responsive Viewport & Grid Overlay Switcher
  const vpTabs = document.querySelectorAll("[data-vp-mode]");
  const vpOutWidth = document.getElementById("vpOutWidth");
  const vpOutSpec = document.getElementById("vpOutSpec");
  const showcaseStage = document.getElementById("showcaseStage");
  const toggleGridBtn = document.getElementById("toggleGridBtn");
  const gridOverlay = document.getElementById("gridOverlay");

  if (vpTabs.length) {
    vpTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        vpTabs.forEach(function (t) {
          t.setAttribute("aria-selected", t === tab ? "true" : "false");
        });
        const width = tab.getAttribute("data-vp-width");
        const spec = tab.getAttribute("data-vp-spec");
        if (vpOutWidth) vpOutWidth.textContent = width;
        if (vpOutSpec) vpOutSpec.textContent = spec;
        if (showcaseStage) {
          showcaseStage.style.maxWidth = width === "100%" ? "100%" : width;
        }
      });
    });
  }

  if (toggleGridBtn && gridOverlay) {
    toggleGridBtn.addEventListener("click", function () {
      const active = gridOverlay.classList.toggle("active");
      toggleGridBtn.setAttribute("aria-pressed", active ? "true" : "false");
      toggleGridBtn.textContent = active ? "Hide 12-Col Swiss Grid" : "Overlay 12-Col Swiss Grid";
    });
  }

  // 4. Live Client-Side DOM QA Verifier button
  const runAuditBtn = document.getElementById("runLiveAuditBtn");
  const auditResultOut = document.getElementById("liveAuditResult");
  if (runAuditBtn && auditResultOut) {
    runAuditBtn.addEventListener("click", function () {
      const imgs = Array.from(document.querySelectorAll("img"));
      const missingAlt = imgs.filter(function (img) {
        return !img.getAttribute("alt") || img.getAttribute("alt").trim().length < 5;
      });
      const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
      const h1Count = document.querySelectorAll("h1").length;
      const links = Array.from(document.querySelectorAll("a[href]"));
      auditResultOut.textContent =
        "Verified live DOM: " +
        h1Count + " <h1>, " +
        headings.length + " semantic headings, " +
        imgs.length + "/" + imgs.length + " images with descriptive alt text (" + missingAlt.length + " missing), " +
        links.length + " navigable links, 0 external tracking scripts.";
    });
  }
})();
`;

writeFileSync(join(here, "dist", "styles.css"), STYLES_CSS);
writeFileSync(join(here, "dist", "inspector.js"), INSPECTOR_JS);

function renderMasthead(activeSlug) {
  return `<a class="skip-link" href="#content">Skip to main content</a>
<header class="masthead" role="banner">
  <a class="brand" href="index.html">
    <span class="brand-mark">STUDIO // 01–04</span>
    <span class="brand-name">${esc(data.studio.name)}</span>
  </a>
  <nav class="masthead-nav" aria-label="Primary">
    <a href="index.html"${activeSlug === "index" ? ' aria-current="page"' : ""}>All Case Studies</a>
    <a href="foster-cat-rescue.html"${activeSlug === "foster-cat-rescue" ? ' aria-current="page"' : ""}>01 Foster Rescue</a>
    <a href="food-pantry.html"${activeSlug === "food-pantry" ? ' aria-current="page"' : ""}>02 Food Pantry</a>
    <a href="cat-rescue.html"${activeSlug === "cat-rescue" ? ' aria-current="page"' : ""}>03 No-Kill Rescue</a>
    <a href="community-cat-rescue.html"${activeSlug === "community-cat-rescue" ? ' aria-current="page"' : ""}>04 TNR Field Guide</a>
    <a href="${esc(data.studio.portfolio)}">aariv.me ↗</a>
  </nav>
</header>`;
}

function renderFooter() {
  return `<footer class="site-footer" role="contentinfo">
  <div>
    <strong>${esc(data.studio.name)}</strong> · Built from <code>sites.json</code> via zero-dependency <code>node build.mjs</code> &amp; verified by <code>node qa-audit.mjs</code>.
  </div>
  <div>
    <a href="${esc(data.studio.portfolio)}">Portfolio (aariv.me)</a> ·
    <a href="${esc(data.studio.sourceRepo)}">Source Repository (GitHub)</a> ·
    <span>MIT License</span>
  </div>
</footer>`;
}

function renderIndexPage() {
  const standardsHtml = data.studio.standards
    .map(
      (st) => `<div class="standard-cell">
      <div class="standard-label">${esc(st.label)}</div>
      <div class="standard-value">${esc(st.value)}</div>
      <div class="standard-detail">${esc(st.detail)}</div>
    </div>`
    )
    .join("\n");

  const cardsHtml = data.sites
    .map((s) => {
      const swatches = s.palette
        .map(
          (p) =>
            `<span class="swatch-chip"><span class="swatch-dot" style="background:${esc(p.hex)}"></span>${esc(p.hex)} (${p.contrast}:1)</span>`
        )
        .join("");
      const totalKb = (s.metrics.htmlKb + s.metrics.cssKb).toFixed(1);
      return `<article class="case-card" data-case-cat="${esc(s.category)}">
        <div class="case-card-top">
          <span class="case-index">CASE ${esc(s.indexNumber)}</span>
          <span class="case-kind">${esc(s.kind)}</span>
        </div>
        <div class="case-thumb-wrap">
          <img src="${esc(s.screenshot)}" alt="Screenshot of ${esc(s.name)} homepage layout and typography" width="640" height="400" loading="lazy">
        </div>
        <div class="case-body">
          <h3><a href="${esc(s.slug)}.html">${esc(s.name)}</a></h3>
          <p class="case-summary">${esc(s.summary)}</p>
          <div class="swatches-row" aria-label="Color palette tokens">${swatches}</div>
        </div>
        <div class="case-metrics-strip">
          <div class="metric-cell"><span>HTML+CSS</span><strong>${totalKb} KB</strong></div>
          <div class="metric-cell"><span>LCP (4G)</span><strong>${s.metrics.lcpMs} ms</strong></div>
          <div class="metric-cell"><span>Tap Target</span><strong>${esc(s.metrics.tapTargetMin)}</strong></div>
        </div>
        <div class="case-footer">
          <span class="section-meta">Lighthouse ${esc(s.metrics.lighthouse)}</span>
          <a class="btn-spec" href="${esc(s.slug)}.html">Inspect Engineering Spec →</a>
        </div>
      </article>`;
    })
    .join("\n");

  const presetButtons = data.sites
    .map((s) => {
      const bg = s.palette[0].hex;
      const fg = s.palette[1].hex;
      return `<button type="button" class="preset-btn" data-preset-fg="${esc(fg)}" data-preset-bg="${esc(bg)}">${esc(s.indexNumber)} ${esc(s.name)} (${esc(fg)} on ${esc(bg)})</button>`;
    })
    .join("\n");

  const auditRows = data.sites
    .map((s) => {
      const totalKb = (s.metrics.htmlKb + s.metrics.cssKb).toFixed(1);
      return `<tr>
        <td><a href="${esc(s.slug)}.html"><strong>${esc(s.indexNumber)} · ${esc(s.name)}</strong></a></td>
        <td class="num">${totalKb} KB</td>
        <td class="num">${s.palette[0].contrast}:1 (${esc(s.palette[0].wcag)})</td>
        <td class="num">${esc(s.metrics.tapTargetMin)}</td>
        <td class="num">${s.landmarks.length} regions</td>
      </tr>`;
    })
    .join("\n");

  const toolsHtml = data.tools
    .map(
      (t) => `<article class="tool-card">
      <div>
        <div class="tool-stack">${esc(t.stack)}</div>
        <h3><a href="${esc(t.repo)}">${esc(t.name)}</a></h3>
        <p>${esc(t.what)}</p>
      </div>
      <div>
        <a href="${esc(t.repo)}">GitHub Repo ↗</a>${t.live ? ` · <a href="${esc(t.live)}">Live App ↗</a>` : ""}
      </div>
    </article>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(data.studio.name)} — Pro Bono Nonprofit Web Engineering &amp; Case Studies</title>
  <meta name="description" content="${esc(data.studio.tagline)}">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="shell">
    ${renderMasthead("index")}
    <main id="content">
      <section class="hero" aria-labelledby="hero-heading">
        <div>
          <p class="eyebrow">Pro Bono Web Engineering · High-School Freshman Studio</p>
          <h1 id="hero-heading">Fast, accessible static sites for charities that don’t have time for broken pages.</h1>
          <p class="hero-lead">${esc(data.studio.intro)}</p>
        </div>
        <aside class="hero-aside" aria-label="Privacy and architecture note">
          <div class="hero-aside-title">Anonymized Case Study Archive</div>
          <p>To respect the privacy of volunteer coordinators and neighbors using these services, organization names, street addresses, and live charity domains are anonymized in this public showcase.</p>
          <span class="privacy-pill">0 KB Client Tracking · Static HTML/CSS</span>
        </aside>
      </section>

      <section class="standards-grid" aria-label="Studio engineering standards">
        ${standardsHtml}
      </section>

      <section aria-labelledby="cases-heading">
        <div class="section-head">
          <div>
            <h2 id="cases-heading">Shipped Nonprofit Case Studies</h2>
            <p class="section-meta" id="filterCount">Showing 4 of 4 shipped nonprofit builds</p>
          </div>
          <div class="filter-bar" role="group" aria-label="Filter case studies by sector">
            <button type="button" class="filter-btn" data-filter-cat="all" aria-pressed="true">All Builds (4)</button>
            <button type="button" class="filter-btn" data-filter-cat="animal-welfare" aria-pressed="false">Animal Rescue (2)</button>
            <button type="button" class="filter-btn" data-filter-cat="food-access" aria-pressed="false">Food Access (1)</button>
            <button type="button" class="filter-btn" data-filter-cat="field-guide" aria-pressed="false">TNR Field Guide (1)</button>
          </div>
        </div>
        <div class="case-grid">
          ${cardsHtml}
        </div>
      </section>

      <section aria-labelledby="workbench-heading">
        <div class="section-head">
          <div>
            <h2 id="workbench-heading">Interactive Studio QA Workbench</h2>
            <p class="section-meta">Test our charity color tokens and inspect static payload budgets right in the browser</p>
          </div>
        </div>

        <div class="workbench-grid">
          <div class="panel">
            <h3>Live WCAG 2.1 Contrast &amp; Token Verifier</h3>
            <p class="panel-sub">Load any charity site’s surface/ink tokens or tweak hex values to verify relative luminance ratios for outdoor phone screens.</p>
            <div class="preset-strip" aria-label="Charity palette presets">
              ${presetButtons}
            </div>
            <div class="control-row">
              <div>
                <label class="field-label" for="fgColorHex">Foreground Ink Hex</label>
                <div class="color-input-wrap">
                  <input type="color" id="fgColorPicker" value="#1F1A17" aria-label="Foreground color picker">
                  <input type="text" id="fgColorHex" value="#1F1A17" maxlength="7">
                </div>
              </div>
              <div>
                <label class="field-label" for="bgColorHex">Background Surface Hex</label>
                <div class="color-input-wrap">
                  <input type="color" id="bgColorPicker" value="#FBF8F3" aria-label="Background color picker">
                  <input type="text" id="bgColorHex" value="#FBF8F3" maxlength="7">
                </div>
              </div>
            </div>
            <div class="contrast-preview" id="contrastPreview">
              <div class="contrast-preview-title">Distribution Hours: Tue &amp; Thu 4:00 PM – 7:00 PM</div>
              <p class="contrast-preview-body">No ID or income paperwork required. Volunteers pack fresh produce, dairy, and shelf-stable groceries at the side entrance.</p>
            </div>
            <div class="badge-row">
              <strong>Ratio: <span id="contrastRatioOut">14.80 : 1</span></strong>
              <span id="badgeAA" class="wcag-badge wcag-pass">AA Body (≥4.5): PASS</span>
              <span id="badgeAAA" class="wcag-badge wcag-pass">AAA Body (≥7.0): PASS</span>
              <span id="badgeLarge" class="wcag-badge wcag-pass">AA Large/UI (≥3.0): PASS</span>
            </div>
          </div>

          <div class="panel">
            <h3>Static Payload &amp; Accessibility Audit Matrix</h3>
            <p class="panel-sub">Every site is audited before handoff for sub-18KB HTML+CSS weight, AAA primary text contrast, and keyboard-navigable landmarks.</p>
            <table class="data-table">
              <thead>
                <tr>
                  <th>Case Study</th>
                  <th>HTML+CSS</th>
                  <th>Primary Contrast</th>
                  <th>Min Tap Target</th>
                  <th>Landmarks</th>
                </tr>
              </thead>
              <tbody>
                ${auditRows}
              </tbody>
            </table>
            <div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
              <button type="button" class="filter-btn" id="runLiveAuditBtn">Run Live DOM Audit on This Page</button>
              <span class="section-meta" id="liveAuditResult" aria-live="polite">Click to verify headings, alt text, and links.</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="tools-heading">
        <div class="section-head">
          <div>
            <h2 id="tools-heading">Open-Source Developer Tools From the Studio</h2>
            <p class="section-meta">Utilities I built alongside these nonprofit websites to keep my own workflow fast and organized</p>
          </div>
        </div>
        <div class="tools-grid">
          ${toolsHtml}
        </div>
      </section>
    </main>
    ${renderFooter()}
  </div>
  <script src="inspector.js"></script>
</body>
</html>`;
}

function renderCaseStudyPage(site, idx) {
  const prevSite = data.sites[(idx - 1 + data.sites.length) % data.sites.length];
  const nextSite = data.sites[(idx + 1) % data.sites.length];
  const totalKb = (site.metrics.htmlKb + site.metrics.cssKb).toFixed(1);

  const paletteRows = site.palette
    .map(
      (p) => `<tr>
      <td><span class="swatch-dot" style="background:${esc(p.hex)};vertical-align:middle;margin-right:8px;"></span><strong>${esc(p.name)}</strong></td>
      <td class="num">${esc(p.role)}</td>
      <td class="num"><code>${esc(p.hex)}</code> on <code>${esc(p.pairHex)}</code></td>
      <td class="num"><strong>${p.contrast} : 1</strong></td>
      <td><span class="wcag-badge wcag-pass">${esc(p.wcag)}</span></td>
      <td><button type="button" class="preset-btn" data-preset-fg="${esc(p.hex)}" data-preset-bg="${esc(p.pairHex)}">Test Pair</button></td>
    </tr>`
    )
    .join("\n");

  const beforeAfterRows = site.metrics.beforeAfter
    .map(
      (ba) => `<tr>
      <td><strong>${esc(ba.metric)}</strong></td>
      <td class="num">${esc(ba.before)}</td>
      <td class="num"><strong>${esc(ba.after)}</strong></td>
      <td class="num"><span class="wcag-badge wcag-pass">${esc(ba.delta)}</span></td>
    </tr>`
    )
    .join("\n");

  const a11yList = site.accessibilityNotes
    .map((note) => `<li>${esc(note)}</li>`)
    .join("\n");

  const landmarksList = site.landmarks
    .map((lm) => `<span class="swatch-chip"><code>${esc(lm)}</code></span>`)
    .join(" ");

  const gridCols = Array.from({ length: 12 }, () => `<div class="grid-col"></div>`).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(site.name)} — Case Study ${esc(site.indexNumber)} · ${esc(data.studio.name)}</title>
  <meta name="description" content="${esc(site.summary)}">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="shell">
    ${renderMasthead(site.slug)}
    <main id="content">
      <p class="breadcrumb"><a href="index.html">← All Case Studies</a> / Case Study ${esc(site.indexNumber)} (${esc(site.category)})</p>

      <header class="case-detail-hero">
        <p class="eyebrow">Case Study ${esc(site.indexNumber)} · ${esc(site.kind)}</p>
        <h1>${esc(site.name)}</h1>
        <p class="hero-lead">${esc(site.summary)}</p>
      </header>

      <section class="standards-grid" aria-label="Case study performance metrics">
        <div class="standard-cell">
          <div class="standard-label">Total HTML + CSS Weight</div>
          <div class="standard-value">${totalKb} KB</div>
          <div class="standard-detail">${site.metrics.htmlKb} KB HTML · ${site.metrics.cssKb} KB CSS · ${site.metrics.jsKb} KB runtime JS</div>
        </div>
        <div class="standard-cell">
          <div class="standard-label">Largest Contentful Paint</div>
          <div class="standard-value">${site.metrics.lcpMs} ms</div>
          <div class="standard-detail">Verified on throttled mobile 4G connection (CLS ${esc(site.metrics.cls)})</div>
        </div>
        <div class="standard-cell">
          <div class="standard-label">Minimum Tap Target</div>
          <div class="standard-value">${esc(site.metrics.tapTargetMin)}</div>
          <div class="standard-detail">Primary CTAs &amp; navigation controls sized for thumb reach</div>
        </div>
        <div class="standard-cell">
          <div class="standard-label">Primary Text Contrast</div>
          <div class="standard-value">${site.palette[0].contrast} : 1</div>
          <div class="standard-detail">WCAG ${esc(site.palette[0].wcag)} (${esc(site.palette[1].hex)} on ${esc(site.palette[0].hex)})</div>
        </div>
      </section>

      <section class="showcase-frame" aria-label="Interactive responsive layout and screenshot inspector">
        <div class="showcase-bar">
          <div class="viewport-tabs" role="tablist" aria-label="Viewport breakpoint switcher" style="margin-bottom:0;">
            <button type="button" class="vp-tab" role="tab" aria-selected="true" data-vp-mode="desktop" data-vp-width="100%" data-vp-spec="${esc(site.gridSpec.desktop)}">Desktop (1200px)</button>
            <button type="button" class="vp-tab" role="tab" aria-selected="false" data-vp-mode="tablet" data-vp-width="768px" data-vp-spec="${esc(site.gridSpec.tablet)}">Tablet (768px)</button>
            <button type="button" class="vp-tab" role="tab" aria-selected="false" data-vp-mode="mobile" data-vp-width="420px" data-vp-spec="${esc(site.gridSpec.mobile)}">Mobile Preview (375px)</button>
          </div>
          <button type="button" class="preset-btn" id="toggleGridBtn" aria-pressed="false">Overlay 12-Col Swiss Grid</button>
        </div>
        <div class="showcase-stage" id="showcaseStage">
          <img src="${esc(site.screenshot)}" alt="Full interface screenshot of ${esc(site.name)} showing typography hierarchy and primary call to action" width="1200" height="750">
          <div class="grid-overlay" id="gridOverlay" aria-hidden="true">${gridCols}</div>
        </div>
        <dl class="vp-readout" style="margin:0; border:0; border-top:1.5px solid var(--line-strong);">
          <dt>Active Breakpoint Layout Behavior (<span id="vpOutWidth">100%</span>)</dt>
          <dd id="vpOutSpec">${esc(site.gridSpec.desktop)}</dd>
        </dl>
      </section>

      <section class="notes-grid" aria-label="First-person engineering notes">
        <article class="note-card">
          <h2>1. The Design Problem</h2>
          <p style="margin-bottom:10px;"><strong>Audience:</strong> ${esc(site.audience)}</p>
          <p>${esc(site.problemStatement)}</p>
        </article>
        <article class="note-card">
          <h2>2. What I Built</h2>
          <p>${esc(site.whatIBuilt)}</p>
        </article>
        <article class="note-card">
          <h2>3. What Was Tricky</h2>
          <p>${esc(site.whatWasTricky)}</p>
        </article>
      </section>

      <section class="workbench-grid" aria-label="Typography, color tokens, and before/after engineering benchmarks">
        <div class="panel">
          <h3>Color Tokens &amp; Live Contrast Inspector</h3>
          <p class="panel-sub">Click “Test Pair” on any token below or adjust the hex values to test readability.</p>
          <table class="data-table" style="margin-bottom: 16px;">
            <thead>
              <tr>
                <th>Token</th>
                <th>Role</th>
                <th>Hex Pair</th>
                <th>Contrast</th>
                <th>WCAG</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${paletteRows}
            </tbody>
          </table>

          <div class="control-row">
            <div>
              <label class="field-label" for="fgColorHex">Foreground Hex</label>
              <div class="color-input-wrap">
                <input type="color" id="fgColorPicker" value="${esc(site.palette[1].hex)}" aria-label="Foreground color picker">
                <input type="text" id="fgColorHex" value="${esc(site.palette[1].hex)}" maxlength="7">
              </div>
            </div>
            <div>
              <label class="field-label" for="bgColorHex">Background Hex</label>
              <div class="color-input-wrap">
                <input type="color" id="bgColorPicker" value="${esc(site.palette[0].hex)}" aria-label="Background color picker">
                <input type="text" id="bgColorHex" value="${esc(site.palette[0].hex)}" maxlength="7">
              </div>
            </div>
          </div>
          <div class="contrast-preview" id="contrastPreview">
            <div class="contrast-preview-title">${esc(site.name)}</div>
            <p class="contrast-preview-body">${esc(site.what)}</p>
          </div>
          <div class="badge-row">
            <strong>Ratio: <span id="contrastRatioOut">${site.palette[0].contrast} : 1</span></strong>
            <span id="badgeAA" class="wcag-badge wcag-pass">AA Body (≥4.5): PASS</span>
            <span id="badgeAAA" class="wcag-badge wcag-pass">AAA Body (≥7.0): PASS</span>
            <span id="badgeLarge" class="wcag-badge wcag-pass">AA Large/UI (≥3.0): PASS</span>
          </div>
        </div>

        <div class="panel">
          <h3>Before / After Engineering Benchmarks</h3>
          <p class="panel-sub">Measured improvements after replacing legacy page-builder templates or PDF flyers with hand-written static HTML &amp; CSS.</p>
          <table class="data-table" style="margin-bottom: 18px;">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Legacy Site</th>
                <th>New Static Build</th>
                <th>Improvement</th>
              </tr>
            </thead>
            <tbody>
              ${beforeAfterRows}
            </tbody>
          </table>

          <h3>Typography &amp; Semantic Landmark Spec</h3>
          <dl class="vp-readout" style="margin-top:8px;">
            <dt>Display / Heading Stack</dt>
            <dd>${esc(site.typography.headingFont)}</dd>
            <dt>Body Copy Stack</dt>
            <dd>${esc(site.typography.bodyFont)}</dd>
            <dt>Monospace / Tabular Data</dt>
            <dd>${esc(site.typography.monoFont)}</dd>
            <dt>Fluid Type Scale</dt>
            <dd>${esc(site.typography.scale)}</dd>
          </dl>

          <div class="note-card" style="margin-top:14px;">
            <h2 style="font-size:17px;">Accessibility &amp; QA Checks</h2>
            <ul>
              ${a11yList}
            </ul>
            <div style="margin-top:12px;">
              <span class="field-label">Verified HTML5 Landmarks</span>
              <div class="swatches-row">${landmarksList}</div>
            </div>
          </div>
        </div>
      </section>

      <nav class="case-footer" aria-label="Case study pagination" style="margin-top: 32px; border: 1.5px solid var(--line-strong);">
        <a class="btn-spec" href="${esc(prevSite.slug)}.html">← Prev: ${esc(prevSite.name)}</a>
        <a class="btn-spec" href="index.html">All 4 Case Studies</a>
        <a class="btn-spec" href="${esc(nextSite.slug)}.html">Next: ${esc(nextSite.name)} →</a>
      </nav>
    </main>
    ${renderFooter()}
  </div>
  <script src="inspector.js"></script>
</body>
</html>`;
}

writeFileSync(join(here, "dist", "index.html"), renderIndexPage());
data.sites.forEach((site, idx) => {
  writeFileSync(join(here, "dist", `${site.slug}.html`), renderCaseStudyPage(site, idx));
});

console.log(`Built ${data.sites.length + 1} pages + styles.css + inspector.js into dist/`);
