const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const { data: html } = await axios.get('https://nekopoi.care/genre-list/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 12)' },
      timeout: 15000,
    });
    const $ = cheerio.load(html);
    const genres = [];
    const seen = new Set();

    $('a[href*="/genres/"]').each((i, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href && text && text.length > 1 && !href.includes('#')) {
        const key = href.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          genres.push({ name: text, url: href });
        }
      }
    });

    if (genres.length === 0) {
      $('a[href*="/genre/"]').each((i, el) => {
        const href = $(el).attr('href');
        const text = $(el).text().trim();
        if (href && text && text.length > 1 && !href.includes('#')) {
          const key = href.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            genres.push({ name: text, url: href });
          }
        }
      });
    }

    res.json({ success: true, data: genres });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};