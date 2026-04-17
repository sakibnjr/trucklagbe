CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blogs"
ON public.blogs FOR SELECT
USING (published = true OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admins can insert blogs"
ON public.blogs FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admins can update blogs"
ON public.blogs FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

CREATE POLICY "Admins can delete blogs"
ON public.blogs FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON public.blogs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_blogs_created_at ON public.blogs(created_at DESC);
CREATE INDEX idx_blogs_published ON public.blogs(published);