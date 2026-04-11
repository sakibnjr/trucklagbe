import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import MarketingPageLayout from "@/components/MarketingPageLayout";
import MarketingPageHero from "@/components/MarketingPageHero";

const Contact = () => {
  const { language } = useLanguage();

  return (
    <MarketingPageLayout>
      <MarketingPageHero
        title={language === "bn" ? "যোগাযোগ করুন" : "Contact us"}
        subtitle={
          language === "bn"
            ? "ফোন, ইমেইল বা হোমপেজের বুকিং ফর্ম—যেটি সুবিধাজনক সেটি ব্যবহার করুন।"
            : "Phone, email, or the booking form on the home page—whatever works best."
        }
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card p-8 space-y-6"
          >
            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">
                  {language === "bn" ? "ফোন" : "Phone"}
                </p>
                <a href="tel:+8801978832209" className="text-muted-foreground hover:text-secondary block">
                  ০১৯৭৮-৮৩২২০৯
                </a>
                <a
                  href="https://wa.me/8801608832209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-secondary block text-sm"
                >
                  WhatsApp: ০১৬০৮-৮৩২২০৯
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">Email</p>
                <span className="text-muted-foreground">info@amartruck.com</span>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-secondary shrink-0" />
              <div>
                <p className="font-medium text-foreground mb-1">
                  {language === "bn" ? "ঠিকানা" : "Address"}
                </p>
                <span className="text-muted-foreground">
                  {language === "bn" ? "মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ" : "Mirpur-10, Dhaka-1216, Bangladesh"}
                </span>
              </div>
            </div>
            <div className="pt-4">
              <Link to="/">
                <Button variant="secondary" className="w-full sm:w-auto">
                  {language === "bn" ? "হোমে বুকিং ফর্ম" : "Booking form on home"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </MarketingPageLayout>
  );
};

export default Contact;
