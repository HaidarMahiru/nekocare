const { fetchHTML, extractListItems } = require('../lib/scraper');
const axios = require('axios');

module.exports = async (req, res) => {
  const { url, page = 1 } = req.query;
  if (!url) return res.status(400).json({ success: false, error: 'URL genre diperlukan' });

  try {
    const slugMatch = url.match(/\/genre\/([^\/]+)/);
    const slug = slugMatch ? slugMatch[1] : '';

    if (slug) {
      const resp = await axios.get(`https://nekopoi.care/wp-json/wp/v2/posts?categories=${slug}&page=${page}&per_page=20`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 12)' },
        validateStatus: () => true
      });
      if (resp.status === 200 && Array.isArray(resp.data)) {
        const items = resp.data.map(post => ({
          title: post.title?.rendered || '',
          url: post.link || '',
          poster: post.jetpack_featured_media_url || ''
        }));
        return res.json({ success: true, data: items });
      }
    }

    const pageUrl = page == 1 ? url : `${url}/page/${page}/`;
    const $ = await fetchHTML(pageUrl);
    const items = extractListItems($);
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};