module.exports = (req, res) => {
  res.json({
    success: true,
    data: [
      { name: "Home", slug: "", endpoint: "/api/list" },
      { name: "2D Animation", slug: "2d-hentai", endpoint: "/api/list?category=2d-hentai" },
      { name: "3D Hentai", slug: "3d-hentai", endpoint: "/api/list?category=3d-hentai" },
      { name: "Hentai", slug: "hentai", endpoint: "/api/list?category=hentai" },
      { name: "JAV", slug: "jav", endpoint: "/api/list?category=jav" },
      { name: "JAV Cosplay", slug: "jav-cosplay", endpoint: "/api/list?category=jav-cosplay" },
      { name: "Hentai List (A-Z)", slug: "hentai-list", endpoint: "/api/list?type=hentai-list" },
      { name: "JAV List", slug: "jav-list", endpoint: "/api/list?type=jav-list" },
      { name: "Genre List", slug: "genres", endpoint: "/api/genres" },
      { name: "Jadwal", slug: "schedule", endpoint: "/api/schedule" }
    ]
  });
};