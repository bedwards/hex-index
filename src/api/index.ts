import express, { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { config } from 'dotenv';
import { createPool } from '../db/queries.js';
import { createSearchRouter } from './search.js';

config();

const app = express();
const port = process.env.PORT || 3000;

// Create database pool if DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl ? createPool(databaseUrl) : null;

app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: pool ? 'connected' : 'not configured',
  });
});

// Serve library content (HTML files for reading)
// Path is relative to project root
const libraryPath = join(process.cwd(), 'library');
app.use('/library', express.static(libraryPath, {
  setHeaders: (res, path) => {
    // Set correct content type for HTML files
    if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
  },
}));

// Mount search routes (only if database is configured)
if (pool) {
  app.use('/api', createSearchRouter(pool));
} else {
  // Return 503 for search endpoints when database is not configured
  app.use('/api/search', (_req, res) => {
    res.status(503).json({ error: 'Database not configured' });
  });
  app.use('/api/tags', (_req, res) => {
    res.status(503).json({ error: 'Database not configured' });
  });
  app.use('/api/publications', (_req, res) => {
    res.status(503).json({ error: 'Database not configured' });
  });
  app.use('/api/articles', (_req, res) => {
    res.status(503).json({ error: 'Database not configured' });
  });
}

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('API Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Only start server if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(port, () => {
    console.info(`API server running on port ${port}`);
    if (!pool) {
      console.info('Warning: DATABASE_URL not set, search endpoints unavailable');
    }
  });
}

export default app;
export { pool };
