const { fetchHTML } = require('../lib/scraper');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, error: 'URL diperlukan' });

  try {
    const $ = await fetchHTML(url);
    const title = $('h1').first().text().trim();
    const poster = $('meta[property="og:image"]').attr('content') || '';
    const description = $('.entry-content').text().trim().slice(0, 500);
    const iframes = [];
    $('iframe').each((i, el) => {
      const src = $(el).attr('src');
      if (src && (src.includes('streampoi.com') || src.includes('playmogo.com'))) {
        iframes.push(src);
      }
    });

    res.json({
      success: true,
      data: { title, poster, description, iframes }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};