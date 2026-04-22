import express from 'express';
import urlRoutes from './routes/urlRoutes.js';
import { UrlController } from './controllers/urlController.js';
import cors from 'cors';

async function createApp() {
  const app = express();
  app.use(express.json());

  // Cors
  app.use(cors({
    origin: 'http://localhost:4000', // Adjust if frontend is served from a different origin
    methods: ['GET', 'POST'],
  }));

  // 1. API routes
  app.use('/api', urlRoutes);

  app.get('/:shortCode', (req, res, next) => {
    // If it looks like a file (has a dot) or is "api", skip to next middleware
    if (req.params.shortCode.includes('.') || req.params.shortCode === 'api') {
      return next();
    }
    UrlController.redirect(req, res);
  });

  return app;
}

export { createApp };
