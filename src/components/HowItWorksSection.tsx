import { Search, CalendarCheck, Truck, ThumbsUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    icon: Search,
    title: "যানবাহন খুঁজুন",
    description: "আপনার প্রয়োজন অনুযায়ী ট্রাক, পিকআপ বা গাড়ি নির্বাচন করুন।",
    step: "০১",
  },
  {
    icon: CalendarCheck,
    title: "বুকিং দিন",
    description: "পিকআপ ও ডেলিভারি পয়েন্ট এবং সময়কাল নির্ধারণ করে বুক করুন।",
    step: "০২",
  },
  {
    icon: Truck,
    title: "যানবাহন আসবে",
    description: "নির্ধারিত সময়ে ড্রাইভার সহ যানবাহন আপনার কাছে পৌঁছে যাবে।",
    step: "০৩",
  },
  {
    icon: ThumbsUp,
    title: "কাজ সম্পন্ন",
    description: "নিরাপদে মালামাল পৌঁছে দিয়ে পেমেন্ট করুন। ব্যস, এতটাই সহজ!",
    step: "০৪",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background" ref={ref}>
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
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            কিভাবে কাজ করে
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            মাত্র ৪টি সহজ ধাপে
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            জটিলতা ছাড়াই দ্রুত ও সহজে যানবাহন ভাড়া নিন
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
                {step.title}
              </motion.h3>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.15 }}
              >
                {step.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
