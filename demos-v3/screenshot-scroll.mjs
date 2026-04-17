import puppeteer from 'puppeteer'

const pages = [
  { name: 'home', path: '/minimal' },
  { name: 'about', path: '/minimal/about' },
  { name: 'collections', path: '/minimal/collections' },
  { name: 'product', path: '/minimal/product/celestial-diamond-ring' },
  { name: 'contact', path: '/minimal/contact' },
  { name: 'faq', path: '/minimal/faq' },
  { name: 'craftsmanship', path: '/minimal/craftsmanship' },
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
  await new Promise(r => setTimeout(r, 1500))
  
  // Scroll down the entire page in steps to trigger all whileInView animations
  const totalHeight = await page.evaluate(() => document.body.scrollHeight)
  const viewportHeight = 900
  let scrolled = 0
  while (scrolled < totalHeight) {
    scrolled += viewportHeight * 0.7
    await page.evaluate((y) => window.scrollTo(0, y), scrolled)
    await new Promise(r => setTimeout(r, 400))
  }
  
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0))
  await new Promise(r => setTimeout(r, 500))
  
  // Now take the full-page screenshot — all animations should have triggered
  await page.screenshot({ path: `/tmp/v5-${p.name}.png`, fullPage: true })
  console.log(`✓ ${p.name} (${totalHeight}px)`)
  await page.close()
}

await browser.close()
console.log('Done!')
