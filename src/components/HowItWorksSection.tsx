import { Search, CalendarCheck, Truck, ThumbsUp } from "lucide-react";

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
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            কিভাবে কাজ করে
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            মাত্র ৪টি সহজ ধাপে
          </h2>
          <p className="text-muted-foreground text-lg">
            জটিলতা ছাড়াই দ্রুত ও সহজে যানবাহন ভাড়া নিন
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-secondary/50 to-transparent" />
              )}

              {/* Step Number */}
              <div className="relative inline-flex">
                <div className="w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-card">
                  <step.icon className="w-9 h-9 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 accent-gradient rounded-full flex items-center justify-center text-sm font-bold text-accent-foreground shadow-soft">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
