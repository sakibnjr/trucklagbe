import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Team = () => {
  const { language } = useLanguage();

  const people =
    language === "bn"
      ? [
          { name: "করিম হোসেন", role: "অপারেশন ম্যানেজার", note: "রুট ও ফ্লিট সমন্বয়।" },
          { name: "ফারহানা আক্তার", role: "গ্রাহক সেবা লিড", note: "২৪/৭ সাপোর্ট টিম।" },
          { name: "রাফি আহমেদ", role: "ফ্লিট সুপারভাইজার", note: "যানবাহন রক্ষণাবেক্ষণ ও নিরাপত্তা।" },
          { name: "সাবরিনা চৌধুরী", role: "পার্টনারশিপ", note: "বিজনেস ও লজিস্টিকস পার্টনার।" },
        ]
      : [
          { name: "Karim Hossain", role: "Operations manager", note: "Routes & fleet coordination." },
          { name: "Farhana Akter", role: "Customer care lead", note: "24/7 support team." },
          { name: "Rafi Ahmed", role: "Fleet supervisor", note: "Vehicle maintenance & safety." },
          { name: "Sabrina Chowdhury", role: "Partnerships", note: "Business & logistics partners." },
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "আমাদের দল" : "Our team"}
        subtitle={
          language === "bn"
            ? "আপনার বুকিং ও ডেলিভারি পিছনে যারা কাজ করেন—উদাহরণমূলক প্রোফাইল।"
            : "The people behind bookings and deliveries—sample profiles."
        }
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {people.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-6 shadow-soft"
              >
                <h2 className="text-lg font-semibold text-foreground">{p.name}</h2>
                <p className="text-secondary text-sm font-medium mb-2">{p.role}</p>
                <p className="text-muted-foreground text-sm">{p.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Team;
