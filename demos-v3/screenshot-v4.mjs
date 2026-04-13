import puppeteer from 'puppeteer'

const pages = [
  { name: 'home', path: '/minimal' },
  { name: 'about', path: '/minimal/about' },
  { name: 'collections', path: '/minimal/collections' },
  { name: 'category', path: '/minimal/category/diamond-rings' },
  { name: 'product', path: '/minimal/product/celestial-diamond-ring' },
  { name: 'contact', path: '/minimal/contact' },
  { name: 'faq', path: '/minimal/faq' },
  { name: 'journal', path: '/minimal/journal' },
  { name: 'craftsmanship', path: '/minimal/craftsmanship' },
  { name: 'bespoke', path: '/minimal/bespoke' },
]

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

for (const p of pages) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(`http://localhost:3001${p.path}`, { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise(r => setTimeout(r, 2000))
  await page.screenshot({ path: `/tmp/v4-${p.name}.png`, fullPage: true })
  console.log(`✓ ${p.name}`)
  await page.close()
}

await browser.close()
console.log('Done!')
