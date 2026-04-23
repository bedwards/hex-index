import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'tools/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.config.*',
        '**/*.test.ts',
        'tools/screenshots/**',
        'src/db/**', // Database queries require integration testing with real PostgreSQL
        'src/wikipedia/**', // Calls Ollama + Wikipedia + PostgreSQL — integration code
      ],
      thresholds: {
        statements: 69,
        branches: 55, // Lower for DOM-dependent code paths and integration modules
        functions: 70,
        lines: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@tools': resolve(__dirname, 'tools'),
    },
  },
});
