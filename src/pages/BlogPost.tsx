import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("id,slug,title,excerpt,content,cover_image_url,created_at,updated_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPost(data as BlogPost);
      }
      setIsLoading(false);
    };
    load();
  }, [slug]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const canonical = typeof window !== "undefined" ? window.location.href : "";
  const description = post?.excerpt || post?.content.slice(0, 155) || "";
  const metaTitle = post ? `${post.title} | AmarTruck` : "Blog | AmarTruck";

  return (
    <MarketingPageLayout>
      <Helmet>
        <title>{metaTitle.slice(0, 60)}</title>
        <meta name="description" content={description.slice(0, 160)} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description.slice(0, 160)} />
        {post?.cover_image_url && <meta property="og:image" content={post.cover_image_url} />}
        <meta name="twitter:card" content={post?.cover_image_url ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description.slice(0, 160)} />
        {post && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description,
              image: post.cover_image_url || undefined,
              datePublished: post.created_at,
              dateModified: post.updated_at,
              mainEntityOfPage: canonical,
              author: { "@type": "Organization", name: "AmarTruck" },
              publisher: { "@type": "Organization", name: "AmarTruck" },
            })}
          </script>
        )}
      </Helmet>

      <article className="py-12 md:py-16">
        <div className="w-full">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "bn" ? "সব পোস্ট" : "All posts"}
          </Link>

          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">
              {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
            </div>
          ) : notFound || !post ? (
            <div className="text-center py-16">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                {language === "bn" ? "পোস্ট পাওয়া যায়নি" : "Post not found"}
              </h1>
              <p className="text-muted-foreground">
                {language === "bn"
                  ? "এই ব্লগ পোস্টটি আর উপলব্ধ নেই।"
                  : "This blog post is no longer available."}
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <header className="mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.created_at)}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </header>

              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full rounded-xl mb-8 object-cover max-h-[480px]"
                  loading="lazy"
                />
              )}

              <div className="prose prose-neutral max-w-none text-foreground whitespace-pre-line leading-relaxed">
                {post.content}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </MarketingPageLayout>
  );
};

export default BlogPostPage;
