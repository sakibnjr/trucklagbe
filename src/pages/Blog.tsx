import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Blog = () => {
  const { language } = useLanguage();

  const posts =
    language === "bn"
      ? [
          {
            title: "৭ ফুট থেকে ২৩ ফুট—কোন ট্রাক আপনার জন্য?",
            excerpt:
              "মালের ওজন ও আকার অনুযায়ী গাড়ি বাছাই করলে খরচ কমে ও সময় বাঁচে। আমাদের গাইডলাইন।",
            date: "২০২৬, ১৫ মার্চ",
          },
          {
            title: "ঢাকায় বাসা বদল: এক দিনে সেরা সময়",
            excerpt:
              "ট্রাফিক ও লোডিং এড়াতে কখন বের হবেন—অভিজ্ঞ ড্রাইভারদের পরামর্শ।",
            date: "২০২৬, ২ মার্চ",
          },
          {
            title: "মাল বীমা ও নিরাপত্তা: যা জানা দরকার",
            excerpt:
              "বাণিজ্যিক শিপমেন্টে কীভাবে ঝুঁকি কমানো যায়—মৌলিক চেকলিস্ট।",
            date: "২০২৬, ১৮ ফেব্রুয়ারি",
          },
        ]
      : [
          {
            title: "7 ft to 23 ft—which truck fits your load?",
            excerpt:
              "Choosing by weight and size saves money and time. A quick guide from our team.",
            date: "Mar 15, 2026",
          },
          {
            title: "House shifting in Dhaka: best time of day",
            excerpt:
              "When to start to avoid peak traffic and loading delays—tips from our drivers.",
            date: "Mar 2, 2026",
          },
          {
            title: "Cargo safety basics for businesses",
            excerpt:
              "Simple checks that reduce risk on commercial shipments.",
            date: "Feb 18, 2026",
          },
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "ব্লগ ও সাম্প্রতিক পোস্ট" : "Blog & recent posts"}
        subtitle={
          language === "bn"
            ? "পরিবহন, বাসা বদল ও লজিস্টিকস নিয়ে সংক্ষিপ্ত আপডেট ও টিপস।"
            : "Short updates and tips on transport, moving, and logistics."
        }
      />

      <section id="recent" className="py-16 md:py-20 bg-muted/40 scroll-mt-28">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-semibold text-foreground mb-8">
            {language === "bn" ? "সাম্প্রতিক পোস্ট" : "Recent posts"}
          </h2>
          <ul className="space-y-6">
            {posts.map((post, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-xl p-6 shadow-soft"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Blog;
