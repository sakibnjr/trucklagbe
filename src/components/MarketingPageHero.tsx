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
    <section className="relative pt-28 pb-14 md:pb-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>
      <div className="container relative">
        <Link to="/">
          <Button
            variant="ghost"
            className="mb-6 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === "bn" ? "হোম পেজে ফিরুন" : "Back to Home"}
          </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">{title}</h1>
        <p className="text-lg text-primary-foreground/85 max-w-2xl">{subtitle}</p>
      </div>
    </section>
  );
};

export default MarketingPageHero;
