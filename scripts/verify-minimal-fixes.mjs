// One-off Puppeteer verification for the /minimal UI bug fixes.
// Run: node scripts/verify-minimal-fixes.mjs
// Expects the dev server at http://localhost:3456.

import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const BASE = 'http://localhost:3456';
const OUT_DIR = 'scripts/out';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const pages = [
  { label: 'home', path: '/minimal' },
  { label: 'category-rings', path: '/minimal/category/rings' },
  { label: 'category-diamond-rings', path: '/minimal/category/diamond-rings' },
];

// One product detail — pick from any product slug the grid links to.
// We'll fill this in after probing /minimal.

function summarize(results) {
  const lines = ['# /minimal bug-fix verification report', ''];
  for (const r of results) {
    lines.push(`## ${r.label} @ ${r.viewport.name} (${r.viewport.width}x${r.viewport.height})`);
    lines.push(`- URL: ${r.url}`);
    lines.push(`- Status: ${r.status}`);
    lines.push(`- Body length: ${r.bodyLength}`);
    lines.push(`- Has cursor custom divs: **${r.hasCustomCursor}**`);
    lines.push(`- Has data-cursor="view" attrs: **${r.hasDataCursor}**`);
    lines.push(`- Has horizontal scrollbar (mobile only): **${r.hasHorizontalScrollbar ?? 'n/a'}**`);
    lines.push(`- Document height: ${r.docHeight}px`);
    lines.push(`- Console errors: ${r.consoleErrors.length}`);
    if (r.consoleErrors.length) {
      for (const e of r.consoleErrors) lines.push(`  - ${e}`);
    }
    lines.push(`- Page errors: ${r.pageErrors.length}`);
    if (r.pageErrors.length) {
      for (const e of r.pageErrors) lines.push(`  - ${e}`);
    }
    if (r.extra) lines.push(`- Extra: ${r.extra}`);
    lines.push(`- Screenshot: ${r.screenshot}`);
    lines.push('');
  }
  return lines.join('\n');
}

async function probeProductSlug(browser) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}/minimal`, { waitUntil: 'networkidle2', timeout: 45000 });
    const href = await page.$$eval('a[href^="/minimal/product/"]', (els) =>
      els.length ? els[0].getAttribute('href') : null
    );
    return href;
  } finally {
    await page.close();
  }
}

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const productHref = await probeProductSlug(browser);
    if (productHref) {
      pages.push({ label: 'product-detail', path: productHref });
    }

    const results = [];
    for (const viewport of viewports) {
      for (const spec of pages) {
        const page = await browser.newPage();
        const consoleErrors = [];
        const pageErrors = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('pageerror', (err) => pageErrors.push(String(err)));

        try {
          await page.setViewport(viewport);
          const url = `${BASE}${spec.path}`;
          const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

          // Light wait for Framer / GSAP / useSyncExternalStore updates.
          await new Promise((r) => setTimeout(r, 800));

          const hasCustomCursor = await page.evaluate(() => {
            // MinimalCursor rendered fixed divs at z-index 9998/9999 with
            // mix-blend-mode: difference. Check any fixed elements that
            // look like a cursor follower.
            return Array.from(document.querySelectorAll('div')).some((el) => {
              const st = getComputedStyle(el);
              return (
                st.position === 'fixed' &&
                st.mixBlendMode === 'difference' &&
                (st.zIndex === '9998' || st.zIndex === '9999')
              );
            });
          });

          const hasDataCursor = await page.evaluate(
            () => document.querySelectorAll('[data-cursor="view"]').length > 0
          );

          const hasHorizontalScrollbar = await page.evaluate(
            () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
          );

          const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);

          // Extra: for category page, count the product grid tiles.
          let extra = '';
          if (spec.label.startsWith('category')) {
            extra = `products: ${await page.$$eval(
              'a[href^="/minimal/product/"]',
              (els) => els.length
            )}`;
          }
          if (spec.label === 'home') {
            extra = `HorizontalScroll present: ${await page.evaluate(() => {
              // the pinned section wraps the "Curated Selection" label
              const headings = Array.from(document.querySelectorAll('h2'));
              return headings.some((h) => /Curated Selection/i.test(h.textContent || ''));
            })}`;
          }
          if (spec.label === 'product-detail') {
            extra = `has h1: ${await page.evaluate(() => Boolean(document.querySelector('h1')))}`;
          }

          const screenshot = `${OUT_DIR}/${spec.label}-${viewport.name}.png`;
          await page.screenshot({ path: screenshot, fullPage: false });

          // For the homepage, also capture a screenshot after scrolling
          // into the horizontal scroll section.
          if (spec.label === 'home' && viewport.name === 'desktop') {
            // Scroll to the "Curated Selection" section
            const scrolled = await page.evaluate(() => {
              const headings = Array.from(document.querySelectorAll('h2'));
              const hs = headings.find((h) => /Curated Selection/i.test(h.textContent || ''));
              if (!hs) return false;
              const sec = hs.closest('section');
              if (!sec) return false;
              const rect = sec.getBoundingClientRect();
              const absY = rect.top + window.scrollY;
              // Land partway in so pin is active
              window.scrollTo({ top: absY + window.innerHeight * 1.5, behavior: 'instant' });
              return true;
            });
            if (scrolled) {
              await new Promise((r) => setTimeout(r, 800));
              await page.screenshot({ path: `${OUT_DIR}/home-desktop-horizontal-scroll.png` });
            }
          }

          results.push({
            label: spec.label,
            viewport,
            url,
            status: resp ? resp.status() : 'no-response',
            bodyLength: (await page.content()).length,
            hasCustomCursor,
            hasDataCursor,
            hasHorizontalScrollbar,
            docHeight,
            consoleErrors,
            pageErrors,
            extra,
            screenshot,
          });
        } catch (err) {
          results.push({
            label: spec.label,
            viewport,
            url: `${BASE}${spec.path}`,
            status: 'error',
            bodyLength: 0,
            hasCustomCursor: false,
            hasDataCursor: false,
            hasHorizontalScrollbar: null,
            docHeight: 0,
            consoleErrors: [...consoleErrors, `EXCEPTION: ${err.message}`],
            pageErrors,
            extra: '',
            screenshot: 'n/a',
          });
        } finally {
          await page.close();
        }
      }
    }

    const report = summarize(results);
    await fs.writeFile(`${OUT_DIR}/report.md`, report);
    console.log(report);
  } finally {
    await browser.close();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
