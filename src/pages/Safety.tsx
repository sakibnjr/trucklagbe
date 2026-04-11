import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Safety = () => {
  const { language } = useLanguage();

  const points =
    language === "bn"
      ? [
          "ড্রাইভার পরিচয় যাচাই ও লাইসেন্স নিয়মিত পর্যালোচনা।",
          "যানবাহন ফিটনেস ও ব্রেক সিস্টেম চেকলিস্ট।",
          "ভারী মাল লashing ও কভার দিয়ে সুরক্ষা।",
          "রাতের ডেলিভারিতে রিফ্লেক্টর ও সতর্কতা জোরদার।",
          "গ্রাহক অভিযোগ ও দুর্ঘটনা রিপোর্ট ট্র্যাকিং।",
        ]
      : [
          "Driver ID verification and license checks.",
          "Vehicle fitness and brake system checklists.",
          "Securing heavy loads with lashing and covers.",
          "Extra caution and reflectors for night deliveries.",
          "Tracking incidents and customer safety reports.",
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "গ্রাহক নিরাপত্তা" : "Customer safety"}
        subtitle={
          language === "bn"
            ? "আমারট্রাকে মাল ও মানুষের নিরাপত্তা অগ্রাধিকার—আমাদের মৌলিক নীতি।"
            : "Cargo and people come first—core safety principles at AmarTruck."
        }
      />

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container max-w-2xl">
          <ul className="space-y-4">
            {points.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 items-start"
              >
                <Shield className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-foreground leading-relaxed">{text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Safety;
