import { MapPin, Calendar, Truck, ArrowRight, Clock, CalendarIcon, User, Phone, Ruler, ChevronLeft } from "lucide-react";
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
import { useState, useRef, useEffect } from "react";
import { cn, isValidBdMobile11, normalizeBdMobileDigits, formatPickupTimeDisplay } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBooking } from "@/contexts/BookingContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

type VehicleType = 'truck' | 'pickup' | 'pickup-van' | 'private-car' | 'hiace';

const HeroSection = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const { selectedVehicle, setBookingFormRef } = useBooking();
  const isMobileLayout = useIsMobile();
  const [mobileStep, setMobileStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bookingFormRef = useRef<HTMLDivElement>(null);
  
  // Register the booking form ref
  useEffect(() => {
    setBookingFormRef(bookingFormRef);
  }, [setBookingFormRef]);
  
  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType | "">("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [pickupDate, setPickupDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState<string>("");
  const [vehicleSize, setVehicleSize] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  // Update vehicle type when selected from vehicles section
  useEffect(() => {
    if (selectedVehicle) {
      setVehicleType(selectedVehicle);
    }
  }, [selectedVehicle]);

  const vehicleTypes = language === "bn" 
    ? [
        { value: "truck" as VehicleType, label: "ট্রাক" },
        { value: "pickup" as VehicleType, label: "পিকআপ" },
        { value: "pickup-van" as VehicleType, label: "পিকআপ ভ্যান" },
        { value: "private-car" as VehicleType, label: "প্রাইভেট কার" },
        { value: "hiace" as VehicleType, label: "হায়েস" },
      ]
    : [
        { value: "truck" as VehicleType, label: "Truck" },
        { value: "pickup" as VehicleType, label: "Pickup" },
        { value: "pickup-van" as VehicleType, label: "Pickup Van" },
        { value: "private-car" as VehicleType, label: "Private Car" },
        { value: "hiace" as VehicleType, label: "Hiace" },
      ];

  const vehicleSizeOptions = language === "bn"
    ? [
        { value: "7", label: "৭ ফুট" },
        { value: "9", label: "৯ ফুট" },
        { value: "12", label: "১২ ফুট" },
        { value: "14", label: "১৪ ফুট" },
        { value: "16", label: "১৬ ফুট" },
        { value: "18", label: "১৮ ফুট" },
        { value: "23", label: "২৩ ফুট" },
      ]
    : [
        { value: "7", label: "7 Feet" },
        { value: "9", label: "9 Feet" },
        { value: "12", label: "12 Feet" },
        { value: "14", label: "14 Feet" },
        { value: "16", label: "16 Feet" },
        { value: "18", label: "18 Feet" },
        { value: "23", label: "23 Feet" },
      ];

  const durationOptions = language === "bn"
    ? [
        { value: "1", label: "১ দিন" },
        { value: "2", label: "২ দিন" },
        { value: "3", label: "৩ দিন" },
        { value: "7", label: "১ সপ্তাহ" },
        { value: "15", label: "১৫ দিন" },
        { value: "30", label: "১ মাস" },
      ]
    : [
        { value: "1", label: "1 Day" },
        { value: "2", label: "2 Days" },
        { value: "3", label: "3 Days" },
        { value: "7", label: "1 Week" },
        { value: "15", label: "15 Days" },
        { value: "30", label: "1 Month" },
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

  // Format date based on language
  const formatDate = (date: Date) => {
    if (language === "bn") {
      const day = date.getDate().toLocaleString('bn-BD');
      const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
      const month = months[date.getMonth()];
      const year = date.getFullYear().toLocaleString('bn-BD').replace(/,/g, '');
      return `${day} ${month}, ${year}`;
    } else {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  const WHATSAPP_BOOKING_NUMBER = "8801608832209";

  const validateBookingFields = (): boolean => {
    if (!customerName.trim()) {
      toast({ title: t("form.error"), description: t("form.validation.name"), variant: "destructive" });
      return false;
    }
    if (!isValidBdMobile11(customerPhone)) {
      toast({ title: t("form.error"), description: t("form.validation.phone"), variant: "destructive" });
      return false;
    }
    if (!vehicleType) {
      toast({ title: t("form.error"), description: t("form.validation.vehicle"), variant: "destructive" });
      return false;
    }
    if (!pickupLocation.trim()) {
      toast({ title: t("form.error"), description: t("form.validation.pickup"), variant: "destructive" });
      return false;
    }
    if (!deliveryLocation.trim()) {
      toast({ title: t("form.error"), description: t("form.validation.delivery"), variant: "destructive" });
      return false;
    }
    if (!pickupDate) {
      toast({ title: t("form.error"), description: t("form.validation.date"), variant: "destructive" });
      return false;
    }
    if (!pickupTime) {
      toast({ title: t("form.error"), description: t("form.validation.time"), variant: "destructive" });
      return false;
    }
    if (!duration) {
      toast({ title: t("form.error"), description: t("form.validation.duration"), variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStepOne = (): boolean => {
    if (!customerName.trim()) {
      toast({ title: t("form.error"), description: t("form.validation.name"), variant: "destructive" });
      return false;
    }
    if (!isValidBdMobile11(customerPhone)) {
      toast({ title: t("form.error"), description: t("form.validation.phone"), variant: "destructive" });
      return false;
    }
    if (!vehicleType) {
      toast({ title: t("form.error"), description: t("form.validation.vehicle"), variant: "destructive" });
      return false;
    }
    return true;
  };

  const openWhatsAppWithBooking = () => {
    if (!validateBookingFields() || !pickupDate) return;

    const vehicleLabel =
      vehicleTypes.find((v) => v.value === vehicleType)?.label ?? String(vehicleType);
    const sizeLabel = vehicleSize
      ? vehicleSizeOptions.find((o) => o.value === vehicleSize)?.label
      : undefined;
    const durationLabel =
      durationOptions.find((o) => o.value === duration)?.label ?? duration;
    const timeLabel = formatPickupTimeDisplay(pickupTime, language);

    const lines =
      language === "bn"
        ? [
            "*আমারট্রাক — বুকিং অনুরোধ*",
            "",
            `নাম: ${customerName.trim()}`,
            `মোবাইল: ${normalizeBdMobileDigits(customerPhone)}`,
            `যানবাহন: ${vehicleLabel}`,
            sizeLabel ? `গাড়ির সাইজ: ${sizeLabel}` : "",
            `পিকআপ: ${pickupLocation.trim()}`,
            `ডেলিভারি: ${deliveryLocation.trim()}`,
            `তারিখ: ${formatDate(pickupDate)}`,
            `সময়: ${timeLabel}`,
            `সময়কাল: ${durationLabel}`,
          ].filter(Boolean)
        : [
            "*AmarTruck — booking request*",
            "",
            `Name: ${customerName.trim()}`,
            `Phone: ${normalizeBdMobileDigits(customerPhone)}`,
            `Vehicle: ${vehicleLabel}`,
            sizeLabel ? `Size: ${sizeLabel}` : "",
            `Pickup: ${pickupLocation.trim()}`,
            `Delivery: ${deliveryLocation.trim()}`,
            `Date: ${formatDate(pickupDate)}`,
            `Time: ${timeLabel}`,
            `Duration: ${durationLabel}`,
          ].filter(Boolean);

    const text = lines.join("\n");
    const url = `https://wa.me/${WHATSAPP_BOOKING_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const submitBooking = async () => {
    if (!validateBookingFields() || !pickupDate) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('bookings').insert([{
        customer_name: customerName.trim(),
        customer_phone: normalizeBdMobileDigits(customerPhone),
        vehicle_type: vehicleType,
        pickup_location: pickupLocation.trim(),
        delivery_location: deliveryLocation.trim(),
        pickup_date: pickupDate.toISOString().split('T')[0],
        pickup_time: `${pickupTime}:00`,
        duration_days: parseInt(duration),
      }]);

      if (error) throw error;

      toast({
        title: t("form.success"),
        description: t("form.successMsg"),
      });

      setCustomerName("");
      setCustomerPhone("");
      setVehicleType("");
      setVehicleSize("");
      setPickupLocation("");
      setDeliveryLocation("");
      setPickupDate(undefined);
      setPickupTime("");
      setDuration("");
      setMobileStep(1);
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: t("form.error"),
        description: t("form.errorMsg"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMobileLayout && mobileStep === 1) {
      if (validateStepOne()) setMobileStep(2);
      return;
    }
    void submitBooking();
  };

  const stats = language === "bn"
    ? [
        { value: "১০,০০০+", label: t("hero.stats.customers") },
        { value: "৫০০+", label: t("hero.stats.vehicles") },
        { value: "৬৪", label: t("hero.stats.districts") },
      ]
    : [
        { value: "10,000+", label: t("hero.stats.customers") },
        { value: "500+", label: t("hero.stats.vehicles") },
        { value: "64", label: t("hero.stats.districts") },
      ];

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
              <span className="text-sm font-medium">{t("hero.badge")}</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={itemVariants}
            >
              {t("hero.tagline1")}<br />
              <motion.span 
                className="text-secondary inline-block"
                animate={{ 
                  textShadow: ["0 0 20px rgba(249,115,22,0)", "0 0 20px rgba(249,115,22,0.5)", "0 0 20px rgba(249,115,22,0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t("hero.tagline2")}
              </motion.span><br />
              {t("hero.tagline3")}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-primary-foreground/80 max-w-xl"
              variants={itemVariants}
            >
              {t("hero.description")}
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="hero" 
                  className="group"
                  onClick={() => bookingFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  {t("hero.bookNow")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/about">
                  <Button size="lg" variant="hero-outline">
                    {t("hero.aboutUs")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-8 pt-8 border-t border-primary-foreground/20"
              variants={itemVariants}
            >
              {stats.map((stat, index) => (
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
            ref={bookingFormRef}
            className="bg-card rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-elevated transition-all duration-300"
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.3)" }}
          >
            <motion.h2 
              className="text-xl sm:text-2xl font-bold text-foreground mb-2 md:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {t("form.title")}
            </motion.h2>

            {isMobileLayout && (
              <p
                className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground"
                role="status"
              >
                <span
                  className={cn(
                    "rounded-md px-2 py-1 transition-colors",
                    mobileStep === 1 ? "bg-secondary/15 font-medium text-foreground" : "opacity-60",
                  )}
                >
                  1 · {t("form.mobileStep1Title")}
                </span>
                <span className="text-border" aria-hidden>
                  →
                </span>
                <span
                  className={cn(
                    "rounded-md px-2 py-1 transition-colors",
                    mobileStep === 2 ? "bg-secondary/15 font-medium text-foreground" : "opacity-60",
                  )}
                >
                  2 · {t("form.mobileStep2Title")}
                </span>
              </p>
            )}
            
            <form className="space-y-3 md:space-y-4" onSubmit={handleFormSubmit}>
              {/* Step 1 — basic info (mobile); always visible on md+ */}
              <div className={cn("space-y-3 md:space-y-4", isMobileLayout && mobileStep !== 1 && "hidden")}>
              {/* Customer Name & Phone Row */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 }}
              >
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                    {t("form.name")}
                  </label>
                  <Input 
                    placeholder={t("form.namePlaceholder")}
                    className="h-10 md:h-12 text-sm" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                    {t("form.phone")}
                  </label>
                  <Input 
                    placeholder="01XXXXXXXXX" 
                    inputMode="numeric"
                    autoComplete="tel"
                    className="h-10 md:h-12 text-sm" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Vehicle Type & Size */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <Truck className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                    {t("form.vehicleType")}
                  </label>
                  <Select value={vehicleType} onValueChange={(value: VehicleType) => setVehicleType(value)}>
                    <SelectTrigger className="h-10 md:h-12 text-sm">
                      <SelectValue placeholder={t("form.vehiclePlaceholder")} />
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
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <Ruler className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                    {t("form.vehicleSize")}
                  </label>
                  <Select value={vehicleSize} onValueChange={setVehicleSize}>
                    <SelectTrigger className="h-10 md:h-12 text-sm">
                      <SelectValue placeholder={t("form.vehicleSizePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleSizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
              </div>

              {/* Step 2 — pickup & schedule (mobile); always visible on md+ */}
              <div className={cn("space-y-3 md:space-y-4", isMobileLayout && mobileStep !== 2 && "hidden")}>
              {/* Pickup & Delivery Locations */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                    {t("form.pickup")}
                  </label>
                  <Input 
                    placeholder={t("form.pickupPlaceholder")}
                    className="h-10 md:h-12 text-sm" 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                    {t("form.delivery")}
                  </label>
                  <Input 
                    placeholder={t("form.deliveryPlaceholder")}
                    className="h-10 md:h-12 text-sm" 
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                  />
                </div>
              </motion.div>

              {/* Date, Time & Duration Row */}
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                {/* Date Picker */}
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                    {t("form.date")}
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-10 md:h-12 justify-start text-left font-normal text-sm px-3",
                          !pickupDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-1.5 md:mr-2 h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" />
                        <span className="truncate">
                          {pickupDate ? formatDate(pickupDate) : t("form.datePlaceholder")}
                        </span>
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

                {/* Time — native picker, any minute (e.g. 11:10) */}
                <div className="space-y-1.5 md:space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                    {t("form.time")}
                  </label>
                  <Input
                    type="time"
                    step={60}
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className={cn(
                      "h-10 md:h-12 text-sm appearance-none bg-background",
                      "[color-scheme:light] dark:[color-scheme:dark]",
                      !pickupTime && "text-muted-foreground",
                    )}
                  />
                </div>

                {/* Duration */}
                <div className="space-y-1.5 md:space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-xs sm:text-sm font-medium text-foreground flex items-center gap-1.5 md:gap-2">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary" />
                    {t("form.duration")}
                  </label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="h-10 md:h-12 text-sm">
                      <SelectValue placeholder={t("form.durationPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="space-y-3 pt-1 md:pt-2"
              >
                {isMobileLayout && mobileStep === 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="w-full group h-11 md:h-14 text-sm md:text-base"
                    onClick={() => {
                      if (validateStepOne()) setMobileStep(2);
                    }}
                  >
                    {t("form.continue")}
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}

                {(!isMobileLayout || mobileStep === 2) && (
                  <>
                    {isMobileLayout && mobileStep === 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="lg"
                        className="w-full h-10 text-muted-foreground hover:text-foreground -mb-1"
                        onClick={() => setMobileStep(1)}
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        {t("form.back")}
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      variant="secondary" 
                      size="lg" 
                      className="w-full group h-11 md:h-14 text-sm md:text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t("form.submitting") : t("form.submit")}
                      {!isSubmitting && <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full h-11 md:h-14 text-sm md:text-base border-[#25D366] bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 hover:text-[#054d44]"
                      onClick={openWhatsAppWithBooking}
                      disabled={isSubmitting}
                    >
                      <svg
                        className="w-5 h-5 mr-2 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t("form.whatsapp")}
                    </Button>
                  </>
                )}
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
