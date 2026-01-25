import { MapPin, Calendar, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const vehicleTypes = [
    { value: "truck", label: "ট্রাক" },
    { value: "pickup", label: "পিকআপ" },
    { value: "pickup-van", label: "পিকআপ ভ্যান" },
    { value: "private-car", label: "প্রাইভেট কার" },
    { value: "hiace", label: "হায়েস" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />

      {/* Animated Truck Icon */}
      <div className="absolute bottom-32 left-0 overflow-hidden w-full pointer-events-none opacity-10">
        <motion.div
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Truck className="w-24 h-24 text-primary-foreground" />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-primary-foreground space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20"
              variants={itemVariants}
            >
              <motion.span 
                className="w-2 h-2 bg-secondary rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium">বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রান্সপোর্ট সার্ভিস</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={itemVariants}
            >
              যেকোনো জায়গায়<br />
              <motion.span 
                className="text-secondary inline-block"
                animate={{ 
                  textShadow: ["0 0 20px rgba(249,115,22,0)", "0 0 20px rgba(249,115,22,0.5)", "0 0 20px rgba(249,115,22,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ট্রাক বা গাড়ি
              </motion.span><br />
              ভাড়া নিন সহজে
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-primary-foreground/80 max-w-xl"
              variants={itemVariants}
            >
              ট্রাক, পিকআপ, প্রাইভেট কার বা হায়েস - যা প্রয়োজন তা বুক করুন মিনিটের মধ্যে। সারাদেশে দ্রুত ও নিরাপদ পরিবহন সেবা।
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="hero" className="group">
                  এখনই বুক করুন
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="hero-outline">
                  আমাদের সম্পর্কে
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-8 pt-8 border-t border-primary-foreground/20"
              variants={itemVariants}
            >
              {[
                { value: "১০,০০০+", label: "সন্তুষ্ট গ্রাহক" },
                { value: "৫০০+", label: "যানবাহন" },
                { value: "৬৪", label: "জেলায় সেবা" },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  variants={statVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Booking Form */}
          <motion.div 
            className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated"
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.3)" }}
          >
            <motion.h2 
              className="text-2xl font-bold text-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              এখনই বুকিং করুন
            </motion.h2>
            
            <form className="space-y-5">
              {[
                { icon: Truck, label: "যানবাহনের ধরন", isSelect: true, options: vehicleTypes, placeholder: "যানবাহন নির্বাচন করুন" },
                { icon: MapPin, label: "পিকআপ পয়েন্ট", isSelect: false, placeholder: "কোথা থেকে তুলবেন?" },
                { icon: MapPin, label: "ডেলিভারি পয়েন্ট", isSelect: false, placeholder: "কোথায় পৌঁছাবেন?" },
                { icon: Calendar, label: "কতদিনের জন্য", isSelect: true, options: [
                  { value: "1", label: "১ দিন" },
                  { value: "2", label: "২ দিন" },
                  { value: "3", label: "৩ দিন" },
                  { value: "7", label: "১ সপ্তাহ" },
                  { value: "15", label: "১৫ দিন" },
                  { value: "30", label: "১ মাস" },
                ], placeholder: "সময়কাল নির্বাচন করুন" },
              ].map((field, index) => (
                <motion.div 
                  key={field.label}
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <field.icon className="w-4 h-4 text-secondary" />
                    {field.label}
                  </label>
                  {field.isSelect ? (
                    <Select>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input placeholder={field.placeholder} className="h-12" />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" variant="secondary" size="lg" className="w-full group">
                  ভাড়া দেখুন
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
