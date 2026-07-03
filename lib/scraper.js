const axios = require('axios');
const cheerio = require('cheerio');

const USER_AGENT = 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';

async function fetchHTML(url) {
  const { data } = await axios.get(url, {
    headers: { 'User-Agent': USER_AGENT },
    timeout: 15000,
    validateStatus: () => true
  });
  return cheerio.load(data);
}

function extractListItems($) {
  const items = [];

  $('.nk-search-item').each((i, el) => {
    const $el = $(el);
    const title = $el.find('h2').text().trim() || $el.find('.title').text().trim() || $el.text().trim().slice(0, 100);
    const url = $el.attr('href');
    const poster = $el.find('img').attr('src') || $el.find('img').attr('data-src');
    if (url && title) items.push({ title, url, poster });
  });

  if (items.length === 0) {
    $('article, .post, .blog-entry').each((i, el) => {
      const $el = $(el);
      const titleEl = $el.find('h1 a, h2 a, .entry-title a').first();
      const title = titleEl.text().trim();
      const url = titleEl.attr('href');
      const img = $el.find('img').first();
      const poster = img.attr('src') || img.attr('data-src');
      if (url && title) items.push({ title, url, poster });
    });
  }

  if (items.length === 0) {
    $('.entry-content a, .post-content a, main a').each((i, el) => {
      const $el = $(el);
      const href = $el.attr('href');
      const text = $el.text().trim();
      if (href && text && text.length > 2 && !href.includes('wp-content') && !href.includes('javascript')) {
        items.push({ title: text, url: href });
      }
    });
  }

  return items;
}

module.exports = { fetchHTML, extractListItems };