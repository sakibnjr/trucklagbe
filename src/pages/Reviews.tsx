import { motion } from "framer-motion";
import { Star, Quote, ThumbsUp, Headphones, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Reviews = () => {
  const { language } = useLanguage();

  type Review = {
    name: string;
    location: string;
    text: string;
    tag: string;
  };

  const reviews: Review[] =
    language === "bn"
      ? [
          {
            name: "আশিক রহমান",
            location: "চট্টগ্রাম",
            tag: "আন্তঃনগর মাল",
            text: "ঢাকা থেকে চট্টগ্রাম মাল পাঠিয়েছিলাম—সময়মতো পৌঁছেছে, ড্রাইভার রুট চেনে। বিলিং স্বচ্ছ ছিল।",
          },
          {
            name: "নাসরিন জাহান",
            location: "ঢাকা",
            tag: "বাসা বদল",
            text: "হায়েস ও হেল্পার—আসবাবপত্রে খুঁতছাড়া নেই। সময় উইন্ডো মেনে চলেছে।",
          },
          {
            name: "তানভীর ইসলাম",
            location: "ঢাকা",
            tag: "সাপোর্ট",
            text: "সাপোর্ট লাইন দ্রুত উত্তর দিয়েছে। দাম স্বচ্ছ, লুকোনো চার্জ নেই।",
          },
          {
            name: "রহিমা সুলতানা",
            location: "সিলেট",
            tag: "খুচরা ডেলিভারি",
            text: "শোরুম থেকে গ্রাহকের বাড়ি—ড্রাইভার ভদ্র ও সাহায্যকারী। আবার বুক করব।",
          },
          {
            name: "কামাল উদ্দিন",
            location: "নারায়ণগঞ্জ",
            tag: "কারখানা মাল",
            text: "নিয়মিত পিকআপ ট্রিপ—সময়সূচি ধরে রেখেছে। প্রোডাকশন লাইন থেমে যায়নি।",
          },
          {
            name: "সুমাইয়া করিম",
            location: "উত্তরা",
            tag: "অফিস সরানো",
            text: "রাতের লোডিং—পরের দিন সকালে অফিস চালু। আইটি টিম খুশি।",
          },
          {
            name: "জাহিদ হাসান",
            location: "খুলনা",
            tag: "পাইকারি",
            text: "ইনভয়েস মিলিয়ে মাল—ডকুমেন্ট ঠিক ছিল। যোগাযোগ ভালো।",
          },
          {
            name: "মৌসুমি আক্তার",
            location: "রাজশাহী",
            tag: "প্রথম বুকিং",
            text: "প্রথমবার ট্রাক ভাড়া—টিম ধৈর্য ধরে বুঝিয়েছে। আত্মবিশ্বাস বেড়েছে।",
          },
        ]
      : [
          {
            name: "Ashik Rahman",
            location: "Chittagong",
            tag: "Intercity cargo",
            text: "Dhaka to Chittagong—on time, driver knew the route. Billing was clear.",
          },
          {
            name: "Nasrin Jahan",
            location: "Dhaka",
            tag: "House move",
            text: "Hiace and helpers—no scratches on furniture. Stuck to the time window.",
          },
          {
            name: "Tanvir Islam",
            location: "Dhaka",
            tag: "Support",
            text: "Support answered fast. Pricing was transparent—no hidden fees.",
          },
          {
            name: "Rahima Sultana",
            location: "Sylhet",
            tag: "Retail delivery",
            text: "Showroom to customer home—polite, helpful driver. Would book again.",
          },
          {
            name: "Kamal Uddin",
            location: "Narayanganj",
            tag: "Factory runs",
            text: "Regular pickup trips—schedule held. Production didn’t stop.",
          },
          {
            name: "Sumaiya Karim",
            location: "Uttara",
            tag: "Office move",
            text: "Overnight loading—office live next morning. IT team was happy.",
          },
          {
            name: "Zahid Hasan",
            location: "Khulna",
            tag: "Wholesale",
            text: "Goods matched the invoice—paperwork was right. Good communication.",
          },
          {
            name: "Mousumi Akter",
            location: "Rajshahi",
            tag: "First booking",
            text: "First time renting a truck—the team explained patiently. Felt confident.",
          },
        ];

  const aggregate =
    language === "bn"
      ? { score: "৪.৮", sub: "গড় রেটিং (৫.০ থেকে)", note: "গ্রাহক ফিডব্যাক থেকে সংক্ষিপ্ত নমুনা" }
      : { score: "4.8", sub: "Average rating (out of 5)", note: "Sample of customer feedback" };

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "গ্রাহক রিভিউ" : "Customer reviews"}
        subtitle={
          language === "bn"
            ? "যারা আমাদের সাথে পরিবহন করেছেন—তাদের কথায় আমাদের প্রতিশ্রুতি।"
            : "From customers who moved goods with us—our promise in their words."
        }
      />

      <section className="py-12 bg-muted/40 border-b border-border">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl sm:rounded-3xl border border-border bg-card px-6 sm:px-10 py-8 md:py-10 text-center shadow-soft ring-1 ring-border/50"
          >
            <div className="flex justify-center gap-0.5 mb-3 text-secondary">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-7 h-7 fill-current" />
              ))}
            </div>
            <p className="text-4xl md:text-5xl font-bold text-foreground mb-1">{aggregate.score}</p>
            <p className="text-sm text-muted-foreground mb-2">{aggregate.sub}</p>
            <p className="text-xs text-muted-foreground">{aggregate.note}</p>
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Truck className="w-4 h-4 text-secondary" />
                {language === "bn" ? "যাচাইকৃত ড্রাইভার" : "Verified drivers"}
              </span>
              <span className="inline-flex items-center gap-2">
                <Headphones className="w-4 h-4 text-secondary" />
                {language === "bn" ? "সাপোর্ট টিম" : "Support team"}
              </span>
              <span className="inline-flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-secondary" />
                {language === "bn" ? "স্বচ্ছ মূল্য" : "Clear pricing"}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="w-full">
          <div className="grid sm:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <motion.blockquote
                key={r.name + r.tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.03, 0.15) }}
                className="border border-border rounded-xl p-6 bg-card flex flex-col"
              >
                <Quote className="w-8 h-8 text-secondary/40 mb-3" />
                <div className="flex gap-1 mb-3 text-secondary">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed flex-1 mb-4">&ldquo;{r.text}&rdquo;</p>
                <footer className="text-sm border-t border-border pt-4">
                  <span className="font-semibold text-foreground">{r.name}</span>
                  <span className="text-muted-foreground"> — {r.location}</span>
                  <span className="block text-xs text-secondary mt-1">{r.tag}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-primary text-primary-foreground text-center">
        <div className="w-full">
          <p className="text-primary-foreground/90 text-sm mb-6 leading-relaxed">
            {language === "bn"
              ? "আপনার অভিজ্ঞতা শেয়ার করতে চান? বুকিং নম্বরসহ আমাদের সাপোর্টে লিখুন—আমরা উন্নতিতে ব্যবহার করি।"
              : "Want to share your experience? Write to support with your booking reference—we use feedback to improve."}
          </p>
          <Button variant="secondary" asChild>
            <Link to="/contact">{language === "bn" ? "যোগাযোগ" : "Contact"}</Link>
          </Button>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Reviews;
