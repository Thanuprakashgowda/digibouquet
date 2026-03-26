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
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `;
  } catch (err) {
    console.error('Failed to initialize Postgres table:', err);
  }
}

export async function createBouquet(
  input: Omit<Bouquet, 'id' | 'createdAt'>
): Promise<Bouquet> {
  const id = nanoid(8);
  const createdAt = new Date().toISOString();
  const bouquet: Bouquet = { ...input, id, createdAt };

  if (isPostgres) {
    await initPostgres();
    await sql`
      INSERT INTO bouquets (id, occasion, title, flowers, message, style, arrangement, greenery, created_at)
      VALUES (
        ${id}, 
        ${input.occasion}, 
        ${input.title || null}, 
        ${JSON.stringify(input.flowers)}, 
        ${input.message}, 
        ${JSON.stringify(input.style)}, 
        ${input.arrangement || 'circle'}, 
        ${input.greenery || 'soft'}, 
        ${createdAt}
      );
    `;
  } else {
    const all = await readAllJson();
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
        style: r.style,
        arrangement: r.arrangement,
        greenery: r.greenery,
        createdAt: r.created_at,
      };
    } catch (err) {
      console.error('Postgres fetch error:', err);
      return null;
    }
  } else {
    const all = await readAllJson();
    return all[id] ?? null;
  }
}
