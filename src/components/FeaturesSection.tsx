import { Shield, Clock, Wallet, Headphones, MapPin, Users, LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_CONTENT_CLASS } from "@/lib/layout";

interface Feature {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      icon: Shield,
      titleKey: "features.safety.title",
      descKey: "features.safety.desc",
    },
    {
      icon: Clock,
      titleKey: "features.time.title",
      descKey: "features.time.desc",
    },
    {
      icon: Wallet,
      titleKey: "features.price.title",
      descKey: "features.price.desc",
    },
    {
      icon: Headphones,
      titleKey: "features.support.title",
      descKey: "features.support.desc",
    },
    {
      icon: MapPin,
      titleKey: "features.nationwide.title",
      descKey: "features.nationwide.desc",
    },
    {
      icon: Users,
      titleKey: "features.drivers.title",
      descKey: "features.drivers.desc",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-muted/50" ref={ref}>
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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t("features.subtitle")}
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t("features.title")}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {t("features.description")}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.titleKey}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-secondary/20 relative overflow-hidden"
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Background Glow on Hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Icon */}
              <motion.div 
                className="relative w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:accent-gradient transition-all duration-300"
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  scale: 1.1
                }}
                transition={{ duration: 0.4 }}
              >
                <feature.icon className="w-7 h-7 text-secondary group-hover:text-accent-foreground transition-colors duration-300" />
              </motion.div>

              {/* Content */}
              <h3 className="relative text-xl font-bold text-foreground mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="relative text-muted-foreground leading-relaxed">
                {t(feature.descKey)}
              </p>

              {/* Animated Border */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary to-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
