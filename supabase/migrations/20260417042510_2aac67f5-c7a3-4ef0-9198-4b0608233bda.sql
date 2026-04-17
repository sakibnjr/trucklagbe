-- Slug generator: lowercase, replace non-alphanumeric with dashes, trim dashes
CREATE OR REPLACE FUNCTION public.slugify(_input text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT trim(both '-' from regexp_replace(lower(coalesce(_input, '')), '[^a-z0-9]+', '-', 'g'));
$$;

ALTER TABLE public.blogs ADD COLUMN slug text;

-- Backfill existing rows with unique slugs
UPDATE public.blogs b
SET slug = CASE
  WHEN public.slugify(b.title) = '' THEN substr(b.id::text, 1, 8)
  ELSE public.slugify(b.title) || '-' || substr(b.id::text, 1, 6)
END;

ALTER TABLE public.blogs ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX blogs_slug_key ON public.blogs(slug);

-- Trigger: auto-fill slug on insert/update if blank, ensure uniqueness
CREATE OR REPLACE FUNCTION public.blogs_set_slug()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  base text;
  candidate text;
  n int := 0;
BEGIN
  IF NEW.slug IS NULL OR length(trim(NEW.slug)) = 0 THEN
    base := public.slugify(NEW.title);
    IF base = '' THEN
      base := substr(coalesce(NEW.id::text, gen_random_uuid()::text), 1, 8);
    END IF;
  ELSE
    base := public.slugify(NEW.slug);
    IF base = '' THEN
      base := substr(coalesce(NEW.id::text, gen_random_uuid()::text), 1, 8);
    END IF;
  END IF;

  candidate := base;
  WHILE EXISTS (SELECT 1 FROM public.blogs WHERE slug = candidate AND id <> NEW.id) LOOP
    n := n + 1;
    candidate := base || '-' || n::text;
  END LOOP;

  NEW.slug := candidate;
  RETURN NEW;
END;
$$;

CREATE TRIGGER blogs_set_slug_trg
BEFORE INSERT OR UPDATE OF title, slug ON public.blogs
FOR EACH ROW EXECUTE FUNCTION public.blogs_set_slug();