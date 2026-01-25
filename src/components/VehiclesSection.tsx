import { Truck, Car, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";

const vehicles = [
  {
    id: "truck",
    name: "ট্রাক",
    description: "ভারী মালামাল পরিবহনের জন্য আদর্শ। বড় আকারের সব ধরনের পণ্য বহনে সক্ষম।",
    capacity: "৫-১০ টন",
    icon: Truck,
    features: ["বড় মালামাল", "ফার্নিচার", "নির্মাণ সামগ্রী"],
  },
  {
    id: "pickup",
    name: "পিকআপ",
    description: "মাঝারি আকারের মালামাল পরিবহনে সুবিধাজনক এবং দ্রুত।",
    capacity: "১-২ টন",
    icon: Truck,
    features: ["ছোট মালামাল", "বাসা বদল", "অফিস সামগ্রী"],
  },
  {
    id: "pickup-van",
    name: "পিকআপ ভ্যান",
    description: "কভার্ড ভ্যান - বৃষ্টি বা রোদে আপনার মালামাল সুরক্ষিত।",
    capacity: "১-১.৫ টন",
    icon: Truck,
    features: ["ইলেকট্রনিক্স", "সংবেদনশীল পণ্য", "খাদ্যদ্রব্য"],
  },
  {
    id: "private-car",
    name: "প্রাইভেট কার",
    description: "আরামদায়ক ব্যক্তিগত ভ্রমণের জন্য এসি গাড়ি।",
    capacity: "৪-৫ জন",
    icon: Car,
    features: ["শহরের ভেতরে", "এয়ারপোর্ট পিক", "ট্যুর"],
  },
  {
    id: "hiace",
    name: "হায়েস",
    description: "দলগত ভ্রমণ বা বেশি যাত্রী বহনে আদর্শ মাইক্রোবাস।",
    capacity: "১০-১৫ জন",
    icon: Bus,
    features: ["গ্রুপ ট্রাভেল", "বিয়ে বাড়ি", "পিকনিক"],
  },
];

const VehiclesSection = () => {
  return (
    <section id="vehicles" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            আমাদের যানবাহন
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            আপনার প্রয়োজন অনুযায়ী বেছে নিন
          </h2>
          <p className="text-muted-foreground text-lg">
            ট্রাক থেকে প্রাইভেট কার - সব ধরনের যানবাহন এক জায়গায়
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <vehicle.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {vehicle.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {vehicle.description}
              </p>

              {/* Capacity Badge */}
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium mb-4">
                ধারণক্ষমতা: {vehicle.capacity}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-5">
                {vehicle.features.map((feature) => (
                  <span
                    key={feature}
                    className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Button variant="outline" className="w-full">
                বুক করুন
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehiclesSection;
