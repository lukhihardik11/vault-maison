import puppeteer from 'puppeteer'

const pages = [
  { name: 'home', url: '/minimal' },
  { name: 'about', url: '/minimal/about' },
  { name: 'collections', url: '/minimal/collections' },
  { name: 'product', url: '/minimal/product/celestial-diamond-ring' },
  { name: 'category', url: '/minimal/category/diamond-rings' },
  { name: 'contact', url: '/minimal/contact' },
  { name: 'faq', url: '/minimal/faq' },
  { name: 'journal', url: '/minimal/journal' },
  { name: 'craftsmanship', url: '/minimal/craftsmanship' },
  { name: 'bespoke', url: '/minimal/bespoke' },
  { name: 'cart', url: '/minimal/cart' },
  { name: 'checkout', url: '/minimal/checkout' },
  { name: 'account', url: '/minimal/account' },
  { name: 'search', url: '/minimal/search' },
  { name: 'grading', url: '/minimal/grading' },
  { name: 'care', url: '/minimal/care' },
  { name: 'shipping', url: '/minimal/shipping' },
]

const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})

for (const p of pages) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  try {
    await page.goto(`http://localhost:3001${p.url}`, { waitUntil: 'networkidle0', timeout: 30000 })
    // Scroll to trigger any lazy content
    await page.evaluate(async () => {
      const h = document.body.scrollHeight
      for (let y = 0; y < h; y += 400) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 100))
      }
      window.scrollTo(0, 0)
      await new Promise(r => setTimeout(r, 500))
    })
    await page.screenshot({ path: `/tmp/v6-${p.name}.png`, fullPage: true })
    console.log(`✓ ${p.name}`)
  } catch (e) {
    console.log(`✗ ${p.name}: ${e.message}`)
  }
  await page.close()
}

await browser.close()
console.log('Done!')
