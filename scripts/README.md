# Website Content Migration Script

`scrape_site.py` crawls an existing website and extracts all text content
(headings, paragraphs, lists, tables, contact emails/phones, metadata) plus
every image URL, saving everything into a clean structured JSON file ready to
drop into a React/Next.js project. It can also download the images.

## 1. Install dependencies

```bash
pip install requests beautifulsoup4 lxml
```

## 2. Run it

Crawl a site and save JSON:

```bash
python scripts/scrape_site.py https://THE-EXISTING-MALHAR-SITE.com \
  --max-pages 60 \
  --out data/site_content.json
```

Also download all images locally (for logos, campus/faculty photos):

```bash
python scripts/scrape_site.py https://THE-EXISTING-MALHAR-SITE.com \
  --download-images --assets-dir data/assets \
  --out data/site_content.json
```

Limit crawling to a section only (e.g. institutions):

```bash
python scripts/scrape_site.py https://THE-EXISTING-MALHAR-SITE.com \
  --same-path /institutions
```

## 3. Output shape (`site_content.json`)

```json
{
  "site": "https://example.com",
  "scraped_at": "2026-...Z",
  "stats": { "pages": 24, "images": 88 },
  "pages": [
    {
      "url": "https://example.com/about",
      "title": "About Us",
      "meta_description": "...",
      "og_title": "...",
      "og_image": "...",
      "headings": { "h1": ["..."], "h2": ["..."], "h3": ["..."] },
      "sections": [ { "title": "Malhar College of Qur'an Studies", "description": "..." } ],
      "paragraphs": ["...", "..."],
      "lists": [["item a", "item b"]],
      "tables": [[["Name","Role"],["...","..."]]],
      "emails": ["info@example.com"],
      "phones": ["+91 ..."]
    }
  ],
  "images": [ { "url": "https://...jpg", "alt": "Campus", "found_on": "https://.../gallery" } ],
  "downloaded_images": [ { "url": "...", "file": "data/assets/000_logo.png", "alt": "logo" } ]
}
```

`sections` is a heuristic pairing of each `h2/h3` with the text that follows —
ideal for pulling institution names + one-line descriptions.

## 4. Using the data in this project

- Text: map `pages[].sections` / `paragraphs` into the seed data in
  `backend/server.py` (INSTITUTIONS / INSTRUCTORS) or paste into the Admin panel.
- Images: review `images[]`, download the ones you have rights to, then upload
  them through the Admin **Gallery** tab (drag & drop) — they'll appear on the
  public gallery automatically.

## Safety notes

- Respects `robots.txt` by default. Only use `--ignore-robots` on a site you own
  or have explicit permission to crawl.
- Rate-limited via `--delay` (seconds between requests) and sends a descriptive
  User-Agent. Stays strictly on the same domain.
- Only lift **your client's own** copy/photos/logos. Do not scrape other
  organizations' branded assets.
