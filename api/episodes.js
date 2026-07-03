const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, error: 'URL diperlukan' });

  try {
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: 15000,
    });

    if (!html || typeof html !== 'string') {
      return res.json({ success: true, data: [] });
    }

    const $ = cheerio.load(html);
    const episodes = [];
    const seen = new Set();

    $('a.nk-episode-card').each((i, el) => {
      const href = $(el).attr('href');
      const title = $(el).find('.nk-episode-card-title').text().trim();
      if (href && title && !seen.has(href)) {
        seen.add(href);
        episodes.push({ title, url: href });
      }
    });

    if (episodes.length === 0) {
      $('a[href*="/episode/"], a[href*="/videos/"]').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        if (href && text && !text.toLowerCase().includes('download') && !seen.has(href)) {
          seen.add(href);
          episodes.push({ title: text, url: href });
        }
      });
    }

    if (episodes.length === 0) {
      $('a.nk-episode-card, a[href*="overflow"], a[href*="episode"]').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).find('.nk-episode-card-title').text().trim() || $(el).text().trim();
        if (href && text && !seen.has(href)) {
          seen.add(href);
          episodes.push({ title: text, url: href });
        }
      });
    }

    res.json({ success: true, data: episodes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};