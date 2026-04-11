import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Projects = () => {
  const { language } = useLanguage();

  const items =
    language === "bn"
      ? [
          "নতুন জেলায় পার্টনার হাব খোলা—রংপুর ও রাজশাহীতে রুট সম্প্রসারণ।",
          "ইন্টারসিটি ফ্লিটে ইউরো-৪ ট্রাক যুক্ত করা—পরিবেশ ও দক্ষতা উন্নয়ন।",
          "ড্রাইভার ট্রেনিং সেন্টার—মাসে ২০০+ ড্রাইভার নিরাপদ ড্রাইভিং সার্টিফিকেশন।",
          "গ্রাহক অ্যাপ ও ট্র্যাকিং বেটা—বুকিং স্ট্যাটাস রিয়েলটাইম।",
        ]
      : [
          "Partner hubs in new districts—expanding routes in Rangpur and Rajshahi.",
          "Adding Euro-4 trucks to intercity fleet for efficiency and emissions.",
          "Driver training center—200+ drivers/month in safe-driving certification.",
          "Customer app & tracking beta—real-time booking status.",
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "প্রকল্প ও উন্নয়ন" : "Projects & initiatives"}
        subtitle={
          language === "bn"
            ? "আমারট্রাকের ভবিষ্যৎ পরিকল্পনার কিছু অংশ—ডেমো তথ্য।"
            : "A glimpse of where we’re investing—sample roadmap items."
        }
      />

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container max-w-3xl">
          <ul className="space-y-4">
            {items.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="pl-6 border-l-4 border-secondary/60 text-foreground leading-relaxed"
              >
                {text}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Projects;
