import { Truck, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SITE_CONTENT_CLASS } from "@/lib/layout";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { t } = useLanguage();

  const serviceDropdown: Array<{ type: "sep" } | { labelKey: string; to: string }> = [
    { labelKey: "nav.drop.overview", to: "/services" },
    { labelKey: "nav.drop.house", to: "/services#house" },
    { labelKey: "nav.drop.office", to: "/services#office" },
    { labelKey: "nav.drop.commercial", to: "/services#commercial" },
    { labelKey: "nav.drop.express", to: "/services#express" },
    { type: "sep" },
    { labelKey: "nav.drop.howItWorks", to: "/#how-it-works" },
    { labelKey: "nav.drop.vehicles", to: "/#vehicles" },
    { labelKey: "nav.drop.about", to: "/about" },
  ];

  const mainLinks: { labelKey: string; to: string }[] = [
    { labelKey: "nav.recentPosts", to: "/blog#recent" },
    { labelKey: "nav.work", to: "/work" },
    { labelKey: "nav.projects", to: "/projects" },
    { labelKey: "nav.team", to: "/team" },
    { labelKey: "nav.creative", to: "/creative" },
    { labelKey: "nav.blog", to: "/blog" },
    { labelKey: "nav.reviews", to: "/reviews" },
    { labelKey: "nav.contactUs", to: "/contact" },
    { labelKey: "nav.customerSafety", to: "/safety" },
  ];

  const closeMobile = () => {
    setIsMenuOpen(false);
    setServicesOpen(false);
  };

  const navLinkClass =
    "text-muted-foreground hover:text-foreground transition-colors font-medium relative group";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
      >
        <div className={cn(SITE_CONTENT_CLASS, "flex items-center justify-between h-16 md:h-20 gap-2")}>
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={closeMobile}
          >
            <motion.div
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
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 min-w-0 items-center justify-end gap-x-1.5 xl:gap-x-2.5 flex-wrap gap-y-1 text-[13px] xl:text-sm">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              whileHover={{ y: -2 }}
            >
              <Link to="/" className={navLinkClass}>
                {t("nav.home")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  navLinkClass,
                  "inline-flex items-center gap-0.5 outline-none ring-0 border-0 bg-transparent cursor-pointer rounded-sm px-0.5 py-0",
                )}
              >
                {t("nav.services")}
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 z-[80]">
                {serviceDropdown.map((item, idx) =>
                  "type" in item ? (
                    <DropdownMenuSeparator key={`sep-${idx}`} />
                  ) : (
                    <DropdownMenuItem key={item.labelKey} asChild>
                      <Link to={item.to} className="cursor-pointer">
                        {t(item.labelKey)}
                      </Link>
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {mainLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + 0.04 * index, duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <Link to={link.to} className={navLinkClass}>
                  {t(link.labelKey)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            className="hidden lg:flex items-center gap-3 shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <LanguageSwitcher />
            <Button variant="secondary">{t("nav.booking")}</Button>
          </motion.div>

          {/* Mobile / tablet: menu + lang */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <motion.button
              type="button"
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-[min(100%,320px)] max-w-[90vw] bg-card z-[70] lg:hidden shadow-2xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
                  <div className="w-9 h-9 rounded-xl hero-gradient flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    আমার<span className="text-secondary">ট্রাক</span>
                  </span>
                </Link>
                <motion.button
                  type="button"
                  className="p-2 text-foreground"
                  onClick={closeMobile}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <nav className="flex-1 overflow-y-auto py-2">
                <Link
                  to="/"
                  className="block px-6 py-3.5 text-foreground hover:bg-muted transition-colors font-medium border-b border-border/50"
                  onClick={closeMobile}
                >
                  {t("nav.home")}
                </Link>

                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-3.5 text-foreground hover:bg-muted transition-colors font-medium border-b border-border/50 text-left"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  {t("nav.services")}
                  <ChevronDown
                    className={cn("w-4 h-4 shrink-0 transition-transform", servicesOpen && "rotate-180")}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-muted/40"
                    >
                      {serviceDropdown.map((item, idx) =>
                        "type" in item ? (
                          <div key={`msep-${idx}`} className="h-px bg-border/60 mx-4 my-1" />
                        ) : (
                          <Link
                            key={item.labelKey}
                            to={item.to}
                            className="block pl-10 pr-6 py-2.5 text-sm text-foreground hover:bg-muted/80 border-b border-border/30"
                            onClick={closeMobile}
                          >
                            {t(item.labelKey)}
                          </Link>
                        ),
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {mainLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-6 py-3.5 text-foreground hover:bg-muted transition-colors font-medium border-b border-border/50"
                    onClick={closeMobile}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
              </nav>

              <div className="p-4 border-t border-border">
                <Button variant="secondary" className="w-full" onClick={closeMobile}>
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
