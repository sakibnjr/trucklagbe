import { Truck, Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
              বাংলাদেশের সবচেয়ে বিশ্বস্ত পরিবহন সেবা। যেকোনো ধরনের যানবাহন ভাড়া নিন সহজে ও দ্রুত।
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
            <h4 className="text-primary-foreground font-bold text-lg mb-6">দ্রুত লিংক</h4>
            <ul className="space-y-4">
              {[
                { label: "সেবাসমূহ", href: "#services" },
                { label: "যানবাহন", href: "#vehicles" },
                { label: "কিভাবে কাজ করে", href: "#how-it-works" },
                { label: "আমাদের সম্পর্কে", href: "#" },
                { label: "শর্তাবলী", href: "#" },
              ].map((link, i) => (
                <motion.li 
                  key={link.label}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={link.href} className="hover:text-secondary transition-colors inline-block">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Vehicles */}
          <motion.div variants={itemVariants}>
            <h4 className="text-primary-foreground font-bold text-lg mb-6">যানবাহন</h4>
            <ul className="space-y-4">
              {["ট্রাক", "পিকআপ", "পিকআপ ভ্যান", "প্রাইভেট কার", "হায়েস"].map((vehicle) => (
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
            <h4 className="text-primary-foreground font-bold text-lg mb-6">যোগাযোগ</h4>
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
                <span>মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ</span>
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
            © {currentYear} ট্রাকলাগবে। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-6 text-sm">
            {["গোপনীয়তা নীতি", "ব্যবহারের শর্তাবলী"].map((link) => (
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
