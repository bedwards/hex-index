/**
 * Global configuration for hex-index
 * Centralized settings for ingestion, filtering, and library management
 */

export const config = {
  /**
   * Minimum read time in minutes for articles to be included in the library
   * Articles shorter than this will be filtered out during ingestion
   * @default 10
   */
  minReadTimeMinutes: 10,

  /**
   * Filter to only include text posts (no audio/video)
   * Even if audio/video posts have transcripts, they will be excluded
   * @default true
   */
  textOnly: true,

  /**
   * Filter to only include English language posts
   * @default true
   */
  englishOnly: true,
} as const;

/**
 * Type for configuration keys
 */
export type ConfigKey = keyof typeof config;

/**
 * Get a configuration value
 */
export function getConfig<K extends ConfigKey>(key: K): typeof config[K] {
  return config[key];
}
