import { Truck, Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const quickLinks = [
    { labelKey: "nav.services", href: "#services" },
    { labelKey: "nav.vehicles", href: "#vehicles" },
    { labelKey: "nav.howItWorks", href: "#how-it-works" },
    { labelKey: "footer.aboutUs", href: "#" },
    { labelKey: "footer.terms", href: "#" },
  ];

  const vehicles = language === "bn"
    ? ["ট্রাক", "পিকআপ", "পিকআপ ভ্যান", "প্রাইভেট কার", "হায়েস"]
    : ["Truck", "Pickup", "Pickup Van", "Private Car", "Hiace"];

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground/80">
      <motion.div 
        className="container py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <motion.a 
              href="#" 
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">
                ট্রাক<span className="text-secondary">লাগবে</span>
              </span>
            </motion.a>
            <p className="text-primary-foreground/60 mb-6">
              {t("footer.description")}
            </p>
            <div className="flex gap-4">
              {[Facebook, Youtube].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-primary-foreground font-bold text-lg mb-6">{t("footer.quickLinks")}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <motion.li 
                  key={link.labelKey}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={link.href} className="hover:text-secondary transition-colors inline-block">
                    {t(link.labelKey)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Vehicles */}
          <motion.div variants={itemVariants}>
            <h4 className="text-primary-foreground font-bold text-lg mb-6">{t("nav.vehicles")}</h4>
            <ul className="space-y-4">
              {vehicles.map((vehicle) => (
                <motion.li 
                  key={vehicle}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="hover:text-secondary transition-colors inline-block">
                    {vehicle}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="text-primary-foreground font-bold text-lg mb-6">{t("footer.contact")}</h4>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div>০১৭XX-XXXXXX</div>
                  <div>০১৮XX-XXXXXX</div>
                </div>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>info@trucklagbe.com</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>{language === "bn" ? "মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ" : "Mirpur-10, Dhaka-1216, Bangladesh"}</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <motion.div 
          className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} {language === "bn" ? "ট্রাকলাগবে।" : "TruckLagbe."} {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-sm">
            {[t("footer.privacy"), t("footer.terms")].map((link) => (
              <motion.a 
                key={link}
                href="#" 
                className="text-primary-foreground/60 hover:text-secondary transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
