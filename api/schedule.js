const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const { data: html } = await axios.get('https://nekopoi.care/jadwal-new-hentai/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 12)' },
      timeout: 15000,
    });
    const $ = cheerio.load(html);
    const schedule = [];

    $('.entry-content h2, .entry-content h3').each((i, heading) => {
      const dateText = $(heading).text().trim();
      const items = [];
      let nextEl = $(heading).next();
      while (nextEl.length && !nextEl.is('h2, h3')) {
        if (nextEl.is('ul')) {
          nextEl.find('li').each((j, li) => {
            const text = $(li).text().trim();
            if (text) items.push(text);
          });
        } else if (nextEl.is('p')) {
          const text = nextEl.text().trim();
          if (text && !text.startsWith('NEW')) items.push(text);
        }
        nextEl = nextEl.next();
      }
      if (dateText || items.length > 0) {
        schedule.push({ date: dateText || 'Unknown', items });
      }
    });

    if (schedule.length === 0) {
      const rawText = $('.entry-content').text().trim();
      if (rawText) {
        schedule.push({ raw: rawText });
      } else {
        const fallback = $('body').text().trim().substring(0, 1000);
        if (fallback) schedule.push({ raw: fallback });
      }
    }

    res.json({ success: true, data: schedule });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};