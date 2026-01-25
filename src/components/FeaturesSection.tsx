import { Shield, Clock, Wallet, Headphones, MapPin, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Shield,
    title: "নিরাপদ পরিবহন",
    description: "অভিজ্ঞ ড্রাইভার ও বীমাকৃত যানবাহনে আপনার মালামাল সম্পূর্ণ নিরাপদ।",
  },
  {
    icon: Clock,
    title: "সময়মতো ডেলিভারি",
    description: "আমরা সময়ের মূল্য বুঝি। নির্ধারিত সময়ে ডেলিভারি নিশ্চিত করি।",
  },
  {
    icon: Wallet,
    title: "সাশ্রয়ী মূল্য",
    description: "বাজারের সবচেয়ে প্রতিযোগিতামূলক মূল্যে সেরা সেবা পাচ্ছেন।",
  },
  {
    icon: Headphones,
    title: "২৪/৭ সাপোর্ট",
    description: "যেকোনো সমস্যায় আমাদের কাস্টমার কেয়ার টিম সর্বদা আপনার পাশে।",
  },
  {
    icon: MapPin,
    title: "সারাদেশে সেবা",
    description: "বাংলাদেশের ৬৪ জেলায় আমাদের বিস্তৃত নেটওয়ার্ক রয়েছে।",
  },
  {
    icon: Users,
    title: "অভিজ্ঞ ড্রাইভার",
    description: "প্রশিক্ষিত ও যাচাইকৃত ড্রাইভারদের সাথে নিশ্চিন্তে ভ্রমণ করুন।",
  },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      <div className="container">
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
            কেন আমরা সেরা
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            ট্রাকলাগবে কেন বেছে নেবেন?
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            আপনার পরিবহন অভিজ্ঞতাকে সহজ ও আনন্দদায়ক করতে আমরা প্রতিশ্রুতিবদ্ধ
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                {feature.title}
              </h3>
              <p className="relative text-muted-foreground leading-relaxed">
                {feature.description}
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
