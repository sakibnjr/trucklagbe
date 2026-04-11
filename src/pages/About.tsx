import { motion } from "framer-motion";
import { Truck, Shield, Clock, Users, MapPin, Award, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const About = () => {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stats = language === "bn"
    ? [
        { value: "১০,০০০+", label: "সন্তুষ্ট গ্রাহক" },
        { value: "৫০০+", label: "যানবাহন" },
        { value: "৬৪", label: "জেলায় সেবা" },
        { value: "৫+", label: "বছরের অভিজ্ঞতা" },
      ]
    : [
        { value: "10,000+", label: "Happy Customers" },
        { value: "500+", label: "Vehicles" },
        { value: "64", label: "Districts Served" },
        { value: "5+", label: "Years of Experience" },
      ];

  const values = language === "bn"
    ? [
        { icon: Shield, title: "নিরাপত্তা", desc: "আপনার মালামালের নিরাপত্তা আমাদের প্রথম অগ্রাধিকার।" },
        { icon: Clock, title: "সময়ানুবর্তিতা", desc: "সময়মতো ডেলিভারি নিশ্চিত করি সবসময়।" },
        { icon: Users, title: "গ্রাহক সেবা", desc: "২৪/৭ গ্রাহক সেবা দিতে প্রতিশ্রুতিবদ্ধ।" },
        { icon: Award, title: "মান নিশ্চয়তা", desc: "সেরা মানের সেবা প্রদানে অঙ্গীকারবদ্ধ।" },
      ]
    : [
        { icon: Shield, title: "Safety", desc: "Your cargo's safety is our top priority." },
        { icon: Clock, title: "Punctuality", desc: "We ensure on-time delivery always." },
        { icon: Users, title: "Customer Service", desc: "Committed to 24/7 customer support." },
        { icon: Award, title: "Quality Assurance", desc: "Pledged to provide the best quality service." },
      ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground"
          >
            <Link to="/">
              <Button variant="ghost" className="mb-6 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "bn" ? "হোম পেজে ফিরুন" : "Back to Home"}
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {language === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              {language === "bn" 
                ? "বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রান্সপোর্ট সার্ভিস - আমারট্রাক আপনার পরিবহন সমস্যার সমাধান।"
                : "AmarTruck - Bangladesh's most trusted transport service, solving all your transportation needs."
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
                {language === "bn" ? "আমাদের গল্প" : "Our Story"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
                {language === "bn" 
                  ? "বিশ্বাসযোগ্য পরিবহন সেবার যাত্রা"
                  : "A Journey of Trusted Transport Service"
                }
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {language === "bn"
                    ? "আমারট্রাক শুরু হয়েছিল একটি সহজ লক্ষ্য নিয়ে - বাংলাদেশের মানুষদের জন্য পরিবহন সেবাকে সহজ ও নির্ভরযোগ্য করা। আমরা বুঝতে পেরেছিলাম যে মালামাল পরিবহন করতে গিয়ে মানুষ কত সমস্যার সম্মুখীন হয়।"
                    : "AmarTruck started with a simple goal - to make transportation services easy and reliable for the people of Bangladesh. We understood the challenges people face when transporting their goods."
                  }
                </p>
                <p>
                  {language === "bn"
                    ? "আজ আমরা গর্বিত যে সারাদেশে ১০,০০০+ সন্তুষ্ট গ্রাহককে সেবা দিতে পেরেছি। আমাদের ৫০০+ যানবাহন এবং অভিজ্ঞ ড্রাইভার টিম প্রতিদিন হাজার হাজার মালামাল নিরাপদে গন্তব্যে পৌঁছে দিচ্ছে।"
                    : "Today we are proud to have served over 10,000+ satisfied customers across the country. Our 500+ vehicles and experienced driver team safely deliver thousands of goods to their destinations every day."
                  }
                </p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center">
                    <Truck className="w-10 h-10 text-primary-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-semibold text-sm uppercase tracking-wide">
              {language === "bn" ? "আমাদের মূল্যবোধ" : "Our Values"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
              {language === "bn" ? "যা আমাদের অনন্য করে" : "What Makes Us Unique"}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-xl p-6 border border-border shadow-soft hover:shadow-card transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mb-6">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-semibold">
                {language === "bn" ? "সারাদেশে সেবা" : "Nationwide Coverage"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {language === "bn" 
                ? "বাংলাদেশের ৬৪ জেলায় আমাদের সেবা"
                : "Our Service Across All 64 Districts of Bangladesh"
              }
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {language === "bn"
                ? "ঢাকা থেকে চট্টগ্রাম, সিলেট থেকে খুলনা - যেখানেই আপনি থাকুন, আমরা আছি আপনার পাশে।"
                : "From Dhaka to Chittagong, Sylhet to Khulna - wherever you are, we are there for you."
              }
            </p>
            <Link to="/">
              <Button size="lg" variant="secondary">
                {language === "bn" ? "এখনই বুকিং করুন" : "Book Now"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
