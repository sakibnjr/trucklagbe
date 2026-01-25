import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Import vehicle images
import truckImage from "@/assets/vehicles/truck.jpg";
import pickupImage from "@/assets/vehicles/pickup.jpg";
import pickupVanImage from "@/assets/vehicles/pickup-van.jpg";
import privateCarImage from "@/assets/vehicles/private-car.jpg";
import hiaceImage from "@/assets/vehicles/hiace.jpg";

const vehicles = [
  {
    id: "truck",
    name: "ট্রাক",
    description: "ভারী মালামাল পরিবহনের জন্য আদর্শ। বড় আকারের সব ধরনের পণ্য বহনে সক্ষম।",
    capacity: "৫-১০ টন",
    image: truckImage,
    features: ["বড় মালামাল", "ফার্নিচার", "নির্মাণ সামগ্রী"],
  },
  {
    id: "pickup",
    name: "পিকআপ",
    description: "মাঝারি আকারের মালামাল পরিবহনে সুবিধাজনক এবং দ্রুত।",
    capacity: "১-২ টন",
    image: pickupImage,
    features: ["ছোট মালামাল", "বাসা বদল", "অফিস সামগ্রী"],
  },
  {
    id: "pickup-van",
    name: "পিকআপ ভ্যান",
    description: "কভার্ড ভ্যান - বৃষ্টি বা রোদে আপনার মালামাল সুরক্ষিত।",
    capacity: "১-১.৫ টন",
    image: pickupVanImage,
    features: ["ইলেকট্রনিক্স", "সংবেদনশীল পণ্য", "খাদ্যদ্রব্য"],
  },
  {
    id: "private-car",
    name: "প্রাইভেট কার",
    description: "আরামদায়ক ব্যক্তিগত ভ্রমণের জন্য এসি গাড়ি।",
    capacity: "৪-৫ জন",
    image: privateCarImage,
    features: ["শহরের ভেতরে", "এয়ারপোর্ট পিক", "ট্যুর"],
  },
  {
    id: "hiace",
    name: "হায়েস",
    description: "দলগত ভ্রমণ বা বেশি যাত্রী বহনে আদর্শ মাইক্রোবাস।",
    capacity: "১০-১৫ জন",
    image: hiaceImage,
    features: ["গ্রুপ ট্রাভেল", "বিয়ে বাড়ি", "পিকনিক"],
  },
];

const VehiclesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5 }
    },
  };

  return (
    <section id="vehicles" className="py-20 md:py-28 bg-muted/50" ref={ref}>
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
            আমাদের যানবাহন
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            আপনার প্রয়োজন অনুযায়ী বেছে নিন
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            ট্রাক থেকে প্রাইভেট কার - সব ধরনের যানবাহন এক জায়গায়
          </motion.p>
        </motion.div>

        {/* Vehicles Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 border border-transparent hover:border-secondary/20"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              {/* Vehicle Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                
                {/* Capacity Badge on Image */}
                <motion.div 
                  className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-bold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  {vehicle.capacity}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {vehicle.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {vehicle.features.map((feature, i) => (
                    <motion.span
                      key={feature}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>

                {/* CTA */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    বুক করুন
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VehiclesSection;
