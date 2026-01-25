import { MapPin, Calendar, Truck, ArrowRight, Clock, CalendarIcon, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

type VehicleType = 'truck' | 'pickup' | 'pickup-van' | 'private-car' | 'hiace';

const HeroSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType | "">("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [pickupDate, setPickupDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const vehicleTypes = [
    { value: "truck" as VehicleType, label: "ট্রাক" },
    { value: "pickup" as VehicleType, label: "পিকআপ" },
    { value: "pickup-van" as VehicleType, label: "পিকআপ ভ্যান" },
    { value: "private-car" as VehicleType, label: "প্রাইভেট কার" },
    { value: "hiace" as VehicleType, label: "হায়েস" },
  ];

  const timeSlots = [
    { value: "06:00", label: "সকাল ৬:০০" },
    { value: "07:00", label: "সকাল ৭:০০" },
    { value: "08:00", label: "সকাল ৮:০০" },
    { value: "09:00", label: "সকাল ৯:০০" },
    { value: "10:00", label: "সকাল ১০:০০" },
    { value: "11:00", label: "সকাল ১১:০০" },
    { value: "12:00", label: "দুপুর ১২:০০" },
    { value: "13:00", label: "দুপুর ১:০০" },
    { value: "14:00", label: "দুপুর ২:০০" },
    { value: "15:00", label: "বিকাল ৩:০০" },
    { value: "16:00", label: "বিকাল ৪:০০" },
    { value: "17:00", label: "বিকাল ৫:০০" },
    { value: "18:00", label: "সন্ধ্যা ৬:০০" },
    { value: "19:00", label: "সন্ধ্যা ৭:০০" },
    { value: "20:00", label: "রাত ৮:০০" },
    { value: "21:00", label: "রাত ৯:০০" },
  ];

  const durationOptions = [
    { value: "1", label: "১ দিন" },
    { value: "2", label: "২ দিন" },
    { value: "3", label: "৩ দিন" },
    { value: "7", label: "১ সপ্তাহ" },
    { value: "15", label: "১৫ দিন" },
    { value: "30", label: "১ মাস" },
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

  // Format date in Bengali
  const formatDateBengali = (date: Date) => {
    const day = date.getDate().toLocaleString('bn-BD');
    const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const month = months[date.getMonth()];
    const year = date.getFullYear().toLocaleString('bn-BD').replace(/,/g, '');
    return `${day} ${month}, ${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!customerName.trim()) {
      toast({ title: "ত্রুটি", description: "আপনার নাম লিখুন", variant: "destructive" });
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 11) {
      toast({ title: "ত্রুটি", description: "সঠিক মোবাইল নম্বর লিখুন", variant: "destructive" });
      return;
    }
    if (!vehicleType) {
      toast({ title: "ত্রুটি", description: "যানবাহন নির্বাচন করুন", variant: "destructive" });
      return;
    }
    if (!pickupLocation.trim()) {
      toast({ title: "ত্রুটি", description: "পিকআপ পয়েন্ট লিখুন", variant: "destructive" });
      return;
    }
    if (!deliveryLocation.trim()) {
      toast({ title: "ত্রুটি", description: "ডেলিভারি পয়েন্ট লিখুন", variant: "destructive" });
      return;
    }
    if (!pickupDate) {
      toast({ title: "ত্রুটি", description: "তারিখ নির্বাচন করুন", variant: "destructive" });
      return;
    }
    if (!pickupTime) {
      toast({ title: "ত্রুটি", description: "সময় নির্বাচন করুন", variant: "destructive" });
      return;
    }
    if (!duration) {
      toast({ title: "ত্রুটি", description: "সময়কাল নির্বাচন করুন", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('bookings').insert({
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        vehicle_type: vehicleType,
        pickup_location: pickupLocation.trim(),
        delivery_location: deliveryLocation.trim(),
        pickup_date: pickupDate.toISOString().split('T')[0],
        pickup_time: pickupTime + ':00',
        duration_days: parseInt(duration),
      });

      if (error) throw error;

      toast({
        title: "সফল! ✅",
        description: "আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      });

      // Reset form
      setCustomerName("");
      setCustomerPhone("");
      setVehicleType("");
      setPickupLocation("");
      setDeliveryLocation("");
      setPickupDate(undefined);
      setPickupTime("");
      setDuration("");

    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "ত্রুটি",
        description: "বুকিং করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Customer Name & Phone Row */}
              <motion.div 
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 }}
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary" />
                    আপনার নাম
                  </label>
                  <Input 
                    placeholder="নাম লিখুন" 
                    className="h-12" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-secondary" />
                    মোবাইল নম্বর
                  </label>
                  <Input 
                    placeholder="01XXXXXXXXX" 
                    className="h-12" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Vehicle Type */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Truck className="w-4 h-4 text-secondary" />
                  যানবাহনের ধরন
                </label>
                <Select value={vehicleType} onValueChange={(value: VehicleType) => setVehicleType(value)}>
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
              </motion.div>

              {/* Pickup Location */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  পিকআপ পয়েন্ট
                </label>
                <Input 
                  placeholder="কোথা থেকে তুলবেন?" 
                  className="h-12" 
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </motion.div>

              {/* Delivery Location */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
              >
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  ডেলিভারি পয়েন্ট
                </label>
                <Input 
                  placeholder="কোথায় পৌঁছাবেন?" 
                  className="h-12" 
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                />
              </motion.div>

              {/* Date and Time Row */}
              <motion.div 
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-secondary" />
                    তারিখ
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? formatDateBengali(pickupDate) : "তারিখ নির্বাচন"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Picker */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" />
                    সময়
                  </label>
                  <Select value={pickupTime} onValueChange={setPickupTime}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="সময় নির্বাচন" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>

              {/* Duration */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  কতদিনের জন্য
                </label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  variant="secondary" 
                  size="lg" 
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "বুকিং হচ্ছে..." : "বুকিং করুন"}
                  {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
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
