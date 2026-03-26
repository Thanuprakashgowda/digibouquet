# 🌸 DigiBouquet

> Create beautiful digital bouquets with personalised messages. Pick flowers, choose a card style, and share a unique link that blooms wherever it lands.

---

## Features

| Feature | Details |
|---|---|
| 🎂 Occasion picker | 8 occasions – birthday, love, sympathy, and more |
| 🌹 Flower library | 22 flowers with meanings + best-fit occasions |
| 💐 Live bouquet preview | Real-time circular cluster as you pick flowers |
| 🎨 Card styles | 6 pastel card backgrounds (Blossom, Meadow, Lavender…) |
| 🔗 Shareable links | `/b/[id]` – animated reveal for the recipient |
| 📚 Flower Library page | Full catalogue + occasion filters + sample bouquets |

---

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Storage**: JSON file (local dev) → Vercel Postgres (production)
- **Deployment**: Vercel

---

## Getting Started (Local)

```bash
git clone <your-repo-url>
cd digibouquet
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No env vars needed for local dev (uses JSON file storage).

---

## Project Structure

```
digibouquet/
├── app/
│   ├── api/bouquets/          # POST + GET route handlers
│   ├── b/[id]/                # Bouquet viewer (animated reveal)
│   ├── library/               # Flower library page
│   ├── layout.tsx             # Root layout + nav
│   ├── page.tsx               # Home – bouquet builder wizard
│   └── globals.css            # Tailwind + custom animations
├── components/                # FlowerCard, BouquetPreview, CardPreview, etc.
├── lib/
│   ├── types.ts               # TypeScript interfaces
│   ├── flowers.ts             # 22-flower catalogue
│   ├── styles.ts              # 6 card style presets
│   └── db.ts                  # JSON file storage (swap to Postgres via env var)
└── data/                      # Auto-created, stores bouquets.json
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) – Vercel auto-detects Next.js.
3. Click **Deploy**.
4. *(Optional)* Add Vercel Postgres, set `POSTGRES_URL`, update `lib/db.ts`.

### Deployment Checklist

- [ ] `npm run build` passes locally
- [ ] `POSTGRES_URL` set in Vercel env (if using Postgres)
- [ ] Test builder → create → open share link on production URL

---

## API

### `POST /api/bouquets`
Creates a bouquet. Returns `{ id, shareUrl }`.

### `GET /api/bouquets/:id`
Returns bouquet JSON or `404`.
