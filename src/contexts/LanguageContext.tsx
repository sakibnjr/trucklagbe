import { createContext, useContext, useState, ReactNode } from "react";

type Language = "bn" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Bengali translations (default)
const bnTranslations: Record<string, string> = {
  // Header
  "nav.services": "সেবাসমূহ",
  "nav.howItWorks": "কিভাবে কাজ করে",
  "nav.vehicles": "যানবাহন",
  "nav.about": "আমাদের সম্পর্কে",
  "nav.contact": "যোগাযোগ",
  "nav.booking": "বুকিং করুন",
  
  // Hero Section
  "hero.title": "আপনার মালামাল",
  "hero.titleHighlight": "পৌঁছে যাবে গন্তব্যে",
  "hero.subtitle": "বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রাক ও পিকআপ ভাড়া সেবা। দ্রুত, নিরাপদ এবং সাশ্রয়ী মূল্যে আপনার পণ্য পরিবহন করুন।",
  "hero.cta": "এখনই বুকিং দিন",
  "hero.call": "কল করুন",
  "hero.badge": "বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রান্সপোর্ট সার্ভিস",
  "hero.tagline1": "যেকোনো জায়গায়",
  "hero.tagline2": "ট্রাক বা গাড়ি",
  "hero.tagline3": "ভাড়া নিন সহজে",
  "hero.description": "ট্রাক, পিকআপ, প্রাইভেট কার বা হায়েস - যা প্রয়োজন তা বুক করুন মিনিটের মধ্যে। সারাদেশে দ্রুত ও নিরাপদ পরিবহন সেবা।",
  "hero.bookNow": "এখনই বুক করুন",
  "hero.aboutUs": "আমাদের সম্পর্কে",
  "hero.stats.customers": "সন্তুষ্ট গ্রাহক",
  "hero.stats.vehicles": "যানবাহন",
  "hero.stats.districts": "জেলায় সেবা",
  
  // Booking Form
  "form.title": "এখনই বুকিং করুন",
  "form.name": "আপনার নাম",
  "form.namePlaceholder": "নাম লিখুন",
  "form.phone": "মোবাইল নম্বর",
  "form.vehicleType": "যানবাহনের ধরন",
  "form.vehiclePlaceholder": "যানবাহন নির্বাচন করুন",
  "form.pickup": "পিকআপ পয়েন্ট",
  "form.pickupPlaceholder": "কোথা থেকে তুলবেন?",
  "form.delivery": "ডেলিভারি পয়েন্ট",
  "form.deliveryPlaceholder": "কোথায় পৌঁছাবেন?",
  "form.date": "তারিখ",
  "form.datePlaceholder": "তারিখ নির্বাচন",
  "form.time": "সময়",
  "form.timePlaceholder": "সময় নির্বাচন",
  "form.vehicleSize": "গাড়ির সাইজ",
  "form.vehicleSizePlaceholder": "গাড়ির সাইজ নির্বাচন করুন",
  "form.duration": "কতদিনের জন্য",
  "form.durationPlaceholder": "সময়কাল নির্বাচন করুন",
  "form.submit": "বুকিং করুন",
  "form.submitting": "বুকিং হচ্ছে...",
  "form.success": "সফল! ✅",
  "form.successMsg": "আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
  "form.error": "ত্রুটি",
  "form.errorMsg": "বুকিং করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
  "form.validation.name": "আপনার নাম লিখুন",
  "form.validation.phone": "সঠিক মোবাইল নম্বর লিখুন",
  "form.validation.vehicle": "যানবাহন নির্বাচন করুন",
  "form.validation.pickup": "পিকআপ পয়েন্ট লিখুন",
  "form.validation.delivery": "ডেলিভারি পয়েন্ট লিখুন",
  "form.validation.date": "তারিখ নির্বাচন করুন",
  "form.validation.time": "সময় নির্বাচন করুন",
  "form.validation.duration": "সময়কাল নির্বাচন করুন",
  
  // Vehicles Section
  "vehicles.subtitle": "আমাদের যানবাহন",
  "vehicles.title": "আপনার প্রয়োজনে সঠিক গাড়ি",
  "vehicles.description": "ছোট পার্সেল থেকে বড় মালামাল - সব ধরনের পরিবহনের জন্য আমাদের বিভিন্ন যানবাহন রয়েছে",
  "vehicles.truck": "ট্রাক",
  "vehicles.truck.desc": "বড় মালামাল ও ভারী পণ্য পরিবহনের জন্য আদর্শ।",
  "vehicles.truck.capacity": "৫-১০ টন",
  "vehicles.pickup": "পিকআপ",
  "vehicles.pickup.desc": "মাঝারি আকারের মালামাল পরিবহনের জন্য উপযুক্ত।",
  "vehicles.pickup.capacity": "১-২ টন",
  "vehicles.pickupVan": "পিকআপ ভ্যান",
  "vehicles.pickupVan.desc": "ছোট ব্যবসা ও দোকানের মালামাল পরিবহনে সেরা।",
  "vehicles.pickupVan.capacity": "৫০০ কেজি",
  "vehicles.privateCar": "প্রাইভেট কার",
  "vehicles.privateCar.desc": "জরুরি ডকুমেন্ট ও ছোট পার্সেল ডেলিভারির জন্য।",
  "vehicles.privateCar.capacity": "৫০ কেজি",
  "vehicles.hiace": "হায়েস",
  "vehicles.hiace.desc": "বাসা বদল ও মাঝারি মালামাল পরিবহনে কার্যকর।",
  "vehicles.hiace.capacity": "৫০০ কেজি",
  "vehicles.select": "নির্বাচন করুন",
  
  // How It Works
  "howItWorks.subtitle": "কিভাবে কাজ করে",
  "howItWorks.title": "মাত্র ৪টি সহজ ধাপে",
  "howItWorks.description": "জটিলতা ছাড়াই দ্রুত ও সহজে যানবাহন ভাড়া নিন",
  "howItWorks.step1.title": "যানবাহন খুঁজুন",
  "howItWorks.step1.desc": "আপনার প্রয়োজন অনুযায়ী ট্রাক, পিকআপ বা গাড়ি নির্বাচন করুন।",
  "howItWorks.step2.title": "বুকিং দিন",
  "howItWorks.step2.desc": "পিকআপ ও ডেলিভারি পয়েন্ট এবং সময়কাল নির্ধারণ করে বুক করুন।",
  "howItWorks.step3.title": "যানবাহন আসবে",
  "howItWorks.step3.desc": "নির্ধারিত সময়ে ড্রাইভার সহ যানবাহন আপনার কাছে পৌঁছে যাবে।",
  "howItWorks.step4.title": "কাজ সম্পন্ন",
  "howItWorks.step4.desc": "নিরাপদে মালামাল পৌঁছে দিয়ে পেমেন্ট করুন। ব্যস, এতটাই সহজ!",
  
  // Features Section
  "features.subtitle": "কেন আমরা সেরা",
  "features.title": "ট্রাকলাগবে কেন বেছে নেবেন?",
  "features.description": "আপনার পরিবহন অভিজ্ঞতাকে সহজ ও আনন্দদায়ক করতে আমরা প্রতিশ্রুতিবদ্ধ",
  "features.safety.title": "নিরাপদ পরিবহন",
  "features.safety.desc": "অভিজ্ঞ ড্রাইভার ও বীমাকৃত যানবাহনে আপনার মালামাল সম্পূর্ণ নিরাপদ।",
  "features.time.title": "সময়মতো ডেলিভারি",
  "features.time.desc": "আমরা সময়ের মূল্য বুঝি। নির্ধারিত সময়ে ডেলিভারি নিশ্চিত করি।",
  "features.price.title": "সাশ্রয়ী মূল্য",
  "features.price.desc": "বাজারের সবচেয়ে প্রতিযোগিতামূলক মূল্যে সেরা সেবা পাচ্ছেন।",
  "features.support.title": "২৪/৭ সাপোর্ট",
  "features.support.desc": "যেকোনো সমস্যায় আমাদের কাস্টমার কেয়ার টিম সর্বদা আপনার পাশে।",
  "features.nationwide.title": "সারাদেশে সেবা",
  "features.nationwide.desc": "বাংলাদেশের ৬৪ জেলায় আমাদের বিস্তৃত নেটওয়ার্ক রয়েছে।",
  "features.drivers.title": "অভিজ্ঞ ড্রাইভার",
  "features.drivers.desc": "প্রশিক্ষিত ও যাচাইকৃত ড্রাইভারদের সাথে নিশ্চিন্তে ভ্রমণ করুন।",
  
  // Service Areas
  "serviceAreas.subtitle": "সেবা এলাকা",
  "serviceAreas.title": "সারাদেশে আমাদের সেবা",
  "serviceAreas.description": "বাংলাদেশের প্রতিটি কোণায় আমরা পৌঁছে যাই",
  
  // CTA Section
  "cta.title": "এখনই শুরু করুন!",
  "cta.description": "পরিবহনের ঝামেলা থেকে মুক্তি পান। এখনই ট্রাকলাগবে-তে বুকিং দিন অথবা সরাসরি কল করুন।",
  "cta.booking": "বুকিং করুন",
  
  // Footer
  "footer.description": "বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রাক ও পিকআপ ভাড়া সেবা। দ্রুত, নিরাপদ এবং সাশ্রয়ী মূল্যে।",
  "footer.quickLinks": "দ্রুত লিংক",
  "footer.contact": "যোগাযোগ",
  "footer.followUs": "ফলো করুন",
  "footer.rights": "সর্বস্বত্ব সংরক্ষিত",
  "footer.home": "হোম",
  "footer.aboutUs": "আমাদের সম্পর্কে",
  "footer.terms": "শর্তাবলী",
  "footer.privacy": "গোপনীয়তা নীতি",
};

