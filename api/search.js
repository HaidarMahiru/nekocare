const { fetchHTML, extractListItems } = require('../lib/scraper');

module.exports = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ success: false, error: 'Query q diperlukan' });

  try {
    const url = `https://nekopoi.care/?s=${encodeURIComponent(q)}`;
    const $ = await fetchHTML(url);
    const items = extractListItems($);
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};