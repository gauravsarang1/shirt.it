import db from '../db/index.js';
import { nanoid } from 'nanoid';
import { getCache, setCache } from '../utils/redis.js';

export interface Url {
  id: number;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

export class UrlService {

  // 🔗 CREATE SHORT URL
  static async shorten(originalUrl: string): Promise<Url> {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      const shortCode = nanoid(6);

      try {
        const stmt = db.prepare(
          'INSERT INTO urls (originalUrl, shortCode) VALUES (?, ?)'
        );
        const info = stmt.run(originalUrl, shortCode);

        const urlData: Url = {
          id: info.lastInsertRowid as number,
          originalUrl,
          shortCode,
          clicks: 0,
          createdAt: new Date().toISOString(),
        };

        // ✅ Cache immediately (write-through)
        await setCache(`url:${shortCode}`, urlData, 3600); // 1 hour TTL

        return urlData;
      } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          retries++;
          continue;
        }
        throw error;
      }
    }

    throw new Error('Failed to generate unique short code');
  }

  // 🔍 GET ORIGINAL URL (CORE REDIS USE CASE)
  static async findByCode(shortCode: string): Promise<Url | null> {

    // 1️⃣ Try cache first
    const cached = await getCache<Url>(`url:${shortCode}`);
    if (cached) {
      return cached; // ⚡ fast path
    }

    // 2️⃣ Fallback to DB
    const stmt = db.prepare(
      'SELECT * FROM urls WHERE shortCode = ?'
    );
    const url = stmt.get(shortCode) as Url | undefined;

    if (!url) return null;

    // 3️⃣ Store in cache
    await setCache(`url:${shortCode}`, url, 3600);

    return url;
  }

  // 👆 INCREMENT CLICKS
  static async incrementClicks(id: number): Promise<void> {
    const stmt = db.prepare(
      'UPDATE urls SET clicks = clicks + 1 WHERE id = ?'
    );
    stmt.run(id);

  }
}