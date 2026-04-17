import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Contact = () => {
  const { language } = useLanguage();

  const hours =
    language === "bn"
      ? [
          { d: "শনি – বৃহস্পতি", h: "সকাল ৮:০০ – রাত ১০:০০" },
          { d: "শুক্রবার", h: "সকাল ৯:০০ – রাত ৯:০০" },
        ]
      : [
          { d: "Sat – Thu", h: "8:00 AM – 10:00 PM" },
          { d: "Friday", h: "9:00 AM – 9:00 PM" },
        ];

  const faq =
    language === "bn"
      ? [
          {
            q: "কত দ্রুত উত্তর পাব?",
            a: "কর্মঘণ্টার মধ্যে সাধারণত ৩০ মিনিটের মধ্যে; ব্যস্ত সময়ে এক ঘণ্টা পর্যন্ত লাগতে পারে।",
          },
          {
            q: "হোয়াটসঅ্যাপে বুকিং হয়?",
            a: "হ্যাঁ—হোমপেজের ফর্ম পূরণ করে হোয়াটসঅ্যাপে পাঠানো যায়, অথবা সরাসরি নম্বরে মেসেজ করুন।",
          },
          {
            q: "কর্পোরেট চুক্তি?",
            a: "নিয়মিত ভলিউমের জন্য আলাদা রেট ও এসএলএ—ইমেইল বা ফোনে টিমের সাথে কথা বলুন।",
          },
        ]
      : [
          {
            q: "How fast do you reply?",
            a: "Usually within 30 minutes during business hours; busy periods may take up to an hour.",
          },
          {
            q: "Can I book via WhatsApp?",
            a: "Yes—use the home page form and send via WhatsApp, or message the number directly.",
          },
          {
            q: "Corporate contracts?",
            a: "For regular volume we offer tailored rates and SLAs—email or call the team.",
          },
        ];

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "যোগাযোগ করুন" : "Contact us"}
        subtitle={
          language === "bn"
            ? "ফোন, হোয়াটসঅ্যাপ, ইমেইল—যেটিতে আরাম সেটি ব্যবহার করুন। আমরা স্বচ্ছ ও দ্রুত উত্তরের চেষ্টা করি।"
            : "Phone, WhatsApp, or email—use what works for you. We aim for clear, prompt replies."
        }
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="w-full grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-8 space-y-8 shadow-soft"
          >
            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">{language === "bn" ? "ফোন" : "Phone"}</p>
                <a href="tel:+8801978832209" className="text-muted-foreground hover:text-secondary block">
                  ০১৯৭৮-৮৩২২০৯
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  {language === "bn" ? "প্রাথমিক সাপোর্ট ও বুকিং" : "Main support & bookings"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <MessageCircle className="w-6 h-6 text-[#25D366] shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/8801608832209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#128C7E] block"
                >
                  ০১৬০৮-৮৩২২০৯
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  {language === "bn" ? "দ্রুত টেক্সট ও লোকেশন শেয়ার" : "Quick text & location sharing"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">Email</p>
                <a href="mailto:info@amartruck.com" className="text-muted-foreground hover:text-secondary">
                  info@amartruck.com
                </a>
                <p className="text-xs text-muted-foreground mt-2">
                  {language === "bn" ? "কর্পোরেট ও বিস্তারিত জিজ্ঞাসা" : "Corporate & detailed enquiries"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">
                  {language === "bn" ? "ঠিকানা" : "Address"}
                </p>
                <span className="text-muted-foreground text-sm leading-relaxed">
                  {language === "bn" ? "মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ" : "Mirpur-10, Dhaka-1216, Bangladesh"}
                </span>
                <p className="text-xs text-muted-foreground mt-2">
                  {language === "bn" ? "অফিস ও ডিসপ্যাচ—আগে থেকে সময় নিয়ে আসুন" : "Office & dispatch—visit by appointment"}
                </p>
              </div>
            </div>
            <div className="pt-2">
              <Link to="/">
                <Button variant="secondary" className="w-full">
                  {language === "bn" ? "হোমপেজে বুকিং ফর্ম" : "Booking form on home page"}
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-card p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-foreground">
                  {language === "bn" ? "কর্মঘণ্টা" : "Hours"}
                </h3>
              </div>
              <ul className="space-y-3 text-sm">
                {hours.map((row) => (
                  <li key={row.d} className="flex justify-between gap-4 border-b border-border/60 pb-2 last:border-0">
                    <span className="text-muted-foreground">{row.d}</span>
                    <span className="text-foreground font-medium text-right">{row.h}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-4">
                {language === "bn"
                  ? "জরুরি রাস্তায় সহায়তা—২৪/৭ হটলাইন নির্ভর করতে পারে রুট ও নীতির উপর।"
                  : "Roadside emergencies—24/7 hotline availability depends on route and policy."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-muted/40 p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Headphones className="w-5 h-5 text-secondary" />
                <h3 className="font-semibold text-foreground">
                  {language === "bn" ? "সাধারণ জিজ্ঞাসা" : "Common questions"}
                </h3>
              </div>
              <ul className="space-y-5">
                {faq.map((item) => (
                  <li key={item.q}>
                    <p className="text-sm font-medium text-foreground mb-1">{item.q}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Contact;
