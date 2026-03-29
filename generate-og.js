const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const filePath = path.resolve(__dirname, 'og-generate.html');
  await page.goto(`file:///${filePath.replace(/\\/g, '/')}`);
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(__dirname, 'og-image.png'),
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  await browser.close();
  console.log('✅ og-image.png を生成しました');
})();
