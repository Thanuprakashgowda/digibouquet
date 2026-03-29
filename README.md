#  DigiBouquet

> Create beautiful digital bouquets with personalised messages. Pick realistic flowers, choose an arrangement, apply greenery, select a card style, and share a unique animated link that blooms wherever it lands.

---

## Features

- ** Occasion Picker**: 8 built-in occasions—birthday, love, sympathy, gratitude, and more.
- ** Botanical Flower Library**: 22 unique flowers, fully rendered as beautiful SVG illustrations (no more flat emojis!). Features layered rose petals, textured sunflowers, and detailed orchids.
- ** Live Bouquet Preview**: Real-time rendering as you pick flowers. 
- ** Arrangement Controls**: Customize the floristry layout! Choose between *Circle*, *Fan*, *Cascade*, *Bunch*, or *Diamond*.
- ** Greenery Options**: Add structure to your bouquet with *Soft*, *Lush*, *Minimal*, or *Tropical* botanical leaves.
- ** Card Styles**: 6 beautiful gradient card backgrounds (Blossom, Meadow, Lavender, Sunset, Ocean, Dawn).
- ** Shareable Links**: Generates a fast, server-rendered `/b/[id]` link with an animated layout reveal for the recipient.
- ** Flower Library Page**: A full catalogue of available flowers with occasion filters and meanings.

---

##  Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Vercel Postgres (Production) / Local JSON fallback (Development)
- **Deployment**: Vercel

---

##  Getting Started (Local Development)

You can run this project locally without any cloud credentials—it will automatically use a local JSON file (`data/bouquets.json`) for storage!

```bash
git clone https://github.com/Thanuprakashgowda/digibouquet.git
cd digibouquet
npm install
npm run dev
```

Open (https://digibouquet-tau.vercel.app/) 

*If you want to test the Postgres database locally, add your `POSTGRES_URL` to a `.env.local` file.*

---

##  Project Structure

```
digibouquet/
├── app/
│   ├── api/bouquets/          # POST + GET API route handlers
│   ├── b/[id]/                # Bouquet viewer page (animated reveal)
│   ├── library/               # Flower library UI
│   ├── layout.tsx             # Root layout, fonts, and footer credit
│   ├── page.tsx               # Home – The 5-step bouquet builder wizard
│   └── globals.css            # Tailwind + custom CSS entrance animations
├── components/
│   ├── BouquetCanvas.tsx      # Core SVG engine for rendering the realistic bouquet
│   ├── FlowerSVG.tsx          # 22 hand-coded botanical SVG illustrations
│   ├── BouquetPreview.tsx     # Live cluster preview
│   └── ArrangementControls.tsx# Toggles for layout and greenery
├── lib/
│   ├── db.ts                  # Async DB layer (Vercel Postgres + JSON fallback)
│   ├── flowers.ts             # 22-flower catalogue and metadata
│   ├── styles.ts              # Card style presets
│   └── types.ts               # Shared TypeScript interfaces
```

---

##  Deploy to Vercel (Production)

This app is production-ready and optimized for Vercel.

1. Publish this repository to your GitHub account.
2. Go to [Vercel](https://vercel.com/new) and click **"Add New Project"**.
3. Import your `digibouquet` repository and click **Deploy**.
4. Once deployed, click **Continue to Dashboard** and navigate to the **Storage** tab.
5. Click **Create Database** -> **Postgres** (Powered by Neon). Accept the defaults to connect it to your project.
6. Go back to your Vercel **Deployments** tab and click **Redeploy** on your latest build.

Vercel will automatically inject the `POSTGRES_URL` environment variable, and the app will instantly switch from local JSON storage to your new production Postgres database!

---

*Created by Thanuprakash Gowda*
