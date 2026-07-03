const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      error: "URL diperlukan",
    });
  }

  let browser;

  try {
    const executablePath = await chromium.executablePath();

    console.log("Node:", process.version);
    console.log("Chromium:", executablePath);

    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      defaultViewport: chromium.defaultViewport,
      args: [
        ...chromium.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
        "--no-zygote",
      ],
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36"
    );

    let streamUrl = null;

    await page.setRequestInterception(true);

    page.on("request", (request) => {
      const reqUrl = request.url();

      if (
        reqUrl.includes(".m3u8") ||
        reqUrl.includes(".mpd")
      ) {
        console.log("STREAM:", reqUrl);
        streamUrl = reqUrl;
      }

      request.continue();
    });

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    const iframeUrl = await page
      .$eval(
        'iframe[src*="playmogo.com"], iframe[src*="streampoi.com"]',
        (el) => el.src
      )
      .catch(() => null);

    if (!iframeUrl) {
      return res.status(404).json({
        success: false,
        error: "Iframe player tidak ditemukan",
      });
    }

    await page.goto(iframeUrl, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    await page.waitForTimeout(8000);

    if (!streamUrl) {
      return res.status(404).json({
        success: false,
        error: "Stream (.m3u8) tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      stream_url: streamUrl,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
};
