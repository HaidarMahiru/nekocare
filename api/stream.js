const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, error: 'URL diperlukan' });

  let browser;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36');

    let m3u8 = null;

    await page.setRequestInterception(true);
    page.on('request', interceptedReq => {
      if (interceptedReq.url().includes('.m3u8')) {
        m3u8 = interceptedReq.url();
        interceptedReq.abort();
      } else {
        interceptedReq.continue();
      }
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

    const iframeUrl = await page.$eval(
      'iframe[src*="streampoi.com"], iframe[src*="playmogo.com"]',
      el => el.src
    ).catch(() => null);

    if (!iframeUrl) {
      await browser.close();
      return res.status(404).json({ success: false, error: 'Iframe player tidak ditemukan' });
    }

    await page.goto(iframeUrl, { waitUntil: 'networkidle2', timeout: 15000 });

    await new Promise(r => setTimeout(r, 5000));

    await browser.close();

    if (!m3u8) {
      return res.status(404).json({ success: false, error: 'Stream tidak ditemukan' });
    }

    return res.json({ success: true, stream_url: m3u8 });
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    return res.status(500).json({ success: false, error: err.message });
  }
};
