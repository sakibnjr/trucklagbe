import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const MarketingPageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen">
    <Header />
    {children}
    <Footer />
    <WhatsAppButton />
  </div>
);

export default MarketingPageLayout;
