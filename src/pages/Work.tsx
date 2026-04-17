import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Truck, Timer, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Work = () => {
  const { language } = useLanguage();

  type Case = {
    title: string;
    sector: string;
    route: string;
    vehicle: string;
    detail: string;
    outcome: string;
  };

  const cases: Case[] =
    language === "bn"
      ? [
          {
            title: "মিরপুর → উত্তরা অফিস সরানো",
            sector: "কর্পোরেট অফিস",
            route: "ঢাকা মহানগর",
            vehicle: "১০ টন ট্রাক",
            detail:
              "৪০+ ওয়ার্কস্টেশন, কনফারেন্স টেবিল ও ফাইলিং। এক রাতে লোডিং—পরের দিন সকালে হ্যান্ডওভার।",
            outcome: "নির্ধারিত সময়ের মধ্যে সম্পূর্ণ—ক্লায়েন্টের আইটি টিম সকালে প্লাগইন শুরু করতে পেরেছে।",
          },
          {
            title: "চট্টগ্রাম বন্দর → ঢাকা—কাঁচামাল",
            sector: "খাদ্য প্রক্রিয়াজাতকরণ",
            route: "চট্টগ্রাম – ঢাকা",
            vehicle: "পিকআপ ফ্লিট",
            detail: "৩ দিনে ১২ টি ট্রিপ; প্রতিটি লোড ওজন ও সিল চেকলিস্ট মেনে।",
            outcome: "সময়সূচি ধরে রেখে স্টক আউট এড়ানো—গ্রাহকের উৎপাদন লাইন বন্ধ হয়নি।",
          },
          {
            title: "সিলেট ফার্নিচার শোরুম ডেলিভারি",
            sector: "খুচরা / ফার্নিচার",
            route: "সিলেট শহর ও পার্শ্ববর্তী",
            vehicle: "হায়েস + হেল্পার",
            detail: "গ্রাহকের বাড়িতে ডেলিভারি ও আনঅ্যাসেম্বল সহায়তা—নির্দিষ্ট সময় উইন্ডো।",
            outcome: "শোরুম থেকে রিভিউ রেট উন্নত—ডেলিভারি সময় মেনে চলা।",
          },
          {
            title: "আশুলিয়া গার্মেন্টস—রপ্তানি মাল",
            sector: "তৈরি পোশাক",
            route: "আশুলিয়া – চট্টগ্রাম",
            vehicle: "কভার্ড ট্রাক",
            detail: "সিল ও ডকুমেন্ট হ্যান্ডওভার; রাতের রুটে ট্রাফিক এড়ানো।",
            outcome: "বন্দর কাটঅফ মিস হয়নি—শিপিং লাইনের ডেডলাইন মেনে চলা।",
          },
          {
            title: "খুলনা ওষুধ পাইকারি",
            sector: "স্বাস্থ্য সরবরাহ",
            route: "খুলনা – স্থানীয় জেলা",
            vehicle: "পিকআপ ভ্যান",
            detail: "তাপ সংবেদনশীল নয়—তবে দ্রুত টার্নঅ্যারাউন্ড ও ইনভয়েস মিল রেখে।",
            outcome: "ফার্মেসিগুলোতে সময়মতো স্টক—বিক্রয় কমেনি।",
          },
          {
            title: "বসুন্ধরা আবাসিক বাসা বদল",
            sector: "বাসা বদল",
            route: "বসুন্ধরা – গুলশান",
            vehicle: "হায়েস + ট্রাক",
            detail: "দুই দিনের পরিকল্পনা; ফার্নিচার কভার ও লেবেলিং।",
            outcome: "ক্ষতিহীন হ্যান্ডওভার—গ্রাহক রেফারেন্স দিয়েছেন।",
          },
        ]
      : [
          {
            title: "Mirpur → Uttara office move",
            sector: "Corporate office",
            route: "Dhaka metro",
            vehicle: "10-ton truck",
            detail:
              "40+ workstations, conference tables, and filing. Overnight loading—handover next morning.",
            outcome: "Completed inside the window—IT could plug in the same morning.",
          },
          {
            title: "Chittagong port → Dhaka raw materials",
            sector: "Food processing",
            route: "Chittagong – Dhaka",
            vehicle: "Pickup fleet",
            detail: "12 trips in 3 days; each load checked for weight and seals.",
            outcome: "Schedule held—production line avoided stock-outs.",
          },
          {
            title: "Sylhet furniture showroom deliveries",
            sector: "Retail / furniture",
            route: "Sylhet city & nearby",
            vehicle: "Hiace + helpers",
            detail: "Home delivery with assembly help—fixed time windows.",
            outcome: "Higher review scores—on-time arrival to customers’ homes.",
          },
          {
            title: "Ashulia garment export cargo",
            sector: "Apparel",
            route: "Ashulia – Chittagong",
            vehicle: "Covered truck",
            detail: "Seal and document handover; night routing to reduce traffic delays.",
            outcome: "Port cut-off met—shipping line deadline respected.",
          },
          {
            title: "Khulna pharmaceutical wholesale",
            sector: "Health supply",
            route: "Khulna – surrounding districts",
            vehicle: "Pickup van",
            detail: "Fast turnaround with invoice matching—not temperature-controlled.",
            outcome: "Pharmacies received stock on time—sales stayed steady.",
          },
          {
            title: "Bashundhara residential move",
            sector: "House shifting",
            route: "Bashundhara – Gulshan",
            vehicle: "Hiace + truck",
            detail: "Two-day plan; furniture covers and labelling.",
            outcome: "Damage-free handover—customer provided a referral.",
          },
        ];

  const intro =
    language === "bn"
      ? "নিচের উদাহরণগুলো আমাদের দৈনন্দিন কাজের ধরন দেখায়—নাম ও সংখ্যা চিত্রণমূলক, তবে প্রক্রিয়া ও মান আসল সেবার মতোই। প্রতিটি প্রজেক্টে আমরা যোগাযোগ, সময় ও নিরাপত্তাকে গুরুত্ব দিই।"
      : "The examples below reflect the kinds of jobs we run every day—names and figures are illustrative, but process and quality match how we actually work. On every job we prioritize communication, timing, and safety.";

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "আমাদের কাজ" : "Our work"}
        subtitle={
          language === "bn"
            ? "রুট, খাত ও ফলাফল—যেভাবে আমরা গ্রাহকদের পাশে দাঁড়াই।"
            : "Routes, sectors, and outcomes—how we stand beside our customers."
        }
      />

      <section className="py-10 bg-muted/30 border-b border-border">
        <div className="w-full">
          <p className="text-sm text-muted-foreground leading-relaxed text-center">{intro}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="w-full space-y-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-card p-6 md:p-7 shadow-soft"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-foreground">
                  <Building2 className="w-3 h-3 text-secondary" />
                  {c.sector}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {c.route}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  <Truck className="w-3 h-3" />
                  {c.vehicle}
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">{c.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{c.detail}</p>
                  <div className="flex gap-2 items-start rounded-lg bg-primary/5 border border-primary/10 p-3">
                    <Timer className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">
                      <span className="font-medium text-secondary">
                        {language === "bn" ? "ফলাফল: " : "Outcome: "}
                      </span>
                      {c.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-14 bg-muted/40 border-t border-border text-center">
        <div className="w-full">
          <p className="text-muted-foreground text-sm mb-6">
            {language === "bn"
              ? "আপনার শিল্প বা রুট নিয়ে আলোচনা করতে চান? সেবা বিস্তারিত দেখুন।"
              : "Want to discuss your sector or route? Explore our services in detail."}
          </p>
          <Button variant="secondary" asChild>
            <Link to="/services">{language === "bn" ? "সেবাসমূহ" : "Our services"}</Link>
          </Button>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Work;
