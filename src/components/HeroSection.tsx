import { MapPin, Calendar, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const vehicleTypes = [
    { value: "truck", label: "ট্রাক" },
    { value: "pickup", label: "পিকআপ" },
    { value: "pickup-van", label: "পিকআপ ভ্যান" },
    { value: "private-car", label: "প্রাইভেট কার" },
    { value: "hiace", label: "হায়েস" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm font-medium">বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রান্সপোর্ট সার্ভিস</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              যেকোনো জায়গায়<br />
              <span className="text-secondary">ট্রাক বা গাড়ি</span><br />
              ভাড়া নিন সহজে
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl">
              ট্রাক, পিকআপ, প্রাইভেট কার বা হায়েস - যা প্রয়োজন তা বুক করুন মিনিটের মধ্যে। সারাদেশে দ্রুত ও নিরাপদ পরিবহন সেবা।
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" variant="hero">
                এখনই বুক করুন
              </Button>
              <Button size="lg" variant="hero-outline">
                আমাদের সম্পর্কে
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-primary-foreground/20">
              <div>
                <div className="text-3xl font-bold">১০,০০০+</div>
                <div className="text-primary-foreground/70 text-sm">সন্তুষ্ট গ্রাহক</div>
              </div>
              <div>
                <div className="text-3xl font-bold">৫০০+</div>
                <div className="text-primary-foreground/70 text-sm">যানবাহন</div>
              </div>
              <div>
                <div className="text-3xl font-bold">৬৪</div>
                <div className="text-primary-foreground/70 text-sm">জেলায় সেবা</div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated animate-slide-up">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              এখনই বুকিং করুন
            </h2>
            
            <form className="space-y-5">
              {/* Vehicle Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Truck className="w-4 h-4 text-secondary" />
                  যানবাহনের ধরন
                </label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="যানবাহন নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  পিকআপ পয়েন্ট
                </label>
                <Input 
                  placeholder="কোথা থেকে তুলবেন?" 
                  className="h-12"
                />
              </div>

              {/* Delivery Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  ডেলিভারি পয়েন্ট
                </label>
                <Input 
                  placeholder="কোথায় পৌঁছাবেন?" 
                  className="h-12"
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  কতদিনের জন্য
                </label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">১ দিন</SelectItem>
                    <SelectItem value="2">২ দিন</SelectItem>
                    <SelectItem value="3">৩ দিন</SelectItem>
                    <SelectItem value="7">১ সপ্তাহ</SelectItem>
                    <SelectItem value="15">১৫ দিন</SelectItem>
                    <SelectItem value="30">১ মাস</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" variant="secondary" size="lg" className="w-full">
                ভাড়া দেখুন
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
