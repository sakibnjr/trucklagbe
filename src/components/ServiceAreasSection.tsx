import { MapPin } from "lucide-react";
import serviceAreasBg from "@/assets/service-areas-bg.jpg";

const majorCities = [
  "ঢাকা",
  "চট্টগ্রাম",
  "সিলেট",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "রংপুর",
  "ময়মনসিংহ",
  "কুমিল্লা",
  "গাজীপুর",
  "নারায়ণগঞ্জ",
  "সাভার",
];

const ServiceAreasSection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${serviceAreasBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/98 via-background/95 to-background/80" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              সেবা এলাকা
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              সারা বাংলাদেশে আমাদের সেবা
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              ঢাকা থেকে চট্টগ্রাম, সিলেট থেকে খুলনা - দেশের যেকোনো প্রান্তে আমরা আছি। 
              ৬৪ জেলার প্রতিটিতে আমাদের বিশ্বস্ত নেটওয়ার্ক রয়েছে।
            </p>

            {/* Major Cities */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {majorCities.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-soft border border-border/50"
                >
                  <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {city}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <p className="text-muted-foreground mt-6">
              <span className="text-secondary font-semibold">+৫০ টি</span> আরও জেলায় সেবা চলমান
            </p>
          </div>

          {/* Right - Map Illustration */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto">
              {/* Decorative circles representing service coverage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/30 animate-pulse-slow" />
              </div>
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/40" />
              </div>
              <div className="absolute inset-16 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-2 border-dashed border-secondary/50" />
              </div>
              
              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 hero-gradient rounded-full flex items-center justify-center shadow-elevated">
                  <div className="text-center text-primary-foreground">
                    <div className="text-3xl font-bold">৬৪</div>
                    <div className="text-sm">জেলা</div>
                  </div>
                </div>
              </div>

              {/* Floating City Markers */}
              <div className="absolute top-8 left-1/4 bg-card shadow-card px-3 py-2 rounded-lg animate-float border border-border/50">
                <span className="text-sm font-medium text-foreground">ঢাকা</span>
              </div>
              <div className="absolute top-1/4 right-8 bg-card shadow-card px-3 py-2 rounded-lg animate-float border border-border/50" style={{ animationDelay: "1s" }}>
                <span className="text-sm font-medium text-foreground">চট্টগ্রাম</span>
              </div>
              <div className="absolute bottom-1/4 left-8 bg-card shadow-card px-3 py-2 rounded-lg animate-float border border-border/50" style={{ animationDelay: "2s" }}>
                <span className="text-sm font-medium text-foreground">সিলেট</span>
              </div>
              <div className="absolute bottom-8 right-1/4 bg-card shadow-card px-3 py-2 rounded-lg animate-float border border-border/50" style={{ animationDelay: "1.5s" }}>
                <span className="text-sm font-medium text-foreground">খুলনা</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
