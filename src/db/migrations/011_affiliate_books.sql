-- Migration: Create affiliate_books table
-- Moves affiliate book catalog from JSON file to database

CREATE TABLE IF NOT EXISTS app.affiliate_books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  asin TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'books',
  description TEXT,
  gutenberg_url TEXT,
  archive_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_affiliate_books_title_author ON app.affiliate_books (LOWER(title), LOWER(author));
