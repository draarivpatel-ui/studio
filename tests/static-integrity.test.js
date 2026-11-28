import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
const data = JSON.parse(readFileSync(join(root, "sites.json"), "utf8"));

test.before(() => {
  execFileSync(process.execPath, [join(root, "build.mjs")], { cwd: root, stdio: "pipe" });
});

test("site data has unique slugs and local screenshots", () => {
  const slugs = data.sites.map((site) => site.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const site of data.sites) {
    assert.match(site.screenshot, /^screenshots\/[a-z0-9-]+\.png$/);
    assert.equal(existsSync(join(root, site.screenshot)), true, site.screenshot);
  }
});

test("build emits the index and every case-study page", () => {
  const html = readdirSync(dist).filter((name) => name.endsWith(".html"));
  assert.equal(html.length, data.sites.length + 1);
  for (const site of data.sites) {
    assert.equal(existsSync(join(dist, `${site.slug}.html`)), true, site.slug);
  }
});

test("generated pages keep required landmarks and one top-level heading", () => {
  for (const file of readdirSync(dist).filter((name) => name.endsWith(".html"))) {
    const html = readFileSync(join(dist, file), "utf8");
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, file);
    assert.match(html, /<main id="content">/);
    assert.match(html, /role="banner"/);
    assert.match(html, /role="contentinfo"/);
    assert.match(html, /class="skip-link"/);
  }
});

test("generated pages avoid external scripts and stylesheets", () => {
  for (const file of readdirSync(dist).filter((name) => name.endsWith(".html"))) {
    const html = readFileSync(join(dist, file), "utf8");
    assert.doesNotMatch(html, /<script\b[^>]*\bsrc=["\']https?:/i, file);
    assert.doesNotMatch(html, /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']https?:/i, file);
  }
});

test("generated internal links resolve inside dist", () => {
  for (const file of readdirSync(dist).filter((name) => name.endsWith(".html"))) {
    const html = readFileSync(join(dist, file), "utf8");
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
      const href = match[1];
      if (/^(https?:|#|mailto:)/.test(href)) continue;
      const target = href.split("#")[0];
      if (!target) continue;
      assert.equal(existsSync(join(dist, target)), true, `${file} -> ${href}`);
    }
  }
});

test("generated images use descriptive alt text and existing local files", () => {
  for (const file of readdirSync(dist).filter((name) => name.endsWith(".html"))) {
    const html = readFileSync(join(dist, file), "utf8");
    for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
      const attrs = match[1];
      const alt = attrs.match(/\balt="([^"]*)"/i);
      const src = attrs.match(/\bsrc="([^"]+)"/i);
      assert.ok(alt && alt[1].trim().length >= 10, file);
      assert.ok(src, file);
      if (src) assert.equal(existsSync(join(dist, src[1])), true, `${file} ${src[1]}`);
    }
  }
});

test("build and audit scripts parse under Node", () => {
  for (const file of ["build.mjs", "qa-audit.mjs"]) {
    execFileSync(process.execPath, ["--check", join(root, file)], { cwd: root, stdio: "pipe" });
  }
});

test("repository metadata avoids private paths and email contacts", () => {
  const text = readFileSync(join(root, "SECURITY.md"), "utf8");
  assert.doesNotMatch(text, /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  assert.doesNotMatch(text, /\/Users\//);
  assert.match(text, /security\/advisories\/new/);
});
