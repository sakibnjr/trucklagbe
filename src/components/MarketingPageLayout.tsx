import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_CONTENT_CLASS } from "@/lib/layout";

const MarketingPageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen">
    <Header />
    <div className={SITE_CONTENT_CLASS}>{children}</div>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default MarketingPageLayout;
