import { Truck, Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground/80">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl accent-gradient flex items-center justify-center">
                <Truck className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">
                ট্রাক<span className="text-secondary">লাগবে</span>
              </span>
            </a>
            <p className="text-primary-foreground/60 mb-6">
              বাংলাদেশের সবচেয়ে বিশ্বস্ত পরিবহন সেবা। যেকোনো ধরনের যানবাহন ভাড়া নিন সহজে ও দ্রুত।
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-foreground font-bold text-lg mb-6">দ্রুত লিংক</h4>
            <ul className="space-y-4">
              <li>
                <a href="#services" className="hover:text-secondary transition-colors">সেবাসমূহ</a>
              </li>
              <li>
                <a href="#vehicles" className="hover:text-secondary transition-colors">যানবাহন</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-secondary transition-colors">কিভাবে কাজ করে</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">আমাদের সম্পর্কে</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">শর্তাবলী</a>
              </li>
            </ul>
          </div>

          {/* Vehicles */}
          <div>
            <h4 className="text-primary-foreground font-bold text-lg mb-6">যানবাহন</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">ট্রাক</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">পিকআপ</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">পিকআপ ভ্যান</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">প্রাইভেট কার</a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">হায়েস</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-foreground font-bold text-lg mb-6">যোগাযোগ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div>০১৭XX-XXXXXX</div>
                  <div>০১৮XX-XXXXXX</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>info@trucklagbe.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} ট্রাকলাগবে। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              গোপনীয়তা নীতি
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors">
              ব্যবহারের শর্তাবলী
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
