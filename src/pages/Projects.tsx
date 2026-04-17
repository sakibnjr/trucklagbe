import { motion } from "framer-motion";
import { Target, Users, Leaf, Smartphone, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Projects = () => {
  const { language } = useLanguage();

  type Card = {
    title: string;
    status: "active" | "planned";
    body: string;
    impact: string;
    icon: typeof Target;
  };

  const cards: Card[] =
    language === "bn"
      ? [
          {
            title: "আঞ্চলিক পার্টনার হাব",
            status: "active",
            body:
              "রংপুর ও রাজশাহীতে পার্টনার ডিপো ও ড্রাইভার পুল—দ্রুত ডিসপ্যাচ ও স্থানীয় সাপোর্ট। গ্রামীণ রুটে সময় কমাতে হাবগুলোকে কেন্দ্র করে রুট প্ল্যান করা হচ্ছে।",
            impact: "উত্তরাঞ্চলে গড় ডেলিভারি সময় কমানোর লক্ষ্য।",
            icon: MapPin,
          },
          {
            title: "ইউরো-৪ ফ্লিট আধুনিকায়ন",
            status: "planned",
            body:
              "ইন্টারসিটি ট্রাকে নতুন প্রজন্মের ইঞ্জিন—জ্বালানি দক্ষতা ও নিম্ন নিষ্কাশন। পুরোনো ইউনিট ধাপে ধাপে প্রতিস্থাপন।",
            impact: "প্রতি টন-কিমি জ্বালানি ব্যবহার কমানো।",
            icon: Leaf,
          },
          {
            title: "ড্রাইভার একাডেমি",
            status: "active",
            body:
              "মাসে ২০০+ ড্রাইভারের জন্য নিরাপদ ড্রাইভিং, লোড সিকিউরিটি ও গ্রাহক যোগাযোগ ট্রেনিং। সার্টিফিকেশন ছাড়া দীর্ঘ রুট অ্যাসাইনমেন্ট সীমিত।",
            impact: "দুর্ঘটনা ও ক্লেইম কমানো—গ্রাহক আস্থা বাড়ানো।",
            icon: Users,
          },
          {
            title: "গ্রাহক অ্যাপ ও ট্র্যাকিং",
            status: "planned",
            body:
              "বুকিং স্ট্যাটাস, ড্রাইভার যোগাযোগ ও ইনভয়েস এক জায়গায়। বিটা পর্যায়ে অংশগ্রহণকারী গ্রাহকদের ফিডব্যাক নেওয়া হচ্ছে।",
            impact: "কম কল, বেশি স্বচ্ছতা।",
            icon: Smartphone,
          },
          {
            title: "কর্পোরেট এসএলএ প্রোগ্রাম",
            status: "active",
            body:
              "নিয়মিত শিপমেন্টের জন্য নির্দিষ্ট রুটে সময় ও গাড়ি গ্যারান্টির মতো স্তরের চুক্তি—ডেডিকেটেড কোঅর্ডিনেটর।",
            impact: "খাদ্য, ওষুধ ও খুচরা খাতে দীর্ঘমেয়াদি অংশীদারিত্ব।",
            icon: Target,
          },
        ]
      : [
          {
            title: "Regional partner hubs",
            status: "active",
            body:
              "Partner depots and driver pools in Rangpur and Rajshahi—faster dispatch and local support. Rural routes are being planned around these hubs to cut lead times.",
            impact: "Aim: shorter average delivery times in the north.",
            icon: MapPin,
          },
          {
            title: "Euro-4 fleet modernization",
            status: "planned",
            body:
              "New-generation engines on intercity trucks—better fuel economy and lower emissions. Older units phased out gradually.",
            impact: "Lower fuel use per ton-kilometre.",
            icon: Leaf,
          },
          {
            title: "Driver academy",
            status: "active",
            body:
              "Monthly training for 200+ drivers on safe driving, load security, and customer communication. Long-route assignments require certification.",
            impact: "Fewer incidents and claims—stronger customer trust.",
            icon: Users,
          },
          {
            title: "Customer app & tracking",
            status: "planned",
            body:
              "Booking status, driver contact, and invoices in one place. Beta feedback is shaping the roadmap.",
            impact: "Fewer calls, more transparency.",
            icon: Smartphone,
          },
          {
            title: "Corporate SLA programme",
            status: "active",
            body:
              "Contract tiers for regular shipments—route-level timing commitments and dedicated coordinators where it makes sense.",
            impact: "Long-term partnerships in food, pharma, and retail.",
            icon: Target,
          },
        ];

  const statusLabel = (s: Card["status"]) =>
    language === "bn"
      ? s === "active"
        ? "চলমান"
        : "পরিকল্পনাধীন"
      : s === "active"
        ? "In progress"
        : "Planned";

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "প্রকল্প ও উন্নয়ন" : "Projects & initiatives"}
        subtitle={
          language === "bn"
            ? "ফ্লিট, প্রশিক্ষণ ও ডিজিটাল—যেখানে আমরা বিনিয়োগ করছি যাতে সেবা আরও নির্ভরযোগ্য হয়।"
            : "Fleet, training, and digital—where we’re investing to make service more reliable."
        }
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="w-full grid md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 md:p-7 shadow-soft flex flex-col"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                  <card.icon className="w-5 h-5 text-secondary" />
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    card.status === "active"
                      ? "bg-green-500/15 text-green-700 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {statusLabel(card.status)}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground mb-3">{card.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{card.body}</p>
              <p className="text-sm text-foreground border-t border-border pt-4">
                <span className="font-semibold text-secondary">
                  {language === "bn" ? "প্রভাব: " : "Impact: "}
                </span>
                {card.impact}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="py-16 bg-muted/50 border-t border-border">
        <div className="w-full text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">
            {language === "bn" ? "আমাদের সাথে বড় চিন্তা করুন" : "Think bigger with us"}
          </h3>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            {language === "bn"
              ? "নিয়মিত ভলিউম বা বিশেষ রুটের জন্য কাস্টম সমাধান আলোচনা করতে যোগাযোগ করুন।"
              : "Contact us to discuss custom solutions for regular volume or special routes."}
          </p>
          <Button variant="secondary" asChild className="gap-2">
            <Link to="/contact">
              {language === "bn" ? "কথা বলুন" : "Talk to us"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Projects;
