import { motion } from "framer-motion";
import { Home, Building2, Package, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const sections = [
  { id: "house", icon: Home },
  { id: "office", icon: Building2 },
  { id: "commercial", icon: Package },
  { id: "express", icon: Zap },
] as const;

const Services = () => {
  const { language } = useLanguage();

  const copy: Record<
    (typeof sections)[number]["id"],
    { title: string; body: string }
  > =
    language === "bn"
      ? {
          house: {
            title: "বাসা বদল ও স্থানান্তর",
            body:
              "ঢাকা ও আশেপাশের এলাকায় প্যাকিং সহ বাসা বদল। আমাদের ট্রাক ও হায়েস দিয়ে ফার্নিচার, ইলেকট্রনিক্স ও ব্যক্তিগত মালামাল নিরাপদে নিয়ে যাই। ড্রাইভার ও হেল্পার সংযোজনের অপশন আলোচনা সাপেক্ষে।",
          },
          office: {
            title: "অফিস সরানো",
            body:
              "কর্পোরেট অফিস, দোকান ও ছোট শিল্প প্রতিষ্ঠানের সরঞ্জাম পরিবহন। সময়সূচি মেনে রাত বা ছুটির দিনে ডেলিভারি, যাতে আপনার ব্যবসা কম বাধাগ্রস্ত হয়।",
          },
          commercial: {
            title: "বাণিজ্যিক মালামাল",
            body:
              "পাইকারি মাল, কাঁচামাল ও পণ্য ডেলিভারি—ট্রাক ও পিকআপ ফ্লিট দিয়ে জেলার মধ্যে ও আন্তঃজেলা রুটে নিয়মিত ট্রিপ। ওজন ও ধরন অনুযায়ী গাড়ি বাছাইয়ে সহায়তা।",
          },
          express: {
            title: "এক্সপ্রেস ডেলিভারি",
            body:
              "জরুরি ডকুমেন্ট, ছোট পার্সেল ও সময়সংবেদনশীল মালের জন্য দ্রুত গাড়ি বরাদ্দ। ঢাকা মহানগরে একই দিনে ডেলিভারির লক্ষ্যে আমরা রুট অপটিমাইজ করি।",
          },
        }
      : {
          house: {
            title: "House shifting",
            body:
              "Home moves in Dhaka and surrounding areas with careful loading. Trucks and Hiace for furniture, appliances, and personal goods. Optional helpers—ask when you book.",
          },
          office: {
            title: "Office relocation",
            body:
              "Moving corporate offices, retail, and light industrial equipment. Scheduled after hours or on weekends to keep your business running smoothly.",
          },
          commercial: {
            title: "Commercial cargo",
            body:
              "Wholesale goods, raw materials, and stock deliveries using our truck and pickup fleet—intra-district and inter-district runs with the right vehicle for weight and type.",
          },
          express: {
            title: "Express delivery",
            body:
              "Urgent documents, small parcels, and time-sensitive loads with fast vehicle assignment. Same-day delivery within Dhaka metro when routing allows.",
          },
        };

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "আমাদের সেবাসমূহ" : "Our services"}
        subtitle={
          language === "bn"
            ? "আমারট্রাক—ট্রাক, পিকআপ ও হায়েস দিয়ে বাংলাদেশজুড়ে নিরাপদ পরিবহন। নিচে আমাদের মূল সেবা সমূহের বিবরণ।"
            : "AmarTruck—trucks, pickups, and Hiace for safe transport across Bangladesh. Details of our main offerings below."
        }
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-3xl space-y-16">
          {sections.map(({ id, icon: Icon }, index) => (
            <motion.article
              key={id}
              id={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="scroll-mt-28"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">{copy[id].title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{copy[id].body}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Services;
