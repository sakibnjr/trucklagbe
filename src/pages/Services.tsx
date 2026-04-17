import { motion } from "framer-motion";
import { Home, Building2, Package, Zap, Check, ArrowRight, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

  type SectionCopy = {
    title: string;
    lead: string;
    body: string;
    bullets: string[];
    note?: string;
  };

  const copy: Record<(typeof sections)[number]["id"], SectionCopy> =
    language === "bn"
      ? {
          house: {
            title: "বাসা বদল ও স্থানান্তর",
            lead: "ফার্নিচার, ইলেকট্রনিক্স ও ব্যক্তিগত মালামাল—সাবধানে লোড ও আনলোড।",
            body:
              "ঢাকা ও আশেপাশের এলাকায় আমরা বাসা বদলের সম্পূর্ণ সহায়তা দিই। টিম আগে থেকেই রুট ও গাড়ির সাইজ নিয়ে পরামর্শ দেয়, যাতে একবারে সঠিক যানবাহন আসে। ড্রাইভাররা অভিজ্ঞ; প্রয়োজনে হেল্পার সংযোজনের বিষয়টি বুকিংয়ের সময়ই নিশ্চিত করা যায়।",
            bullets: [
              "ট্রাক, পিকআপ, হায়েস—লোড অনুযায়ী বাছাই",
              "মালামাল কভার ও স্ট্র্যাপিংয়ে মৌলিক সুরক্ষা",
              "উত্তরা, গুলশান, মিরপুরসহ মহানগর ও সংযুক্ত রুট",
            ],
            note: "সাধারণত এক দিনের মধ্যে লোডিং ও ডেলিভারি সমন্বয়—আগে থেকে স্লট নিশ্চিত করলে সুবিধা বেশি।",
          },
          office: {
            title: "অফিস সরানো",
            lead: "কর্পোরেট ও খুচরা—সময় কম নষ্ট করে সরানোর পরিকল্পনা।",
            body:
              "চেয়ার, টেবিল, ফাইলিং ক্যাবিনেট ও ছোট যন্ত্রপাতি পরিবহনে আমরা সময়সূচি মেনে কাজ করি। ব্যবসার কাজে কম বিঘ্ন—for example রাতে বা সাপ্তাহিক ছুটিতে লোডিং—আলোচনা সাপেক্ষে।",
            bullets: [
              "অফিস আসবাব ও ইলেকট্রনিক্স সুরক্ষিত প্যাকিং",
              "মাল্টি-ট্রিপ সমন্বয় বড় স্থানান্তরে",
              "সাইট কোঅর্ডিনেটরের সাথে যোগাযোগ রেখে হ্যান্ডওভার",
            ],
            note: "প্রতিষ্ঠানের আকার ও তলার সংখ্যা জানালে আমরা গাড়ির সংখ্যা ও সময় নির্ধারণে সাহায্য করি।",
          },
          commercial: {
            title: "বাণিজ্যিক মালামাল",
            lead: "পাইকারি, কাঁচামাল ও স্টক—নিয়মিত ও একক ট্রিপ।",
            body:
              "ট্রাক ও পিকআপ ফ্লিট দিয়ে জেলার ভিতরে ও আন্তঃজেলা রুটে আমরা নিয়মিত ডেলিভারি সাপোর্ট দিই। ওজন ও ধরন অনুযায়ী গাড়ি বাছাই, যাতে খরচ ও সময় দুটোই যুক্তিযুক্ত থাকে।",
            bullets: [
              "৫–১০ টন ট্রাক থেকে পিকআপ পর্যন্ত বিকল্প",
              "বন্দর ও শিল্প এলা থেকে গন্তব্য পর্যন্ত রুট",
              "রিটার্ন ট্রিপ ও ফিক্সড রেট—আলোচনা সাপেক্ষে",
            ],
            note: "বারবার শিপমেন্ট থাকলে মাসিক বা সাপ্তাহিক চুক্তি সম্পর্কে জিজ্ঞাসা করুন।",
          },
          express: {
            title: "এক্সপ্রেস ডেলিভারি",
            lead: "জরুরি ডকুমেন্ট ও ছোট পার্সেল—দ্রুত গাড়ি বরাদ্দ।",
            body:
              "সময়সংবেদনশীল মালের জন্য আমরা দ্রুত যান বরাদ্দ ও রুট অপটিমাইজ করি। ঢাকা মহানগরে একই দিনে ডেলিভারির লক্ষ্যে টিম কাজ করে—ট্রাফিক ও আবহাওয়া সাপেক্ষে।",
            bullets: [
              "প্রাইভেট কার ও হায়েস—হালকা ও জরুরি পার্সেল",
              "পিকআপ পয়েন্ট থেকে ট্র্যাকিংয়ের জন্য কল সাপোর্ট",
              "কর্পোরেট অগ্রাধিকার—চুক্তি গ্রাহকদের জন্য",
            ],
            note: "এক্সপ্রেস সেবার জন্য বুকিংয়ে সময় ও ঠিকানা স্পষ্ট করলে দ্রুত মিলিয়ে নেওয়া সহজ হয়।",
          },
        }
      : {
          house: {
            title: "House shifting",
            lead: "Furniture, appliances, and personal goods—with careful loading and unloading.",
            body:
              "Across Dhaka and nearby areas we support full home moves. Our team advises on route and vehicle size in advance so the right truck arrives the first time. Drivers are experienced; helpers can be arranged at booking if you need extra hands.",
            bullets: [
              "Truck, pickup, or Hiace matched to load size",
              "Basic covers and strapping to protect goods",
              "Metro and connected routes—Uttara, Gulshan, Mirpur, and more",
            ],
            note: "Most moves are coordinated same-day when the slot is booked early—planning ahead helps a lot.",
          },
          office: {
            title: "Office relocation",
            lead: "Corporate and retail moves with minimal disruption to work hours.",
            body:
              "We transport chairs, desks, filing, and light equipment on a clear schedule. For less disruption we can load overnight or on weekends—discuss when you book.",
            bullets: [
              "Safer handling for office furniture and electronics",
              "Multi-trip coordination for larger offices",
              "Handover aligned with your site coordinator",
            ],
            note: "Share floor count and volume—we’ll help estimate vehicles and timing.",
          },
          commercial: {
            title: "Commercial cargo",
            lead: "Wholesale, raw materials, and stock—scheduled or one-off trips.",
            body:
              "Our truck and pickup fleet serves intra-district and inter-district routes across Bangladesh. We help pick the right vehicle for weight and cargo type so cost and time stay reasonable.",
            bullets: [
              "From 5–10 ton trucks down to pickups",
              "Routes from port and industrial zones to destination",
              "Return trips and fixed rates—available on request",
            ],
            note: "If you ship often, ask about weekly or monthly arrangements.",
          },
          express: {
            title: "Express delivery",
            lead: "Urgent documents and small parcels—fast vehicle assignment.",
            body:
              "For time-sensitive loads we assign vehicles quickly and optimize routing. Within Dhaka metro we aim for same-day delivery when conditions allow.",
            bullets: [
              "Private car and Hiace for light and urgent parcels",
              "Call support to coordinate pickup and status",
              "Priority handling for contracted corporate clients",
            ],
            note: "Clear pickup time and address in your booking speeds up matching.",
          },
        };

  const steps =
    language === "bn"
      ? [
          { t: "বুকিং ও নিশ্চিতকরণ", d: "ওয়েবসাইট বা ফোনে গাড়ি, রুট ও সময় নিশ্চিত করুন।" },
          { t: "যানবাহন ও ড্রাইভার", d: "নির্ধারিত সময়ে যান ও ড্রাইভার আপনার পিকআপ পয়েন্টে।" },
          { t: "লোড ও ডেলিভারি", d: "মাল লোড করে নিরাপদে গন্তব্যে—হ্যান্ডওভার নিশ্চিত।" },
          { t: "পরিশোধ ও সাপোর্ট", d: "স্বচ্ছ মূল্য; প্রয়োজনে বিলিং ও সাপোর্ট লাইন।" },
        ]
      : [
          { t: "Book & confirm", d: "Confirm vehicle, route, and time via web or phone." },
          { t: "Vehicle & driver", d: "Truck and driver reach your pickup on schedule." },
          { t: "Load & deliver", d: "Goods loaded and delivered safely with clear handover." },
          { t: "Pay & support", d: "Transparent pricing; billing and support when you need it." },
        ];

  const stats =
    language === "bn"
      ? [
          { v: "১০,০০০+", l: "সন্তুষ্ট গ্রাহক" },
          { v: "৫০০+", l: "যানবাহন" },
          { v: "৬৪", l: "জেলায় সেবা" },
        ]
      : [
          { v: "10,000+", l: "Happy customers" },
          { v: "500+", l: "Vehicles" },
          { v: "64", l: "Districts covered" },
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "আমাদের সেবাসমূহ" : "Our services"}
        subtitle={
          language === "bn"
            ? "আমারট্রাক—ট্রাক, পিকআপ ও হায়েস দিয়ে বাংলাদেশজুড়ে নিরাপদ, স্বচ্ছ মূল্যের পরিবহন। নিচে প্রতিটি সেবার বিস্তারিত ও আমাদের প্রতিশ্রুতি।"
            : "AmarTruck—trucks, pickups, and Hiace for safe, fairly priced transport nationwide. Below you’ll find detail on each service and how we work with you."
        }
      />

      <section className="py-8 sm:py-10 border-b border-border bg-muted/30">
        <div className="w-full">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            {stats.map((s) => (
              <div
                key={s.l}
                className="rounded-2xl bg-card border border-border/80 py-5 px-3 sm:px-4 md:py-6 shadow-sm ring-1 ring-border/40"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tabular-nums">
                  {s.v}
                </div>
                <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-2 leading-snug">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="w-full space-y-16">
          {sections.map(({ id, icon: Icon }, index) => {
            const c = copy[id];
            return (
              <motion.article
                key={id}
                id={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold text-foreground mb-2">{c.title}</h2>
                    <p className="text-secondary font-medium mb-3">{c.lead}</p>
                    <p className="text-muted-foreground leading-relaxed mb-5">{c.body}</p>
                    <ul className="space-y-2 mb-5">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-sm text-foreground">
                          <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {c.note && (
                      <p className="text-sm text-muted-foreground border-l-4 border-secondary/40 pl-4 py-1">{c.note}</p>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/40 border-t border-border">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">
            {language === "bn" ? "বুকিং থেকে ডেলিভারি—৪টি ধাপ" : "From booking to delivery—4 steps"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm ring-1 ring-border/40"
              >
                <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
                  {language === "bn" ? `ধাপ ${i + 1}` : `Step ${i + 1}`}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="w-full text-center rounded-2xl sm:rounded-3xl bg-primary text-primary-foreground px-6 sm:px-10 md:px-12 py-10 md:py-14 shadow-lg shadow-primary/25 ring-1 ring-primary-foreground/10 overflow-hidden">
          <Truck className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {language === "bn" ? "আজই গাড়ি নিশ্চিত করুন" : "Lock in a vehicle today"}
          </h2>
          <p className="text-primary-foreground/85 mb-8 max-w-none leading-relaxed mx-auto">
            {language === "bn"
              ? "হোমপেজে বুকিং ফর্ম পূরণ করুন অথবা কল করে সরাসরি টিমের সাথে কথা বলুন—রুট ও সময় একসাথে মিলিয়ে নেওয়া হয়।"
              : "Use the booking form on the home page or call us—we’ll align route, vehicle, and timing with you."}
          </p>
          <Button variant="secondary" size="lg" asChild className="gap-2">
            <Link to="/">
              {language === "bn" ? "বুকিং পেজে যান" : "Go to booking"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Services;
