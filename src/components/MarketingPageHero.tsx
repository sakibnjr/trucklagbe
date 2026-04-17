import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type MarketingPageHeroProps = {
  title: string;
  subtitle: string;
};

const MarketingPageHero = ({ title, subtitle }: MarketingPageHeroProps) => {
  const { language } = useLanguage();

  return (
    <section className="relative mt-3 sm:mt-4 pt-24 sm:pt-28 pb-10 sm:pb-12 md:pb-14 rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 shadow-lg shadow-primary/20 ring-1 ring-primary-foreground/10">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>
      <div className="relative w-full px-5 sm:px-8 md:px-10 lg:px-12 py-1">
        <Link to="/">
          <Button
            variant="ghost"
            className="mb-5 sm:mb-6 -ml-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "bn" ? "হোম পেজে ফিরুন" : "Back to Home"}
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-primary-foreground/90 max-w-none leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default MarketingPageHero;
