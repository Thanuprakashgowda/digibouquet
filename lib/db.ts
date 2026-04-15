import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import { Bouquet } from './types';

const DB_FILE = path.join(process.cwd(), 'data', 'bouquets.json');
const isPostgres = !!process.env.POSTGRES_URL;

function ensureDb() {
  if (isPostgres) return;
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '{}');
}

async function readAllJson(): Promise<Record<string, Bouquet>> {
  ensureDb();
  try {
    const data = await fs.promises.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeAllJson(data: Record<string, Bouquet>) {
  ensureDb();
  await fs.promises.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

/**
 * Initialize the database table if using Postgres.
 * This is called automatically by getBouquet/createBouquet if needed.
 */
async function initPostgres() {
  if (!isPostgres) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS bouquets (
        id TEXT PRIMARY KEY,
        occasion TEXT NOT NULL,
        title TEXT,
        flowers JSONB NOT NULL,
        message TEXT NOT NULL,
        style JSONB NOT NULL,
        arrangement TEXT,
        greenery TEXT,
        views INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `;
    try {
      await sql`ALTER TABLE bouquets ADD COLUMN IF NOT EXISTS views INT DEFAULT 0;`;
      await sql`ALTER TABLE bouquets ADD COLUMN IF NOT EXISTS recipient TEXT;`;
    } catch (e) {
      // Ignored if column already exists or command fails
    }
  } catch (err) {
    console.error('Failed to initialize Postgres table:', err);
  }
}

export async function createBouquet(
  input: Omit<Bouquet, 'id' | 'createdAt' | 'views'> & { customSlug?: string }
): Promise<Bouquet> {
  const { customSlug, ...restInput } = input;
  const id = customSlug || nanoid(8);
  const createdAt = new Date().toISOString();
  const bouquet: Bouquet = { ...restInput, id, views: 0, createdAt };

  if (isPostgres) {
    await initPostgres();
    try {
      await sql`
        INSERT INTO bouquets (id, occasion, title, flowers, message, recipient, style, arrangement, greenery, views, created_at)
        VALUES (
          ${id}, 
          ${input.occasion}, 
          ${input.title || null}, 
          ${JSON.stringify(input.flowers)}, 
          ${input.message}, 
          ${input.recipient || null},
          ${JSON.stringify(input.style)}, 
          ${input.arrangement || 'circle'}, 
          ${input.greenery || 'soft'}, 
          0,
          ${createdAt}
        );
      `;
    } catch (err: any) {
      if (err.message && (err.message.includes('unique constraint') || err.message.includes('duplicate key'))) {
        throw new Error('Slug is already taken');
      }
      if (err.code === '23505') {
        throw new Error('Slug is already taken');
      }
      throw err;
    }
  } else {
    const all = await readAllJson();
    if (all[id]) {
      throw new Error('Slug is already taken');
    }
    all[id] = bouquet;
    await writeAllJson(all);
  }

  return bouquet;
}

export async function getBouquet(id: string): Promise<Bouquet | null> {
  if (isPostgres) {
    await initPostgres();
    try {
      const { rows } = await sql`SELECT * FROM bouquets WHERE id = ${id} LIMIT 1;`;
      if (rows.length === 0) return null;
      
      const r = rows[0];
      return {
        id: r.id,
        occasion: r.occasion,
        title: r.title,
        flowers: r.flowers,
        message: r.message,
        recipient: r.recipient,
        style: r.style,
        arrangement: r.arrangement,
        greenery: r.greenery,
        views: r.views ?? 0,
        createdAt: r.created_at,
      };
    } catch (err) {
      console.error('Postgres fetch error:', err);
      return null;
    }
  } else {
    const all = await readAllJson();
    const b = all[id] ?? null;
    if (b && b.views === undefined) b.views = 0;
    return b;
  }
}

export async function incrementBouquetViews(id: string): Promise<number> {
  if (isPostgres) {
    await initPostgres();
    try {
      const { rows } = await sql`
        UPDATE bouquets 
        SET views = views + 1 
        WHERE id = ${id} 
        RETURNING views;
      `;
      return rows[0]?.views ?? 0;
    } catch (err) {
      console.error('Postgres increment error:', err);
      return 0;
    }
  } else {
    const all = await readAllJson();
    if (all[id]) {
      all[id].views = (all[id].views || 0) + 1;
      await writeAllJson(all);
      return all[id].views;
    }
    return 0;
  }
}
