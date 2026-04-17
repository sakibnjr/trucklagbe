import { Search, CalendarCheck, Truck, ThumbsUp, LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_CONTENT_CLASS } from "@/lib/layout";

interface Step {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  step: string;
}

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const steps: Step[] = [
    {
      icon: Search,
      titleKey: "howItWorks.step1.title",
      descKey: "howItWorks.step1.desc",
      step: language === "bn" ? "০১" : "01",
    },
    {
      icon: CalendarCheck,
      titleKey: "howItWorks.step2.title",
      descKey: "howItWorks.step2.desc",
      step: language === "bn" ? "০২" : "02",
    },
    {
      icon: Truck,
      titleKey: "howItWorks.step3.title",
      descKey: "howItWorks.step3.desc",
      step: language === "bn" ? "০৩" : "03",
    },
    {
      icon: ThumbsUp,
      titleKey: "howItWorks.step4.title",
      descKey: "howItWorks.step4.desc",
      step: language === "bn" ? "০৪" : "04",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background" ref={ref}>
      <div className={SITE_CONTENT_CLASS}>
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-secondary font-semibold text-sm uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t("howItWorks.subtitle")}
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t("howItWorks.title")}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {t("howItWorks.description")}
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative text-center group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-secondary/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
                  style={{ originX: 0 }}
                />
              )}

              {/* Step Number */}
              <motion.div 
                className="relative inline-flex"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center mb-6 shadow-card"
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)"
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <step.icon className="w-9 h-9 text-primary-foreground" />
                </motion.div>
                <motion.span 
                  className="absolute -top-2 -right-2 w-8 h-8 accent-gradient rounded-full flex items-center justify-center text-sm font-bold text-accent-foreground shadow-soft"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 200 }}
                >
                  {step.step}
                </motion.span>
              </motion.div>

              {/* Content */}
              <motion.h3 
                className="text-xl font-bold text-foreground mb-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.15 }}
              >
                {t(step.titleKey)}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.15 }}
              >
                {t(step.descKey)}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
