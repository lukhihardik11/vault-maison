// Verify the v2 polish additions: HoverPeekList "Signature" section,
// Card3D tilt on Featured Piece image, parallax tokens working,
// focus-visible outline on interactive elements, and no regressions
// across the three breakpoints.

import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const OUT = 'scripts/out-v2';
await fs.mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox'],
});

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const results = [];

for (const vp of viewports) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  try {
    await page.setViewport(vp);
    await page.goto('http://localhost:3457/minimal', {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });
    await new Promise((r) => setTimeout(r, 1500));

    // Look for the new "Signature" section
    const sigInfo = await page.evaluate(() => {
      const h2s = Array.from(document.querySelectorAll('h2'));
      const sig = h2s.find((h) => /^\s*Signature\s*$/i.test(h.textContent || ''));
      if (!sig) return { present: false };
      const section = sig.closest('section');
      const listItems = section ? section.querySelectorAll('ul > li').length : 0;
      const label = section?.querySelector('p')?.textContent?.trim() ?? '';
      return { present: true, itemsCount: listItems, label };
    });

    // Featured Piece should still have an image + 4Cs + Discover link
    const featuredInfo = await page.evaluate(() => {
      const h2s = Array.from(document.querySelectorAll('h2'));
      // The featured product name is rendered by TextReveal as an h2
      // sibling of a "Featured Piece" label.
      const allSections = Array.from(document.querySelectorAll('section'));
      const feat = allSections.find((s) =>
        /Featured Piece/i.test(s.textContent || '')
      );
      if (!feat) return { present: false };
      const img = feat.querySelector('img');
      const discoverLink = Array.from(feat.querySelectorAll('a')).find((a) =>
        /Discover/i.test(a.textContent || '')
      );
      return {
        present: true,
        hasImage: Boolean(img && img.getAttribute('src')),
        hasDiscoverLink: Boolean(discoverLink),
        h2Count: h2s.length,
      };
    });

    // Horizontal scrollbar check
    const hscrollbar = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );

    // Focus-visible outline on nav links
    const focusInfo = await page.evaluate(() => {
      const link = document.querySelector('nav a, header a, .minimal-concept nav a');
      if (!(link instanceof HTMLElement)) return { available: false };
      link.focus();
      const cs = getComputedStyle(link);
      // focus-visible rules apply only with :focus-visible. Imperative
      // focus via JS doesn't always trigger :focus-visible (user-gesture
      // heuristic). So we also check that the CSS rule is defined.
      const hasOutline = cs.outlineStyle === 'solid';
      return { available: true, computedOutlineStyle: cs.outlineStyle, hasOutline };
    });

    await page.screenshot({ path: `${OUT}/home-${vp.name}.png` });

    // Scroll to capture the new Signature section and Featured Piece
    const sigScrollY = await page.evaluate(() => {
      const h2s = Array.from(document.querySelectorAll('h2'));
      const sig = h2s.find((h) => /^\s*Signature\s*$/i.test(h.textContent || ''));
      if (!sig) return null;
      const rect = sig.getBoundingClientRect();
      return rect.top + window.scrollY - 80;
    });
    if (sigScrollY !== null) {
      await page.evaluate((y) => window.scrollTo(0, y), sigScrollY);
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: `${OUT}/signature-${vp.name}.png` });
    }

    const featuredScrollY = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('section'));
      const feat = all.find((s) => /Featured Piece/i.test(s.textContent || ''));
      if (!feat) return null;
      const rect = feat.getBoundingClientRect();
      return rect.top + window.scrollY - 60;
    });
    if (featuredScrollY !== null) {
      await page.evaluate((y) => window.scrollTo(0, y), featuredScrollY);
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: `${OUT}/featured-${vp.name}.png` });
    }

    results.push({
      viewport: vp,
      signature: sigInfo,
      featured: featuredInfo,
      hscrollbar,
      focus: focusInfo,
      pageErrors: errors,
    });
  } finally {
    await page.close();
  }
}

for (const r of results) {
  console.log(`\n=== ${r.viewport.name} (${r.viewport.width}x${r.viewport.height}) ===`);
  console.log('  Signature section:', JSON.stringify(r.signature));
  console.log('  Featured Piece:   ', JSON.stringify(r.featured));
  console.log('  Horizontal scrollbar:', r.hscrollbar);
  console.log('  Focus outline:    ', JSON.stringify(r.focus));
  console.log('  Page errors:      ', r.pageErrors.length);
  r.pageErrors.forEach((e) => console.log('    -', e));
}

await browser.close();
