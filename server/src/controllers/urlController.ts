import { Request, Response } from 'express';
import { UrlService } from '../services/urlService.js';

export class UrlController {
  static async shorten(req: Request, res: Response) {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    try {
      // Basic validation using URL constructor
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
      const result = await UrlService.shorten(url);
      return res.status(201).json(result);
    } catch (error: any) {
      console.error('Error shortening URL:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async redirect(req: Request, res: Response) {
    const { shortCode } = req.params;

    try {
      const urlRecord = await UrlService.findByCode(shortCode);

      if (!urlRecord) {
        return res.status(404).send('URL not found');
      }

      await UrlService.incrementClicks(urlRecord.id);
      return res.redirect(urlRecord.originalUrl);
    } catch (error: any) {
      console.error('Error in redirect:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
