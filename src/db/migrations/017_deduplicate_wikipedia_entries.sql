-- Deduplicate three pairs of wikipedia_articles that were ingested twice
-- with slightly different slugs. For each pair, keep the canonical entry
-- (shorter/cleaner slug) and merge all article_wikipedia_links references.
--
-- Fixes: #332 (Baumol effect), #369 (Glasgow School), #381 (Goodhart's law)

BEGIN;

-- ============================================================
-- 1. Baumol effect
--    Canonical: slug = 'baumol-effect'
--    Duplicate: slug = 'baumol-effect-Baumol_effect'
-- ============================================================

-- Delete links to duplicate where article already links to canonical
DELETE FROM app.article_wikipedia_links
WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'baumol-effect-Baumol_effect')
  AND article_id IN (
    SELECT article_id FROM app.article_wikipedia_links
    WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'baumol-effect')
  );

-- Update remaining links to point to canonical
UPDATE app.article_wikipedia_links
SET wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'baumol-effect')
WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'baumol-effect-Baumol_effect');

-- Delete the duplicate
DELETE FROM app.wikipedia_articles WHERE slug = 'baumol-effect-Baumol_effect';

-- ============================================================
-- 2. Glasgow School
--    Canonical: slug = 'glasgow-school'
--    Duplicate: slug = 'glasgow-school-of-art'
-- ============================================================

DELETE FROM app.article_wikipedia_links
WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'glasgow-school-of-art')
  AND article_id IN (
    SELECT article_id FROM app.article_wikipedia_links
    WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'glasgow-school')
  );

UPDATE app.article_wikipedia_links
SET wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'glasgow-school')
WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'glasgow-school-of-art');

DELETE FROM app.wikipedia_articles WHERE slug = 'glasgow-school-of-art';

-- ============================================================
-- 3. Goodhart's law
--    Canonical: slug = 'goodharts-law'
--    Duplicate: slug = 'goodharts-law-Goodhart''s_law'
-- ============================================================

DELETE FROM app.article_wikipedia_links
WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'goodharts-law-Goodhart''s_law')
  AND article_id IN (
    SELECT article_id FROM app.article_wikipedia_links
    WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'goodharts-law')
  );

UPDATE app.article_wikipedia_links
SET wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'goodharts-law')
WHERE wikipedia_id = (SELECT id FROM app.wikipedia_articles WHERE slug = 'goodharts-law-Goodhart''s_law');

DELETE FROM app.wikipedia_articles WHERE slug = 'goodharts-law-Goodhart''s_law';

COMMIT;
