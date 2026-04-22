import { Router } from 'express';
import { UrlController } from '../controllers/urlController.js';

const router = Router();

router.post('/shorten', UrlController.shorten);

export default router;
