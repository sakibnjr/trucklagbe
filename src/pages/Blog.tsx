import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  created_at: string;
}

const Blog = () => {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("id,slug,title,excerpt,content,cover_image_url,created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts((data as BlogPost[]) || []);
      setIsLoading(false);
    };
    load();
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const pageTitle =
    language === "bn" ? "ব্লগ — AmarTruck" : "Blog — AmarTruck";
  const pageDesc =
    language === "bn"
      ? "পরিবহন, বাসা বদল ও লজিস্টিকস নিয়ে সংক্ষিপ্ত আপডেট ও টিপস।"
      : "Short updates and tips on transport, moving, and logistics.";

  return (
    <MarketingPageLayout>
      <Helmet>
        <title>{pageTitle.slice(0, 60)}</title>
        <meta name="description" content={pageDesc.slice(0, 160)} />
      </Helmet>

      <MarketingPageHero
        title={language === "bn" ? "ব্লগ ও সাম্প্রতিক পোস্ট" : "Blog & recent posts"}
        subtitle={pageDesc}
      />

      <section id="recent" className="py-16 md:py-20 bg-muted/40 scroll-mt-28">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-semibold text-foreground mb-8">
            {language === "bn" ? "সাম্প্রতিক পোস্ট" : "Recent posts"}
          </h2>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {language === "bn" ? "এখনো কোনো পোস্ট নেই।" : "No posts yet."}
            </div>
          ) : (
            <ul className="space-y-6">
              {posts.map((post, i) => (
                <motion.li
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                  >
                    {post.cover_image_url && (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.created_at)}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        {language === "bn" ? "পড়ুন" : "Read more"}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Blog;
