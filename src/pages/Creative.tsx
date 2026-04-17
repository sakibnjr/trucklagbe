import { motion } from "framer-motion";
import { Lightbulb, Package, Route, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

type Block = { title: string; icon: typeof Package; tips: { t: string; d: string }[] };

const Creative = () => {
  const { language } = useLanguage();

  const blocks: Block[] =
    language === "bn"
      ? [
          {
            title: "প্যাকিং ও লেবেলিং",
            icon: Package,
            tips: [
              {
                t: "ঘর অনুযায়ী রং বা নম্বর",
                d: "বাক্সে বড় করে লিখুন—আনলোডের সময় ঘর পাল্টে বসতে হয় না।",
              },
              {
                t: "ভঙ্গুর জিনিস আলাদা",
                d: "কাঁচ, মিরর ও ইলেকট্রনিক্সে ‘ফ্র্যাজাইল’ ও তীর চিহ্ন।",
              },
              {
                t: "একটি ‘প্রথমে খুলব’ বাক্স",
                d: "চা, চার্জার, ওষুধ—পৌঁছেই দরকার জিনিস এক জায়গায়।",
              },
            ],
          },
          {
            title: "রাস্তায় ও লোডিংয়ে",
            icon: Route,
            tips: [
              {
                t: "ভারী নিচে, হালকা উপরে",
                d: "ট্রাকের ভারসাম্য ও ব্রেকিং—নিরাপত্তার মৌলিক নিয়ম।",
              },
              {
                t: "ফার্নিচার কভার",
                d: "খোলা ট্রাকে ধুলো ও বৃষ্টি থেকে রক্ষা—কমপক্ষে মোটা প্লাস্টিক বা কভার।",
              },
              {
                t: "লিফট ও সিঁড়ি আগে মাপুন",
                d: "বড় আলমারি উঠানোর আগে গেট ও লিফটের প্রস্থ জানান।",
              },
            ],
          },
          {
            title: "ব্যবসায়িক শিপমেন্ট",
            icon: Briefcase,
            tips: [
              {
                t: "ইনভয়েস ও প্যাকিং লিস্ট মিল",
                d: "ড্রাইভার হ্যান্ডওভারে একই কপি—পরে বিবাদ কমে।",
              },
              {
                t: "বীমা ও ঘোষিত মূল্য",
                d: "মূল্যবান মালের জন্য আলাদা নথি—আমাদের টিম জানালে গাইড করি।",
              },
              {
                t: "রিটার্ন ও খালি ট্রিপ",
                d: "ফেরত মাল বা খালি ট্রিপ—বুকিংয়ে আগে বললে রুট মিলিয়ে নেওয়া সহজ।",
              },
            ],
          },
        ]
      : [
          {
            title: "Packing & labelling",
            icon: Package,
            tips: [
              {
                t: "Colour or number by room",
                d: "Mark boxes clearly—unloading stays in the right rooms.",
              },
              {
                t: "Fragile items separate",
                d: "Glass, mirrors, electronics—label FRAGILE and add arrows.",
              },
              {
                t: "One ‘open first’ box",
                d: "Tea, chargers, meds—things you need right after arrival.",
              },
            ],
          },
          {
            title: "On the road & loading",
            icon: Route,
            tips: [
              {
                t: "Heavy low, light high",
                d: "Basic balance for truck stability and braking.",
              },
              {
                t: "Cover furniture",
                d: "On open routes, protect from dust and rain—thick plastic helps.",
              },
              {
                t: "Measure lifts and stairs first",
                d: "Share gate and lift width before moving large wardrobes.",
              },
            ],
          },
          {
            title: "Business shipments",
            icon: Briefcase,
            tips: [
              {
                t: "Invoice matches packing list",
                d: "Same copy at driver handover—fewer disputes later.",
              },
              {
                t: "Insurance and declared value",
                d: "For high-value cargo, extra paperwork—we’ll guide you.",
              },
              {
                t: "Returns and empty legs",
                d: "Mention early if you need return cargo or backhaul—routing is easier.",
              },
            ],
          },
        ];

  const extra =
    language === "bn"
      ? [
          "ডেলিভারির আগে রিসিভারের ফোন নিশ্চিত করুন—ঠিকানায় কেউ থাকবে।",
          "জরুরি নম্বর বুকিং কনফার্মেশনে সেভ রাখুন।",
          "বৃষ্টি বা ধর্মঘটের দিন বাফার সময় যোগ করুন।",
        ]
      : [
          "Confirm the receiver’s phone before departure—someone should be there.",
          "Save the dispatch number from your booking confirmation.",
          "Add buffer time during rain or local strikes.",
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "ক্রিয়েটিভ ও টিপস" : "Creative & tips"}
        subtitle={
          language === "bn"
            ? "পরিবহন ও বাসা বদলে ব্যবহারিক ধারণা—আমারট্রাক গ্রাহক ও ড্রাইভারদের অভিজ্ঞতা থেকে সংগৃহীত।"
            : "Practical ideas for transport and moves—drawn from AmarTruck customers and drivers."
        }
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="w-full space-y-16">
          {blocks.map((block, bi) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: bi * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center">
                  <block.icon className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{block.title}</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {block.tips.map((tip) => (
                  <div
                    key={tip.t}
                    className="rounded-xl border border-border bg-card p-5 shadow-soft"
                  >
                    <div className="flex gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <h3 className="text-sm font-semibold text-foreground leading-snug">{tip.t}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-6">{tip.d}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-muted/40 border-t border-border">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
            {language === "bn" ? "আরও দ্রুত টিপস" : "Quick reminders"}
          </h3>
          <ul className="space-y-3">
            {extra.map((line) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 text-sm text-foreground bg-card border border-border rounded-lg px-4 py-3"
              >
                <span className="text-secondary font-bold">•</span>
                {line}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 text-center">
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
          {language === "bn"
            ? "আরও গভীর গাইড ব্লগে—নিয়মিত চেক করুন।"
            : "Deeper guides live on the blog—check back often."}
        </p>
        <Button variant="secondary" asChild>
          <Link to="/blog">{language === "bn" ? "ব্লগ দেখুন" : "Visit the blog"}</Link>
        </Button>
      </section>
    </MarketingPageLayout>
  );
};

export default Creative;
