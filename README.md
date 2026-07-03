<div align="center">

<br/>

<h2>🐱 QrtzNeko API</h2>

<img src="https://i.postimg.cc/Dy3twC9Z/qrtzneko.gif" width="100%" style="border-radius:24px" alt="qrtzneko" />

<p><strong>Unofficial REST API for <a href="https://nekopoi.care">NekoPoi.care</a></strong><br/>
Scrape, search, stream, and explore hentai subtitle Indonesia — all in one clean API.</p>

<br/>

[![Live API](https://img.shields.io/badge/🌐_Live_API-qrtzneko.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://qrtzneko.vercel.app)
[![Endpoints](https://img.shields.io/badge/📡_Endpoints-10-6e40c9?style=for-the-badge)](#-endpoint-reference)
[![No Rate Limit](https://img.shields.io/badge/⚡_Rate_Limit-NONE-22c55e?style=for-the-badge)](#%EF%B8%8F-limitations)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)](LICENSE)

<br/>

[![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=flat-square&logo=puppeteer&logoColor=white)](https://pptr.dev)
[![Cheerio](https://img.shields.io/badge/Cheerio-E88C1F?style=flat-square)](https://cheerio.js.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![JSON](https://img.shields.io/badge/Response-JSON-blue?style=flat-square)](https://qrtzneko.vercel.app/api/category)
[![REST](https://img.shields.io/badge/API-REST-orange?style=flat-square)](#)

<br/>

<p>
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-endpoint-reference">Endpoints</a> ·
  <a href="#-code-examples">Examples</a> ·
  <a href="#%EF%B8%8F-self-deploy">Self Deploy</a> ·
  <a href="#%EF%B8%8F-limitations">Limitations</a>
</p>

<br/>

</div>

---

## 📊 API at a Glance

| Metric | Value |
|--------|-------|
| 🌐 Base URL | `https://qrtzneko.vercel.app` |
| 📡 Total Endpoints | **10** |
| ⚡ Rate Limit | **None** |
| 🔑 Auth Required | **No** |
| 📦 Response Format | **JSON** |
| 🧩 Scraping Engine | Cheerio (static) + Puppeteer (stream) |
| 🚀 Avg Response Time | < 2 detik (non-stream) |
| 🎬 Stream Response Time | 15–30 detik |
| 🖥️ Hosting | Vercel Serverless |
| 📝 Content | Hentai subtitle Indonesia (NekoPoi.care) |

---

## ✨ Features

- 🔍 **Search** — Cari video berdasarkan judul/keyword
- 📋 **List** — Daftar video dari home, kategori, A-Z, dan halaman tertentu
- 🎬 **Stream Extraction** — Ambil URL m3u8 langsung, siap diputar via ffplay/VLC/mpv
- 📁 **Batch Episodes** — Ambil semua episode dari satu seri sekaligus
- 🏷️ **Genre Filtering** — Browse video berdasarkan genre spesifik
- 📅 **Release Schedule** — Jadwal rilis hentai terbaru
- 🎲 **Random Video** — Redirect ke video acak
- 🗂️ **Categories** — Daftar semua kategori yang tersedia
- ⚙️ **Consistent Error Format** — Semua error memiliki format seragam
- 🚫 **No Rate Limit** — Tidak ada pembatasan request

---

## 🚀 Quick Start

```bash
# Cek semua kategori
curl "https://qrtzneko.vercel.app/api/category"

# Cari video
curl "https://qrtzneko.vercel.app/api/search?q=elf"

# Ambil stream m3u8 langsung (15–30 detik)
curl "https://qrtzneko.vercel.app/api/stream?url=https://nekopoi.care/3d-sub-indo-mantra-cabul-ibu-guru-membuat-kontlo-langsung-ngaceng/"
```

Butuh lebih banyak contoh? Lihat bagian [Code Examples](#-code-examples) di bawah.

---

## 📡 Endpoint Reference

> **Base URL:** `https://qrtzneko.vercel.app`

| # | Endpoint | Method | Deskripsi | Avg Response |
|---|----------|--------|-----------|:------------:|
| 1 | [`/api/category`](#1-apicategory) | `GET` | Semua kategori tersedia | `< 1s` |
| 2 | [`/api/list`](#2-apilist) | `GET` | Daftar video (home / kategori / A-Z) | `< 2s` |
| 3 | [`/api/search`](#3-apisearch) | `GET` | Cari video berdasarkan judul | `< 2s` |
| 4 | [`/api/detail`](#4-apidetail) | `GET` | Detail video + iframe player | `< 2s` |
| 5 | [`/api/stream`](#5-apistream) | `GET` | Ekstrak URL m3u8 via Puppeteer | `15–30s` |
| 6 | [`/api/genres`](#6-apigenres) | `GET` | Semua genre tersedia | `< 1s` |
| 7 | [`/api/genre`](#7-apigenre) | `GET` | Video berdasarkan genre | `< 2s` |
| 8 | [`/api/episodes`](#8-apiepisodes) | `GET` | Daftar episode dari seri/batch | `< 2s` |
| 9 | [`/api/random`](#9-apirandom) | `GET` | Redirect ke video acak | `< 2s` |
| 10 | [`/api/schedule`](#10-apischedule) | `GET` | Jadwal rilis hentai terbaru | `< 2s` |

---

### 1. `/api/category`

Mengembalikan daftar semua kategori yang tersedia di NekoPoi beserta slug dan endpoint-nya.

**Request**

```http
GET /api/category
```

```bash
curl "https://qrtzneko.vercel.app/api/category"
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "name": "3D Hentai",
      "slug": "3d-hentai",
      "endpoint": "/api/list?category=3d-hentai"
    },
    {
      "name": "JAV Cosplay",
      "slug": "jav-cosplay",
      "endpoint": "/api/list?category=jav-cosplay"
    }
  ]
}
```

**Response Fields**

| Field | Type | Deskripsi |
|-------|------|-----------|
| `data[].name` | `string` | Nama kategori (display) |
| `data[].slug` | `string` | Slug untuk digunakan di `/api/list?category=` |
| `data[].endpoint` | `string` | Shortcut endpoint siap pakai |

---

### 2. `/api/list`

Mendapatkan daftar video dari berbagai halaman dan kategori.

**Request**

```http
GET /api/list?[type]&[page]&[letter]&[category]
```

**Query Parameters**

| Parameter | Type | Default | Deskripsi |
|-----------|------|---------|-----------|
| `type` | `string` | `home` | Jenis halaman: `home`, `hentai-list`, `jav-list`, `az-list` |
| `page` | `number` | `1` | Nomor halaman |
| `letter` | `string` | `a` | Huruf awal — **hanya untuk `az-list`** |
| `category` | `string` | — | Slug kategori, contoh: `3d-hentai`, `jav` |

**Request Examples**

```bash
# Halaman utama (default)
curl "https://qrtzneko.vercel.app/api/list"

# Halaman 3
curl "https://qrtzneko.vercel.app/api/list?page=3"

# Kategori 3D Hentai halaman 2
curl "https://qrtzneko.vercel.app/api/list?category=3d-hentai&page=2"

# Semua hentai A-Z
curl "https://qrtzneko.vercel.app/api/list?type=hentai-list"

# Semua JAV
curl "https://qrtzneko.vercel.app/api/list?type=jav-list"

# A-Z filter huruf B
curl "https://qrtzneko.vercel.app/api/list?type=az-list&letter=b"
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "title": "[3D SUB INDO] Mantra Cabul Ibu Guru",
      "url": "https://nekopoi.care/3d-sub-indo-mantra-cabul/",
      "poster": "https://nekopoi.care/wp-content/uploads/2026/05/poster.jpg"
    }
  ],
  "meta": {
    "url": "https://nekopoi.care/category/3d-hentai/page/2/",
    "count": 20
  }
}
```

**Response Fields**

| Field | Type | Deskripsi |
|-------|------|-----------|
| `data[].title` | `string` | Judul video |
| `data[].url` | `string` | URL halaman video di NekoPoi |
| `data[].poster` | `string` | URL thumbnail/poster |
| `meta.url` | `string` | URL sumber yang di-scrape |
| `meta.count` | `number` | Jumlah item yang dikembalikan |

---

### 3. `/api/search`

Cari video berdasarkan keyword/judul.

**Request**

```http
GET /api/search?q={keyword}
```

**Query Parameters**

| Parameter | Type | Required | Deskripsi |
|-----------|------|:--------:|-----------|
| `q` | `string` | ✅ | Kata kunci pencarian |

**Request Examples**

```bash
# Pencarian sederhana
curl "https://qrtzneko.vercel.app/api/search?q=elf"

# Pencarian dengan spasi (URL encoded)
curl "https://qrtzneko.vercel.app/api/search?q=big%20boobs"

# Dari terminal (auto encode)
curl -G "https://qrtzneko.vercel.app/api/search" --data-urlencode "q=ibu tiri"
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "title": "[3D] Rahasia Futa Elf Bersama Teman Kantor",
      "url": "https://nekopoi.care/3d-rahasia-futa-elf/",
      "poster": ""
    }
  ]
}
```

> ℹ️ `poster` bisa berupa string kosong jika NekoPoi tidak menyertakan thumbnail di halaman search.

---

### 4. `/api/detail`

Mengembalikan informasi lengkap sebuah video beserta daftar iframe player yang tersedia.

**Request**

```http
GET /api/detail?url={videoUrl}
```

**Query Parameters**

| Parameter | Type | Required | Deskripsi |
|-----------|------|:--------:|-----------|
| `url` | `string` | ✅ | URL halaman video di NekoPoi.care |

**Request Example**

```bash
curl "https://qrtzneko.vercel.app/api/detail?url=https://nekopoi.care/3d-sub-indo-mantra-cabul-ibu-guru-membuat-kontlo-langsung-ngaceng/"
```

**Response**

```json
{
  "success": true,
  "data": {
    "title": "[3D SUB INDO] Mantra Cabul Ibu Guru Membuat Kontlo Langsung Ngaceng",
    "poster": "https://nekopoi.care/wp-content/uploads/2026/05/vlcsnap-2026-05-28-13h24m11s001.jpg",
    "description": "",
    "iframes": [
      "https://playmogo.com/e/a8fetria4zqw",
      "https://playmogo.com/e/oey87obck22i",
      "https://streampoi.com/embed-t64h9ack2uha.html"
    ]
  }
}
```

**Response Fields**

| Field | Type | Deskripsi |
|-------|------|-----------|
| `data.title` | `string` | Judul lengkap video |
| `data.poster` | `string` | URL poster/thumbnail resolusi penuh |
| `data.description` | `string` | Deskripsi video (bisa kosong) |
| `data.iframes` | `string[]` | Array URL iframe player yang tersedia |

> 💡 `iframes` bisa memiliki lebih dari 1 sumber. Gunakan array ini sebagai input untuk `/api/stream`.

---

### 5. `/api/stream`

> ⚠️ **Endpoint paling berat.** Menggunakan Puppeteer headless browser untuk mengeksekusi JavaScript player dan menangkap URL m3u8 yang muncul dari network request.

**Request**

```http
GET /api/stream?url={videoUrl}
```

**Query Parameters**

| Parameter | Type | Required | Deskripsi |
|-----------|------|:--------:|-----------|
| `url` | `string` | ✅ | URL halaman video di NekoPoi.care |

**Request Examples**

```bash
# Ambil stream URL
curl "https://qrtzneko.vercel.app/api/stream?url=https://nekopoi.care/3d-sub-indo-mantra-cabul-ibu-guru-membuat-kontlo-langsung-ngaceng/"

# Simpan ke file
curl -s "https://qrtzneko.vercel.app/api/stream?url=..." | jq -r '.stream_url' > stream.txt

# Putar langsung dengan ffplay
STREAM=$(curl -s "https://qrtzneko.vercel.app/api/stream?url=..." | jq -r '.stream_url')
ffplay "$STREAM"

# Putar langsung dengan mpv
mpv --referrer="https://nekopoi.care/" "$STREAM"

# Download dengan ffmpeg
ffmpeg -headers "Referer: https://nekopoi.care/" -i "$STREAM" -c copy output.mp4
```

**Response (Success)**

```json
{
  "success": true,
  "stream_url": "https://rap7c5roebejl0.streamruby.net/hls2/03/00422/.../index-v1-a1.m3u8?t=..."
}
```

**Response (Error)**

```json
{
  "success": false,
  "error": "Iframe player tidak ditemukan"
}
```

**Response Fields**

| Field | Type | Deskripsi |
|-------|------|-----------|
| `stream_url` | `string` | URL m3u8/HLS siap diputar |

> ⏱️ Endpoint ini membutuhkan **15–30 detik**. Set timeout client Anda ke minimal 35 detik.  
> 🔗 Sertakan header `Referer: https://nekopoi.care/` saat memutar stream untuk menghindari hotlink protection.

---

### 6. `/api/genres`

Mengembalikan daftar semua genre yang tersedia beserta URL masing-masing.

**Request**

```http
GET /api/genres
```

```bash
curl "https://qrtzneko.vercel.app/api/genres"
```

**Response**

```json
{
  "success": true,
  "data": [
    { "name": "Ahegao", "url": "https://nekopoi.care/genre/ahegao/" },
    { "name": "Big Boobs", "url": "https://nekopoi.care/genre/big-boobs/" },
    { "name": "Netorare", "url": "https://nekopoi.care/genre/netorare/" }
  ]
}
```

> 💡 Gunakan field `url` dari response ini sebagai parameter `url` di `/api/genre`.

---

### 7. `/api/genre`

Mendapatkan daftar video berdasarkan genre tertentu dengan pagination.

**Request**

```http
GET /api/genre?url={genreUrl}&[page]
```

**Query Parameters**

| Parameter | Type | Required | Default | Deskripsi |
|-----------|------|:--------:|---------|-----------|
| `url` | `string` | ✅ | — | URL halaman genre dari `/api/genres` |
| `page` | `number` | ❌ | `1` | Nomor halaman |

**Request Examples**

```bash
# Halaman 1 genre Big Boobs
curl "https://qrtzneko.vercel.app/api/genre?url=https://nekopoi.care/genre/big-boobs/"

# Halaman 2
curl "https://qrtzneko.vercel.app/api/genre?url=https://nekopoi.care/genre/big-boobs/&page=2"
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "title": "Bakunyuu Bomb Episode 1",
      "url": "https://nekopoi.care/bakunyuu-bomb-ep-1/",
      "poster": "https://nekopoi.care/wp-content/uploads/2024/12/bakunyuu.jpg"
    }
  ]
}
```

---

### 8. `/api/episodes`

Mendapatkan daftar semua episode dari halaman seri atau batch.

**Request**

```http
GET /api/episodes?url={seriesUrl}
```

**Query Parameters**

| Parameter | Type | Required | Deskripsi |
|-----------|------|:--------:|-----------|
| `url` | `string` | ✅ | URL halaman seri/batch di NekoPoi |

**Request Example**

```bash
curl "https://qrtzneko.vercel.app/api/episodes?url=https://nekopoi.care/episode/kokuhaku-sub/"
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "title": "Kokuhaku Vol 1 Sub-Eng",
      "url": "https://nekopoi.care/videos/vGqzksUI0J/"
    },
    {
      "title": "Kokuhaku ตอนที่ 1 ซับไทย",
      "url": "https://nekopoi.care/videos/SWhg0mImcj/"
    }
  ]
}
```

**Response Fields**

| Field | Type | Deskripsi |
|-------|------|-----------|
| `data[].title` | `string` | Judul episode |
| `data[].url` | `string` | URL episode — bisa langsung dipakai di `/api/stream` |

---

### 9. `/api/random`

Mengembalikan URL video acak dari NekoPoi. Berguna untuk fitur "surprise me".

**Request**

```http
GET /api/random
```

```bash
curl "https://qrtzneko.vercel.app/api/random"
```

**Response**

```json
{
  "success": true,
  "url": "https://nekopoi.care/elf-no-futagohime-episode-1/"
}
```

> 💡 Feed `url` dari response ini langsung ke `/api/detail` atau `/api/stream`.

---

### 10. `/api/schedule`

Mengembalikan jadwal rilis hentai terbaru yang diumumkan di NekoPoi.

**Request**

```http
GET /api/schedule
```

```bash
curl "https://qrtzneko.vercel.app/api/schedule"
```

**Response**

```json
{
  "success": true,
  "data": [
    {
      "date": "NEW Hentai Release di Mei 2026",
      "items": [
        "Chimimouryou (Episode 2) - Queen Bee - 22 Mei 2026",
        "Anal Mania Otaku (Episode 2) - White Bear - 29 Mei 2026"
      ]
    }
  ]
}
```

**Response Fields**

| Field | Type | Deskripsi |
|-------|------|-----------|
| `data[].date` | `string` | Label periode jadwal |
| `data[].items` | `string[]` | Daftar rilis dalam periode tersebut |

---

## 🔧 Error Handling

Semua endpoint mengembalikan format error yang **seragam dan konsisten**, terlepas dari penyebab errornya.

**Error Response Schema**

```json
{
  "success": false,
  "error": "Deskripsi error yang jelas dan spesifik"
}
```

**HTTP Status Codes**

| Status | Kode | Arti |
|--------|------|------|
| ✅ | `200` | Request berhasil |
| ❌ | `400` | Parameter tidak lengkap atau salah format |
| 🔍 | `404` | Konten tidak ditemukan di sumber |
| 💥 | `500` | Server error / scraping gagal |

**Contoh Error Responses**

```json
// 400 - Parameter wajib tidak disertakan
{
  "success": false,
  "error": "Parameter 'url' wajib diisi"
}

// 404 - Konten tidak ada
{
  "success": false,
  "error": "Video tidak ditemukan"
}

// 500 - Scraping gagal (timeout / perubahan struktur HTML)
{
  "success": false,
  "error": "Iframe player tidak ditemukan"
}
```

---

## 💡 Code Examples

### Bash — Search → Detail → Stream

```bash
#!/bin/bash

QUERY="${1:-elf}"
BASE="https://qrtzneko.vercel.app"

echo "🔍 Mencari: $QUERY"

RESULT=$(curl -s "$BASE/api/search?q=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$QUERY'))")" | jq -r '.data[0]')

if [ -z "$RESULT" ] || [ "$RESULT" = "null" ]; then
  echo "❌ Tidak ada hasil ditemukan"
  exit 1
fi

TITLE=$(echo "$RESULT" | jq -r '.title')
URL=$(echo "$RESULT" | jq -r '.url')

echo "📄 Judul : $TITLE"
echo "🔗 URL   : $URL"
echo "⏳ Mengambil stream (15–30 detik)..."

STREAM=$(curl -s --max-time 40 "$BASE/api/stream?url=$URL" | jq -r '.stream_url')

if [ -z "$STREAM" ] || [ "$STREAM" = "null" ]; then
  echo "❌ Gagal mengambil stream"
  exit 1
fi

echo "✅ Stream URL: $STREAM"
echo ""
echo "▶️  Memutar dengan ffplay..."
ffplay -loglevel quiet -headers "Referer: https://nekopoi.care/" "$STREAM"
```

### Bash — Batch Download Semua Episode

```bash
#!/bin/bash

BATCH_URL="${1:-https://nekopoi.care/episode/kokuhaku-sub/}"
BASE="https://qrtzneko.vercel.app"
OUTPUT_DIR="./downloads"
mkdir -p "$OUTPUT_DIR"

echo "📚 Mengambil daftar episode dari: $BATCH_URL"

EPISODES=$(curl -s "$BASE/api/episodes?url=$BATCH_URL" | jq -r '.data[].url')

if [ -z "$EPISODES" ]; then
  echo "❌ Tidak ada episode ditemukan"
  exit 1
fi

INDEX=1
for EP in $EPISODES; do
  echo ""
  echo "[$INDEX] ⬇️  Memproses: $EP"
  
  STREAM=$(curl -s --max-time 40 "$BASE/api/stream?url=$EP" | jq -r '.stream_url')
  
  if [ -n "$STREAM" ] && [ "$STREAM" != "null" ]; then
    FILENAME="$OUTPUT_DIR/episode_$(printf '%02d' $INDEX).mp4"
    echo "     💾 Menyimpan ke: $FILENAME"
    ffmpeg -loglevel error \
      -headers "Referer: https://nekopoi.care/" \
      -i "$STREAM" \
      -c copy "$FILENAME"
    echo "     ✅ Selesai"
  else
    echo "     ⚠️  Stream tidak tersedia untuk episode ini"
  fi
  
  INDEX=$((INDEX + 1))
done

echo ""
echo "🎉 Download selesai. File tersimpan di: $OUTPUT_DIR"
```

### Node.js — Full Client

```javascript
const BASE_URL = 'https://qrtzneko.vercel.app';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data;
}

const qrtzneko = {
  async categories() {
    const { data } = await request('/api/category');
    return data;
  },

  async list({ type = 'home', page = 1, category, letter } = {}) {
    const params = new URLSearchParams({ type, page });
    if (category) params.set('category', category);
    if (letter) params.set('letter', letter);
    const { data, meta } = await request(`/api/list?${params}`);
    return { data, meta };
  },

  async search(query) {
    const { data } = await request(`/api/search?q=${encodeURIComponent(query)}`);
    return data;
  },

  async detail(url) {
    const { data } = await request(`/api/detail?url=${encodeURIComponent(url)}`);
    return data;
  },

  async stream(url) {
    const { stream_url } = await request(`/api/stream?url=${encodeURIComponent(url)}`);
    return stream_url;
  },

  async genres() {
    const { data } = await request('/api/genres');
    return data;
  },

  async genre(url, page = 1) {
    const { data } = await request(`/api/genre?url=${encodeURIComponent(url)}&page=${page}`);
    return data;
  },

  async episodes(url) {
    const { data } = await request(`/api/episodes?url=${encodeURIComponent(url)}`);
    return data;
  },

  async random() {
    const { url } = await request('/api/random');
    return url;
  },

  async schedule() {
    const { data } = await request('/api/schedule');
    return data;
  },
};

(async () => {
  const results = await qrtzneko.search('elf');
  console.log('Search results:', results.length);

  if (!results.length) return;

  const detail = await qrtzneko.detail(results[0].url);
  console.log('Title:', detail.title);
  console.log('Players:', detail.iframes.length);

  const streamUrl = await qrtzneko.stream(results[0].url);
  console.log('Stream URL:', streamUrl);
})();
```

### Python — Async Client

```python
import asyncio
import aiohttp
from urllib.parse import urlencode, quote

BASE_URL = "https://qrtzneko.vercel.app"


async def request(session: aiohttp.ClientSession, path: str) -> dict:
    async with session.get(f"{BASE_URL}{path}", timeout=aiohttp.ClientTimeout(total=40)) as resp:
        data = await resp.json()
        if not data.get("success"):
            raise ValueError(data.get("error", "Unknown error"))
        return data


class QrtzNekoClient:
    def __init__(self, session: aiohttp.ClientSession):
        self.session = session

    async def search(self, query: str) -> list:
        data = await request(self.session, f"/api/search?q={quote(query)}")
        return data["data"]

    async def detail(self, url: str) -> dict:
        data = await request(self.session, f"/api/detail?url={quote(url)}")
        return data["data"]

    async def stream(self, url: str) -> str:
        data = await request(self.session, f"/api/stream?url={quote(url)}")
        return data["stream_url"]

    async def genres(self) -> list:
        data = await request(self.session, "/api/genres")
        return data["data"]

    async def genre(self, url: str, page: int = 1) -> list:
        data = await request(self.session, f"/api/genre?url={quote(url)}&page={page}")
        return data["data"]

    async def episodes(self, url: str) -> list:
        data = await request(self.session, f"/api/episodes?url={quote(url)}")
        return data["data"]

    async def random(self) -> str:
        data = await request(self.session, "/api/random")
        return data["url"]

    async def schedule(self) -> list:
        data = await request(self.session, "/api/schedule")
        return data["data"]


async def main():
    async with aiohttp.ClientSession() as session:
        client = QrtzNekoClient(session)

        results = await client.search("elf")
        print(f"Found: {len(results)} results")

        if not results:
            return

        detail = await client.detail(results[0]["url"])
        print(f"Title: {detail['title']}")
        print(f"Players: {len(detail['iframes'])}")

        print("Fetching stream (15-30s)...")
        stream_url = await client.stream(results[0]["url"])
        print(f"Stream: {stream_url}")


asyncio.run(main())
```

### TypeScript — Typed Client

```typescript
const BASE_URL = 'https://qrtzneko.vercel.app';

interface VideoItem {
  title: string;
  url: string;
  poster: string;
}

interface DetailData {
  title: string;
  poster: string;
  description: string;
  iframes: string[];
}

interface GenreItem {
  name: string;
  url: string;
}

interface EpisodeItem {
  title: string;
  url: string;
}

interface ScheduleItem {
  date: string;
  items: string[];
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  const json: ApiResponse<T> = await res.json();
  if (!json.success || !json.data) throw new Error(json.error ?? 'Request failed');
  return json.data;
}

export const qrtzneko = {
  search: (query: string) =>
    api<VideoItem[]>(`/api/search?q=${encodeURIComponent(query)}`),

  detail: (url: string) =>
    api<DetailData>(`/api/detail?url=${encodeURIComponent(url)}`),

  stream: async (url: string): Promise<string> => {
    const res = await fetch(`${BASE_URL}/api/stream?url=${encodeURIComponent(url)}`);
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.stream_url as string;
  },

  genres: () => api<GenreItem[]>('/api/genres'),

  genre: (url: string, page = 1) =>
    api<VideoItem[]>(`/api/genre?url=${encodeURIComponent(url)}&page=${page}`),

  episodes: (url: string) =>
    api<EpisodeItem[]>(`/api/episodes?url=${encodeURIComponent(url)}`),

  schedule: () => api<ScheduleItem[]>('/api/schedule'),

  random: async (): Promise<string> => {
    const res = await fetch(`${BASE_URL}/api/random`);
    const json = await res.json();
    return json.url as string;
  },
};
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              QrtzNeko API                   │
│           (Vercel Serverless)               │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼───────┐    ┌────────▼────────┐
│  Static Scrape │    │  Dynamic Scrape │
│  (Cheerio)     │    │  (Puppeteer)    │
└───────┬───────┘    └────────┬────────┘
        │                     │
        │  HTTP Request        │  Headless Chrome
        ▼                     ▼
┌────────────────────────────────────────┐
│            NekoPoi.care                │
│  (HTML pages, iframe players, m3u8)   │
└────────────────────────────────────────┘
```

**Dua mode scraping:**

| Mode | Engine | Digunakan oleh | Kecepatan |
|------|--------|----------------|-----------|
| Static | Cheerio + node-fetch | Semua endpoint kecuali `/stream` | < 2 detik |
| Dynamic | Puppeteer headless | `/api/stream` | 15–30 detik |

Puppeteer digunakan khusus untuk stream karena URL m3u8 dihasilkan secara dinamis melalui JavaScript player di iframe. Tanpa eksekusi JS, URL tersebut tidak bisa didapat.

---

## 🛠️ Self Deploy

Kamu bisa deploy instance sendiri ke Vercel secara gratis.

### Prasyarat

- Node.js 18+
- Vercel CLI atau akun Vercel
- Git

### Langkah Deploy

```bash
# 1. Clone repositori
git clone https://github.com/meguminn1/nekopoi-scrapper.git
cd nekopoi-scrapper

# 2. Install dependencies
npm install

# 3. Jalankan lokal untuk testing
npm run dev

# 4. Install Vercel CLI (jika belum)
npm i -g vercel

# 5. Login dan deploy
vercel login
vercel --prod
```

### Konfigurasi Vercel (opsional)

Buat file `vercel.json` di root jika belum ada:

```json
{
  "functions": {
    "api/stream.js": {
      "maxDuration": 30
    }
  }
}
```

> ⚠️ Endpoint `/api/stream` membutuhkan **maxDuration 30 detik**. Vercel Free plan memiliki batas 10 detik untuk serverless functions. Upgrade ke **Vercel Pro** untuk memanfaatkan endpoint stream secara penuh.

---

## ⚠️ Limitations

| Limitasi | Detail |
|----------|--------|
| 🕐 **Stream Timeout** | `/api/stream` butuh 15–30 detik. Vercel Free plan timeout 10 detik — stream **mungkin gagal** di free plan. Upgrade ke Pro untuk batas 30 detik. |
| 🖼️ **Poster Kosong** | Beberapa item tidak memiliki poster. Ini bukan bug — NekoPoi memang tidak menyertakan gambar di semua halaman. |
| 🔗 **Hotlink Protection** | Sertakan header `Referer: https://nekopoi.care/` saat memutar stream URL agar tidak di-block CDN. |
| 🌐 **Ketergantungan Sumber** | API ini scraping langsung dari NekoPoi.care. Jika struktur HTML berubah, beberapa endpoint bisa error sementara. |
| 🔞 **Konten Dewasa** | API ini mengakses konten dewasa. Pastikan penggunaan sesuai hukum yang berlaku di wilayah kamu. |

---

## 📄 License

MIT License — bebas digunakan, dimodifikasi, dan didistribusikan dengan tetap menyertakan atribusi.

---

<div align="center">

**QrtzNeko API** · dibuat oleh [@meguminn1](https://github.com/meguminn1)

[![GitHub](https://img.shields.io/badge/GitHub-meguminn1-181717?style=flat-square&logo=github)](https://github.com/meguminn1/nekopoi-scrapper)
[![Issues](https://img.shields.io/badge/Issues-Open-red?style=flat-square&logo=github)](https://github.com/meguminn1/nekopoi-scrapper/issues)
[![Live API](https://img.shields.io/badge/API-qrtzneko.vercel.app-000?style=flat-square&logo=vercel)](https://qrtzneko.vercel.app)

</div>
