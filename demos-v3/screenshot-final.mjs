import puppeteer from 'puppeteer';

const pages = [
  { name: 'home', path: '/minimal' },
  { name: 'about', path: '/minimal/about' },
  { name: 'collections', path: '/minimal/collections' },
  { name: 'category', path: '/minimal/category/diamond-rings' },
  { name: 'product', path: '/minimal/product/celestial-diamond-ring' },
  { name: 'contact', path: '/minimal/contact' },
  { name: 'faq', path: '/minimal/faq' },
  { name: 'journal', path: '/minimal/journal' },
  { name: 'bespoke', path: '/minimal/bespoke' },
  { name: 'cart', path: '/minimal/cart' },
];

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const { name, path } of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:3001${path}`, { waitUntil: 'networkidle0', timeout: 30000 });
  // Scroll to trigger any lazy loading
  await page.evaluate(async () => {
    for (let i = 0; i < 10; i++) {
      window.scrollBy(0, 500);
      await new Promise(r => setTimeout(r, 200));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  });
  await page.screenshot({ path: `/tmp/final-${name}.png`, fullPage: true });
  console.log(`✓ ${name}`);
  await page.close();
}

await browser.close();
console.log('Done!');
