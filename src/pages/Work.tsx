import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Work = () => {
  const { language } = useLanguage();

  const cases =
    language === "bn"
      ? [
          {
            title: "মিরপুর → উত্তরা অফিস সরানো",
            detail: "১০ টন ট্রাক, এক রাতে লোডিং—পরের দিন সকালে ডেলিভারি সম্পন্ন।",
          },
          {
            title: "চট্টগ্রাম বন্দর থেকে ঢাকা—কাঁচামাল",
            detail: "পিকআপ ফ্লিট দিয়ে ৩ দিনে ১২ টি ট্রিপ, সময়সূচি মেনে।",
          },
          {
            title: "সিলেট ফার্নিচার শোরুম ডেলিভারি",
            detail: "হায়েস ও হেল্পার—গ্রাহকের নির্দিষ্ট সময়ে হ্যান্ডওভার।",
          },
        ]
      : [
          {
            title: "Mirpur → Uttara office move",
            detail: "10-ton truck, overnight loading—delivery completed next morning.",
          },
          {
            title: "Chittagong port → Dhaka raw materials",
            detail: "12 pickup trips in 3 days, on schedule.",
          },
          {
            title: "Sylhet furniture showroom deliveries",
            detail: "Hiace plus helpers—handover at the customer’s window.",
          },
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "আমাদের কাজ" : "Our work"}
        subtitle={
          language === "bn"
            ? "সাম্প্রতিক ধরনের ডেলিভারি ও স্থানান্তর—নাম পরিবর্তিত, বাস্তব উদাহরণের মতো।"
            : "Sample delivery and relocation stories—illustrative cases similar to what we handle daily."
        }
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-3xl space-y-8">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 border border-border rounded-xl p-6 bg-card"
            >
              <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{c.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Work;
