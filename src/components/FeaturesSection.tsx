import { Shield, Clock, Wallet, Headphones, MapPin, Users } from "lucide-react";

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
  return (
    <section id="services" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            কেন আমরা সেরা
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            ট্রাকলাগবে কেন বেছে নেবেন?
          </h2>
          <p className="text-muted-foreground text-lg">
            আপনার পরিবহন অভিজ্ঞতাকে সহজ ও আনন্দদায়ক করতে আমরা প্রতিশ্রুতিবদ্ধ
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-secondary/20"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:accent-gradient transition-all">
                <feature.icon className="w-7 h-7 text-secondary group-hover:text-accent-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
