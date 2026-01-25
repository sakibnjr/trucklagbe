import { MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import serviceAreasBg from "@/assets/service-areas-bg.jpg";

const ServiceAreasSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const majorCities = language === "bn" 
    ? ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর", "ময়মনসিংহ", "কুমিল্লা", "গাজীপুর", "নারায়ণগঞ্জ", "সাভার"]
    : ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh", "Comilla", "Gazipur", "Narayanganj", "Savar"];

  const floatingCities = language === "bn"
    ? [
        { city: "ঢাকা", position: "top-8 left-1/4", delay: 0 },
        { city: "চট্টগ্রাম", position: "top-1/4 right-8", delay: 1 },
        { city: "সিলেট", position: "bottom-1/4 left-8", delay: 2 },
        { city: "খুলনা", position: "bottom-8 right-1/4", delay: 1.5 },
      ]
    : [
        { city: "Dhaka", position: "top-8 left-1/4", delay: 0 },
        { city: "Chittagong", position: "top-1/4 right-8", delay: 1 },
        { city: "Sylhet", position: "bottom-1/4 left-8", delay: 2 },
        { city: "Khulna", position: "bottom-8 right-1/4", delay: 1.5 },
      ];

  const cityVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" ref={ref}>
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${serviceAreasBg})` }}
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/95 to-background/80" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-secondary font-semibold text-sm uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              {t("serviceAreas.subtitle")}
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {t("serviceAreas.title")}
            </motion.h2>
            <motion.p 
              className="text-foreground/80 text-lg mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {t("serviceAreas.description")}
            </motion.p>

            {/* Major Cities */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {majorCities.map((city, i) => (
                <motion.div
                  key={city}
                  className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-soft border border-border/50 cursor-pointer"
                  custom={i}
                  variants={cityVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 8px 25px -8px rgba(0,0,0,0.2)",
                    borderColor: "hsl(var(--secondary))"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  >
                    <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm font-medium text-foreground truncate">
                    {city}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.p 
              className="text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <motion.span 
                className="text-secondary font-semibold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {language === "bn" ? "+৫০ টি" : "+50"}
              </motion.span> {language === "bn" ? "আরও জেলায় সেবা চলমান" : "more districts served"}
            </motion.p>
          </motion.div>

          {/* Right - Map Illustration */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="aspect-square max-w-md mx-auto">
              {/* Decorative circles representing service coverage */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/30" />
              </motion.div>
              <motion.div 
                className="absolute inset-8 flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/40" />
              </motion.div>
              <motion.div 
                className="absolute inset-16 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/50" />
              </motion.div>
              
              {/* Center Logo */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <motion.div 
                  className="w-32 h-32 hero-gradient rounded-full flex items-center justify-center shadow-elevated"
                  whileHover={{ scale: 1.1 }}
                  animate={{ 
                    boxShadow: [
                      "0 20px 50px -15px rgba(0,0,0,0.2)",
                      "0 25px 60px -15px rgba(0,0,0,0.3)",
                      "0 20px 50px -15px rgba(0,0,0,0.2)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-center text-primary-foreground">
                    <motion.div 
                      className="text-3xl font-bold"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8 }}
                    >
                      {language === "bn" ? "৬৪" : "64"}
                    </motion.div>
                    <div className="text-sm">{language === "bn" ? "জেলা" : "Districts"}</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating City Markers */}
              {floatingCities.map((item, i) => (
                <motion.div 
                  key={item.city}
                  className={`absolute ${item.position} bg-card shadow-card px-3 py-2 rounded-lg border border-border/50`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -8, 0]
                  } : {}}
                  transition={{ 
                    opacity: { delay: 0.6 + i * 0.1 },
                    scale: { delay: 0.6 + i * 0.1, type: "spring" },
                    y: { duration: 3, repeat: Infinity, delay: item.delay }
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-sm font-medium text-foreground">{item.city}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