// English translations
const enTranslations: Record<string, string> = {
  // Header
  "nav.services": "Services",
  "nav.howItWorks": "How It Works",
  "nav.vehicles": "Vehicles",
  "nav.about": "About Us",
  "nav.contact": "Contact",
  "nav.booking": "Book Now",
  
  // Hero Section
  "hero.title": "Your Goods Will",
  "hero.titleHighlight": "Reach Their Destination",
  "hero.subtitle": "Bangladesh's most trusted truck and pickup rental service. Transport your goods quickly, safely, and affordably.",
  "hero.cta": "Book Now",
  "hero.call": "Call Us",
  "hero.badge": "Bangladesh's Most Trusted Transport Service",
  "hero.tagline1": "Rent Trucks or Cars",
  "hero.tagline2": "Anywhere",
  "hero.tagline3": "With Ease",
  "hero.description": "Truck, pickup, private car, or Hiace - book what you need in minutes. Fast and safe transport service nationwide.",
  "hero.bookNow": "Book Now",
  "hero.aboutUs": "About Us",
  "hero.stats.customers": "Happy Customers",
  "hero.stats.vehicles": "Vehicles",
  "hero.stats.districts": "Districts Served",
  
  // Booking Form
  "form.title": "Book Now",
  "form.name": "Your Name",
  "form.namePlaceholder": "Enter your name",
  "form.phone": "Mobile Number",
  "form.vehicleType": "Vehicle Type",
  "form.vehiclePlaceholder": "Select a vehicle",
  "form.pickup": "Pickup Point",
  "form.pickupPlaceholder": "Where to pick up?",
  "form.delivery": "Delivery Point",
  "form.deliveryPlaceholder": "Where to deliver?",
  "form.date": "Date",
  "form.datePlaceholder": "Select date",
  "form.time": "Time",
  "form.timePlaceholder": "Select time",
  "form.vehicleSize": "Vehicle Size",
  "form.vehicleSizePlaceholder": "Select vehicle size",
  "form.duration": "Duration",
  "form.durationPlaceholder": "Select duration",
  "form.submit": "Book Now",
  "form.submitting": "Booking...",
  "form.success": "Success! ✅",
  "form.successMsg": "Your booking has been completed successfully. We will contact you soon.",
  "form.error": "Error",
  "form.errorMsg": "There was a problem with booking. Please try again.",
  "form.validation.name": "Please enter your name",
  "form.validation.phone": "Please enter a valid mobile number",
  "form.validation.vehicle": "Please select a vehicle",
  "form.validation.pickup": "Please enter pickup location",
  "form.validation.delivery": "Please enter delivery location",
  "form.validation.date": "Please select a date",
  "form.validation.time": "Please select a time",
  "form.validation.duration": "Please select duration",
  
  // Vehicles Section
  "vehicles.subtitle": "Our Vehicles",
  "vehicles.title": "The Right Vehicle for Your Needs",
  "vehicles.description": "From small parcels to large cargo - we have various vehicles for all types of transportation",
  "vehicles.truck": "Truck",
  "vehicles.truck.desc": "Ideal for large cargo and heavy goods transportation.",
  "vehicles.truck.capacity": "5-10 Tons",
  "vehicles.pickup": "Pickup",
  "vehicles.pickup.desc": "Suitable for medium-sized cargo transportation.",
  "vehicles.pickup.capacity": "1-2 Tons",
  "vehicles.pickupVan": "Pickup Van",
  "vehicles.pickupVan.desc": "Best for small business and shop goods transportation.",
  "vehicles.pickupVan.capacity": "500 kg",
  "vehicles.privateCar": "Private Car",
  "vehicles.privateCar.desc": "For urgent documents and small parcel delivery.",
  "vehicles.privateCar.capacity": "50 kg",
  "vehicles.hiace": "Hiace",
  "vehicles.hiace.desc": "Effective for house shifting and medium cargo.",
  "vehicles.hiace.capacity": "500 kg",
  "vehicles.select": "Select",
  
  // How It Works
  "howItWorks.subtitle": "How It Works",
  "howItWorks.title": "Just 4 Simple Steps",
  "howItWorks.description": "Rent a vehicle quickly and easily without complications",
  "howItWorks.step1.title": "Find Vehicle",
  "howItWorks.step1.desc": "Choose a truck, pickup, or car according to your needs.",
  "howItWorks.step2.title": "Make Booking",
  "howItWorks.step2.desc": "Book by setting pickup & delivery points and duration.",
  "howItWorks.step3.title": "Vehicle Arrives",
  "howItWorks.step3.desc": "The vehicle with driver will reach you at the scheduled time.",
  "howItWorks.step4.title": "Job Done",
  "howItWorks.step4.desc": "Deliver goods safely and make payment. That's it!",
  
  // Features Section
  "features.subtitle": "Why We're the Best",
  "features.title": "Why Choose TruckLagbe?",
  "features.description": "We are committed to making your transportation experience easy and enjoyable",
  "features.safety.title": "Safe Transport",
  "features.safety.desc": "Your goods are completely safe with experienced drivers and insured vehicles.",
  "features.time.title": "On-Time Delivery",
  "features.time.desc": "We understand the value of time. We ensure delivery on schedule.",
  "features.price.title": "Affordable Prices",
  "features.price.desc": "Get the best service at the most competitive market price.",
  "features.support.title": "24/7 Support",
  "features.support.desc": "Our customer care team is always by your side for any problem.",
  "features.nationwide.title": "Nationwide Service",
  "features.nationwide.desc": "We have an extensive network across all 64 districts of Bangladesh.",
  "features.drivers.title": "Experienced Drivers",
  "features.drivers.desc": "Travel worry-free with trained and verified drivers.",
  
  // Service Areas
  "serviceAreas.subtitle": "Service Areas",
  "serviceAreas.title": "Our Service Across the Country",
  "serviceAreas.description": "We reach every corner of Bangladesh",
  
  // CTA Section
  "cta.title": "Get Started Now!",
  "cta.description": "Get rid of transportation hassles. Book now on TruckLagbe or call us directly.",
  "cta.booking": "Book Now",
  
  // Footer
  "footer.description": "Bangladesh's most trusted truck and pickup rental service. Fast, safe, and affordable.",
  "footer.quickLinks": "Quick Links",
  "footer.contact": "Contact",
  "footer.followUs": "Follow Us",
  "footer.rights": "All Rights Reserved",
  "footer.home": "Home",
  "footer.aboutUs": "About Us",
  "footer.terms": "Terms & Conditions",
  "footer.privacy": "Privacy Policy",
};

const translations: Record<Language, Record<string, string>> = {
  bn: bnTranslations,
  en: enTranslations,
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("bn");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
