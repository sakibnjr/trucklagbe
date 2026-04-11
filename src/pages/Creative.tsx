import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Creative = () => {
  const { language } = useLanguage();

  const tips =
    language === "bn"
      ? [
          "কarton বাক্স লেবেল দিন—অগ্রাধিকার ও ঘর অনুযায়ী আনলোড সহজ হয়।",
          "ভারী জিনিস নিচে, হালকা উপরে—ট্রাক লোডিংয়ের মৌলিক নিয়ম।",
          "রাস্তার ধুলো এড়াতে ফার্নিচারে কভার ব্যবহার করুন।",
          "ডেলিভারির আগে রিসিভারের ফোন নিশ্চিত করুন—ঠিকানায় কেউ থাকবে।",
        ]
      : [
          "Label every box by room—unloading stays organized.",
          "Heavy items low, light on top—basic truck loading balance.",
          "Cover furniture to protect from dust on open routes.",
          "Confirm the receiver’s phone before departure—someone should be there.",
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "ক্রিয়েটিভ ও টিপস" : "Creative & tips"}
        subtitle={
          language === "bn"
            ? "পরিবহন ও বাসা বদলে ছোট ছোট ধারণা—আমারট্রাকের গ্রাহকদের জন্য।"
            : "Practical ideas for smarter moves and deliveries—made for AmarTruck customers."
        }
      />

      <section className="py-16 md:py-20 bg-muted/40">
        <div className="container max-w-2xl space-y-5">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start bg-card border border-border rounded-lg p-4"
            >
              <Lightbulb className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <p className="text-foreground text-sm leading-relaxed">{tip}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Creative;
