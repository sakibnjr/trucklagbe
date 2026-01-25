import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import ctaBg from "@/assets/cta-bg.jpg";

const CTASection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/85" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container relative text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          এখনই শুরু করুন!
        </h2>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
          পরিবহনের ঝামেলা থেকে মুক্তি পান। এখনই ট্রাকলাগবে-তে বুকিং দিন 
          অথবা সরাসরি কল করুন।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="hero">
            বুকিং করুন
          </Button>
          <Button size="lg" variant="hero-outline" className="gap-2">
            <Phone className="w-5 h-5" />
            <span>০১৭XX-XXXXXX</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
