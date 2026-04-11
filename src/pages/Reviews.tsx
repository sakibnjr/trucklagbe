import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Reviews = () => {
  const { language } = useLanguage();

  const reviews =
    language === "bn"
      ? [
          {
            name: "আশিক রহমান",
            text: "ঢাকা থেকে চট্টগ্রাম মাল পাঠিয়েছিলাম—সময়মতো পৌঁছেছে, ড্রাইভার অভিজ্ঞ।",
          },
          {
            name: "নাসরিন জাহান",
            text: "বাসা বদলে হায়েস ও হেল্পার—আসবাবপত্র একটাও খুঁতছাড়া হয়নি।",
          },
          {
            name: "তানভীর ইসলাম",
            text: "সাপোর্ট লাইন দ্রুত উত্তর দিয়েছে। দাম স্বচ্ছ, লুকোনো চার্জ নেই।",
          },
        ]
      : [
          {
            name: "Ashik Rahman",
            text: "Dhaka to Chittagong cargo—on time, professional driver.",
          },
          {
            name: "Nasrin Jahan",
            text: "House move with Hiace and helpers—no scratches on furniture.",
          },
          {
            name: "Tanvir Islam",
            text: "Support answered fast. Pricing was clear—no hidden fees.",
          },
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "গ্রাহক রিভিউ" : "Customer reviews"}
        subtitle={
          language === "bn"
            ? "আমাদের সেবা নিয়ে গ্রাহকদের মন্তব্য—ডেমো উদ্ধৃতি।"
            : "What customers say about AmarTruck—sample testimonials."
        }
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-3xl space-y-6">
          {reviews.map((r, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-border rounded-xl p-6 bg-card"
            >
              <div className="flex gap-1 mb-3 text-secondary">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
              <footer className="text-sm font-medium text-muted-foreground">— {r.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Reviews;
