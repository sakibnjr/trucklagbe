import { motion } from "framer-motion";
import { Shield, AlertTriangle, Phone, ClipboardCheck, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Safety = () => {
  const { language } = useLanguage();

  const sections: {
    title: string;
    icon: typeof Shield;
    items: string[];
  }[] =
    language === "bn"
      ? [
          {
            title: "ড্রাইভার ও পরিচয়",
            icon: Shield,
            items: [
              "জাতীয় পরিচয়পত্র ও ড্রাইভিং লাইসেন্স যাচাই—মেয়াদোত্তীর্ণ লাইসেন্সে দীর্ঘ রুট অ্যাসাইন সীমিত।",
              "নতুন ড্রাইভারকে অভিজ্ঞ ড্রাইভারের সাথে সংযুক্ত করে শর্ট রুট দিয়ে শুরু।",
              "গ্রাহক অভিযোগ বা সীমান্ত লঙ্ঘন—তদন্ত ও পুনরায় প্রশিক্ষণ।",
            ],
          },
          {
            title: "যানবাহন ও রক্ষণাবেক্ষণ",
            icon: Car,
            items: [
              "নিয়মিত ফিটনেস, ব্রেক, টায়ার ও লাইট চেকলিস্ট।",
              "লোড ওজন গাড়ির অনুমোদিত সীমার মধ্যে রাখার নির্দেশনা।",
              "ভাড়া বা তৃতীয় পক্ষের গাড়ি হলে অতিরিক্ত নথি যাচাই।",
            ],
          },
          {
            title: "লোড সিকিউরিটি",
            icon: ClipboardCheck,
            items: [
              "ভারী মাল স্ট্র্যাপ ও কভার দিয়ে সুরক্ষা—খোলা ট্রাকে অতিরিক্ত সতর্কতা।",
              "বিপজ্জনক মালের জন্য আলাদা ঘোষণা ও অনুমোদন প্রয়োজন—বুকিংয়ে জানান।",
              "রাতের ডেলিভারিতে রিফ্লেক্টর ও স্পিড লিমিট মেনে চলা।",
            ],
          },
          {
            title: "জরুরি ও রিপোর্টিং",
            icon: AlertTriangle,
            items: [
              "দুর্ঘটনা বা মাল ক্ষতি—তাৎক্ষণিক হটলাইন ও ঘটনা রিপোর্ট।",
              "গ্রাহক নিরাপত্তা সংক্রান্ত অভিযোগ ট্র্যাক করা ও ফলো-আপ।",
              "পুনরাবৃত্তিমূলক ঝুঁকি কমাতে ডেটা দিয়ে রুট ও প্রশিক্ষণ আপডেট।",
            ],
          },
        ]
      : [
          {
            title: "Drivers & identity",
            icon: Shield,
            items: [
              "National ID and licence checks—expired licences limit long-route assignments.",
              "New drivers start with short routes alongside experienced mentors.",
              "Complaints or boundary issues trigger review and retraining.",
            ],
          },
          {
            title: "Vehicles & maintenance",
            icon: Car,
            items: [
              "Regular fitness, brake, tyre, and light checklists.",
              "Guidance to keep load within approved vehicle limits.",
              "Extra verification for rented or third-party vehicles.",
            ],
          },
          {
            title: "Load security",
            icon: ClipboardCheck,
            items: [
              "Straps and covers for heavy loads—extra care on open trucks.",
              "Hazardous goods need declaration and approval—tell us at booking.",
              "Night runs: reflectors and speed discipline.",
            ],
          },
          {
            title: "Emergencies & reporting",
            icon: AlertTriangle,
            items: [
              "Accidents or cargo damage—hotline and incident reporting.",
              "Customer safety concerns are tracked and followed up.",
              "We use data to adjust routes and training when risks repeat.",
            ],
          },
        ];

  const commitment =
    language === "bn"
      ? "আমারট্রাকে নিরাপত্তা শুধু নীতি নয়—দৈনন্দিন অপারেশনের অংশ। গ্রাহক, ড্রাইভার ও জনসাধারণ—সবার জন্য দায়বদ্ধতা আমাদের কাজের মানদণ্ড।"
      : "At AmarTruck, safety isn’t a poster—it’s part of daily operations. We’re accountable to customers, drivers, and the public.";

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "গ্রাহক নিরাপত্তা" : "Customer safety"}
        subtitle={
          language === "bn"
            ? "মাল, যানবাহন ও মানুষ—প্রতিটি স্তরে আমাদের নিয়ম ও পর্যবেক্ষণ।"
            : "Cargo, vehicles, and people—rules and oversight at every layer."
        }
      />

      <section className="py-10 bg-muted/30 border-b border-border">
        <div className="w-full">
          <p className="text-center text-sm text-muted-foreground leading-relaxed">{commitment}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="w-full space-y-14">
          {sections.map((sec, si) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center">
                  <sec.icon className="w-5 h-5 text-secondary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{sec.title}</h2>
              </div>
              <ul className="space-y-3">
                {sec.items.map((text) => (
                  <li key={text} className="flex gap-3 text-sm text-foreground leading-relaxed">
                    <Shield className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-card border-y border-border">
        <div className="w-full rounded-2xl border border-border bg-muted/30 p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-secondary" />
                {language === "bn" ? "জরুরি যোগাযোগ" : "Emergency contact"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "bn"
                  ? "রাস্তায় দুর্ঘটনা বা মাল নিয়ে তাৎক্ষণিক সমস্যা—কল করুন। সাধারণ বুকিং পরিবর্তনের জন্য সাপোর্ট লাইন ব্যবহার করুন।"
                  : "Accidents on the road or urgent cargo issues—call us. For booking changes, use the main support line."}
              </p>
              <a
                href="tel:+8801978832209"
                className="text-lg font-semibold text-secondary hover:underline"
              >
                ০১৯৭৮-৮৩২২০৯
              </a>
            </div>
            <Button variant="secondary" asChild className="shrink-0">
              <Link to="/contact">{language === "bn" ? "সম্পূর্ণ যোগাযোগ" : "Full contact details"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Safety;
