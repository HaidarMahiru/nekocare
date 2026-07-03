const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const resp = await axios.get('https://nekopoi.care/random/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 12)' },
      maxRedirects: 0,
      validateStatus: status => status === 301 || status === 302 || status === 307
    });

    if (resp.headers.location) {
      res.json({ success: true, url: resp.headers.location });
    } else {
      const homeResp = await axios.get('https://nekopoi.care/', {
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 12)' }
      });
      const cheerio = require('cheerio');
      const $ = cheerio.load(homeResp.data);
      const links = [];
      $('.nk-search-item').each((i, el) => {
        const href = $(el).attr('href');
        if (href) links.push(href);
      });
      if (links.length > 0) {
        const randomUrl = links[Math.floor(Math.random() * links.length)];
        res.json({ success: true, url: randomUrl });
      } else {
        res.status(500).json({ success: false, error: 'Gagal mendapatkan URL acak' });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};