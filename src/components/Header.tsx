import { Truck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.vehicles"), href: "#vehicles" },
    { label: t("nav.about"), href: "/about", isRoute: true },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground">
              আমার<span className="text-secondary">ট্রাক</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              link.isRoute ? (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div 
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <LanguageSwitcher />
            <Button variant="secondary">{t("nav.booking")}</Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <motion.button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-in Menu from Left */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-[75%] max-w-[300px] bg-card z-[70] md:hidden shadow-2xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <a href="#" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    আমার<span className="text-secondary">ট্রাক</span>
                  </span>
                </a>
                <motion.button
                  className="p-2 text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="block px-6 py-3.5 text-foreground hover:bg-muted transition-colors font-medium border-b border-border/50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="block px-6 py-3.5 text-foreground hover:bg-muted transition-colors font-medium border-b border-border/50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="p-4 border-t border-border">
                <Button variant="secondary" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  {t("nav.booking")}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
