import puppeteer from 'puppeteer';

const pages = [
  { name: 'home', path: '/minimal' },
  { name: 'about', path: '/minimal/about' },
  { name: 'collections', path: '/minimal/collections' },
  { name: 'category', path: '/minimal/category/diamond-rings' },
  { name: 'product', path: '/minimal/product/celestial-diamond-ring' },
  { name: 'bespoke', path: '/minimal/bespoke' },
  { name: 'contact', path: '/minimal/contact' },
  { name: 'faq', path: '/minimal/faq' },
  { name: 'journal', path: '/minimal/journal' },
  { name: 'search', path: '/minimal/search' },
  { name: 'craftsmanship', path: '/minimal/craftsmanship' },
  { name: 'care', path: '/minimal/care' },
  { name: 'shipping', path: '/minimal/shipping' },
  { name: 'grading', path: '/minimal/grading' },
  { name: 'account', path: '/minimal/account' },
  { name: 'cart', path: '/minimal/cart' },
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const page of pages) {
    const p = await browser.newPage();
    await p.setViewport({ width: 1440, height: 900 });
    await p.goto(`http://localhost:3001${page.path}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    await p.screenshot({ path: `/tmp/v2-${page.name}.png`, fullPage: true });
    console.log(`✓ ${page.name}`);
    await p.close();
  }

  await browser.close();
  console.log('Done!');
})();
