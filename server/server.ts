import { createApp } from './src/app.js';
import { connectRedis } from './src/config/redis.js';

const PORT = 3000;

async function startServer() {
  await connectRedis();
  const app = await createApp();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
