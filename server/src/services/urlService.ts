import db from '../db/index.js';
import { nanoid } from 'nanoid';

export interface Url {
  id: number;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

export class UrlService {
  static async shorten(originalUrl: string): Promise<Url> {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      const shortCode = nanoid(6);
      
      try {
        const stmt = db.prepare('INSERT INTO urls (originalUrl, shortCode) VALUES (?, ?)');
        const info = stmt.run(originalUrl, shortCode);
        
        return {
          id: info.lastInsertRowid as number,
          originalUrl,
          shortCode,
          clicks: 0,
          createdAt: new Date().toISOString()
        };
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

  static async findByCode(shortCode: string): Promise<Url | null> {
    const stmt = db.prepare('SELECT * FROM urls WHERE shortCode = ?');
    const url = stmt.get(shortCode) as Url | undefined;
    return url || null;
  }

  static async incrementClicks(id: number): Promise<void> {
    const stmt = db.prepare('UPDATE urls SET clicks = clicks + 1 WHERE id = ?');
    stmt.run(id);
  }
}
