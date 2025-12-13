-- Database initialization script
-- This runs when the postgres container is first created

-- Enable useful extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create a schema for the application
CREATE SCHEMA IF NOT EXISTS app;

-- Migrations tracking table
CREATE TABLE IF NOT EXISTS app.migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: Main schema is in src/db/migrations/001_initial_schema.sql
-- Run `npm run db:migrate` after `npm run db:up` to apply migrations
