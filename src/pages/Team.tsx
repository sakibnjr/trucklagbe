import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Zap,
  Users,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const TEAM_IMAGES = {
  asif: "/team/Asif Karim Biplob.jpeg",
  arif: "/team/Ariyan Arif.jpeg",
  nahid: "/team/Sakib Nahid.jpg",
} as const;

const Team = () => {
  const { language } = useLanguage();

  type Member = {
    image: string;
    name: string;
    role: string;
    bio: string;
  };

  const people: Member[] =
    language === "bn"
      ? [
          {
            image: TEAM_IMAGES.asif,
            name: "আসিফ করিম বিপ্লব",
            role: "প্রধান নির্বাহী ও প্রতিষ্ঠাতা",
            bio: "আমারট্রাকের দিকনির্দেশনা ও দীর্ঘমেয়াদি কৌশল—গ্রাহক অভিজ্ঞতা ও দল গঠনে তার নেতৃত্ব।",
          },
          {
            image: TEAM_IMAGES.arif,
            name: "আরিয়ান আরিফ",
            role: "বিপণন ও বিক্রয়",
            bio: "ব্র্যান্ড, পার্টনারশিপ ও বাজার সম্প্রসারণ—নতুন গ্রাহক ও চ্যানেল নিয়ে তার ফোকাস।",
          },
          {
            image: TEAM_IMAGES.nahid,
            name: "সাকিব নাহিদ",
            role: "অপারেশন প্রধান",
            bio: "ডিসপ্যাচ, ফ্লিট ও মাঠ পর্যায়ের সেবা—দৈনিক অপারেশন যেন সময় ও মান অনুযায়ী চলে তার দায়িত্ব।",
          },
        ]
      : [
          {
            image: TEAM_IMAGES.asif,
            name: "Asif Karim Biplob",
            role: "CEO & Founder",
            bio: "Leads AmarTruck’s direction and long-term strategy—customer experience and team building.",
          },
          {
            image: TEAM_IMAGES.arif,
            name: "Ariyan Arif",
            role: "Marketing & Sales",
            bio: "Brand, partnerships, and growth—focused on new customers and channels across the market.",
          },
          {
            image: TEAM_IMAGES.nahid,
            name: "Sakib Nahid",
            role: "Head of Operations",
            bio: "Dispatch, fleet, and field execution—keeping day-to-day operations on time and on standard.",
          },
        ];

  const [lead, ...rest] = people;

  const stats =
    language === "bn"
      ? [
          {
            icon: Users,
            value: "৩",
            label: "নেতৃত্বের ভূমিকা",
            sub: "কৌশল · বিপণন · অপারেশন",
          },
          {
            icon: MapPin,
            value: "৬৪+",
            label: "জেলায় কভারেজ",
            sub: "সারাদেশে নেটওয়ার্ক",
          },
          {
            icon: Heart,
            value: "১০,০০০+",
            label: "সন্তুষ্ট গ্রাহক",
            sub: "বিশ্বাস ও পুনরায় বুকিং",
          },
          {
            icon: Clock,
            value: "২৪/৭",
            label: "সাপোর্ট মনমানসিকতা",
            sub: "ডিসপ্যাচ ও হেল্পলাইন",
          },
        ]
      : [
          {
            icon: Users,
            value: "3",
            label: "Leadership roles",
            sub: "Strategy · Sales · Ops",
          },
          {
            icon: MapPin,
            value: "64+",
            label: "Districts covered",
            sub: "Nationwide network",
          },
          {
            icon: Heart,
            value: "10,000+",
            label: "Happy customers",
            sub: "Trust & repeat bookings",
          },
          {
            icon: Clock,
            value: "24/7",
            label: "Support mindset",
            sub: "Dispatch & help lines",
          },
        ];

  const values =
    language === "bn"
      ? [
          {
            icon: Shield,
            title: "নিরাপত্তা প্রথম",
            text: "মাল ও মানুষ—দুটোর জন্যই আমাদের প্রক্রিয়া স্পষ্ট।",
          },
          {
            icon: Zap,
            title: "সময়ের মর্যাদা",
            text: "রিয়েলিস্টিক স্লট দিই; সম্ভব না হলে আগে জানাই।",
          },
          {
            icon: Heart,
            title: "স্বচ্ছতা",
            text: "দাম ও শর্ত লুকোনো নয়—প্রশ্ন করলে স্পষ্ট উত্তর।",
          },
        ]
      : [
          {
            icon: Shield,
            title: "Safety first",
            text: "Clear processes for cargo and for people.",
          },
          {
            icon: Zap,
            title: "Respect for time",
            text: "Realistic slots; we flag delays early.",
          },
          {
            icon: Heart,
            title: "Transparency",
            text: "No hidden pricing—straight answers when you ask.",
          },
        ];

  const sectionIntro =
    language === "bn"
      ? {
          kicker: "লিডারশিপ",
          title: "যারা আমারট্রাককে এগিয়ে নিয়ে যান",
          desc: "কৌশল থেকে মাঠ পর্যন্ত—একই টেবিলে বসে আমরা গ্রাহকের অভিজ্ঞতা, ব্র্যান্ড ও অপারেশন একসূত্রে গাঁথি। নিচে আমাদের কোর লিডারশিপ টিম।",
        }
      : {
          kicker: "Leadership",
          title: "The people moving AmarTruck forward",
          desc: "From strategy to the field—we align customer experience, brand, and operations in one rhythm. Meet the core leadership team below.",
        };

  const cultureIntro =
    language === "bn"
      ? {
          kicker: "সংস্কৃতি",
          title: "কাজ করার ধরন",
          desc: "দ্রুত নয়, দায়িত্বশীল—আমরা যা প্রতিশ্রুতি দিই তা রাখার চেষ্টা করি, প্রতিদিন।",
        }
      : {
          kicker: "Culture",
          title: "How we work",
          desc: "Fast isn’t enough—we aim to deliver what we promise, every day.",
        };

  return (
    <MarketingPageLayout>
      <div className="relative">
        {/* Ambient background */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.14),transparent)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[40%] h-96 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,hsl(var(--secondary)/0.08),transparent)]"
          aria-hidden
        />

        <div className="relative">
          <MarketingPageHero
            title={language === "bn" ? "আমাদের দল" : "Our team"}
            subtitle={
              language === "bn"
                ? "নেতৃত্ব, বিপণন ও অপারেশন—একসাথে আপনার বুকিং ও ডেলিভারি নির্বিঘ্ন রাখতে।"
                : "Leadership, marketing, and operations—working together to keep your bookings and deliveries on track."
            }
          />

          {/* Floating stats — bridges hero & content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative z-10 -mt-6 sm:-mt-8 mb-10 sm:mb-14"
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-border/80 bg-card/95 p-4 sm:p-6 shadow-[0_24px_60px_-24px_hsl(220_25%_10%/0.18)] backdrop-blur-sm ring-1 ring-primary/5">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-2">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center rounded-xl bg-muted/40 px-3 py-4 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left sm:py-3"
                  >
                    <div className="mb-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mb-0">
                      <s.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {s.value}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {s.label}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground/90 sm:text-xs">
                        {s.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Leadership intro */}
          <section className="mb-12 sm:mb-16">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              {sectionIntro.kicker}
            </p>
            <h2 className="mt-3 text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {sectionIntro.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
              {sectionIntro.desc}
            </p>
          </section>

          {/* Featured CEO */}
          <section className="mb-8 md:mb-12">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-[0_20px_50px_-28px_hsl(220_25%_10%/0.2)] ring-1 ring-border/50"
            >
              <div className="flex flex-col lg:min-h-[320px] lg:flex-row">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:aspect-auto lg:w-[42%] lg:max-w-md lg:shrink-0">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent lg:bg-gradient-to-r" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg lg:left-auto lg:right-4">
                    {language === "bn" ? "প্রতিষ্ঠাতা" : "Founder"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {lead.name}
                    </h3>
                    <p className="mt-2 inline-flex rounded-full bg-secondary/15 px-3 py-1 text-sm font-semibold text-secondary">
                      {lead.role}
                    </p>
                  </div>
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                    {lead.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      language === "bn" ? "কৌশল" : "Strategy",
                      language === "bn" ? "দল" : "Team",
                      language === "bn" ? "গ্রাহক" : "Customers",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-border/80 bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </section>

          {/* Marketing & Ops */}
          <section className="mb-16 md:mb-20">
            <div className="grid gap-6 md:grid-cols-2">
              {rest.map((p, i) => (
                <motion.article
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-[0_16px_40px_-24px_hsl(220_25%_10%/0.18)] ring-1 ring-border/40 transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-20px_hsl(220_25%_10%/0.22)]"
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-xl font-bold text-foreground">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-secondary">
                      {p.role}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.bio}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Culture */}
          <section className="relative mb-16 md:mb-20 overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-muted/80 via-muted/40 to-primary/[0.06] px-5 py-12 sm:px-8 sm:py-16 md:px-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {cultureIntro.kicker}
              </p>
              <h2 className="mt-3 text-center text-2xl font-bold text-foreground sm:text-3xl">
                {cultureIntro.title}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground sm:text-base">
                {cultureIntro.desc}
              </p>
              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-2xl border border-border/70 bg-card/90 p-6 text-center shadow-sm backdrop-blur-sm transition hover:border-secondary/30 hover:shadow-md"
                  >
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5">
                      <v.icon
                        className="h-6 w-6 text-secondary"
                        strokeWidth={1.75}
                      />
                    </div>
                    <h3 className="font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {v.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/85 p-8 text-center shadow-[0_28px_60px_-24px_hsl(var(--primary)/0.45)] sm:p-12 md:p-14">
            <div
              className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-secondary/25 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-primary-foreground/10 blur-2xl"
              aria-hidden
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
                {language === "bn"
                  ? "দলের সাথে যোগাযোগ করুন"
                  : "Connect with our team"}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-primary-foreground/85">
                {language === "bn"
                  ? "কর্পোরেট চুক্তি, পার্টনারশিপ বা সাধারণ প্রশ্ন—আমরা শুনতে প্রস্তুত।"
                  : "Corporate agreements, partnerships, or general questions—we’re ready to listen."}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="min-w-[200px] shadow-lg"
                  asChild
                >
                  <Link to="/contact">
                    {language === "bn" ? "যোগাযোগ করুন" : "Contact us"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[200px] border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                  asChild
                >
                  <Link to="/services">
                    {language === "bn" ? "সেবাসমূহ দেখুন" : "View services"}
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MarketingPageLayout>
  );
};

export default Team;
