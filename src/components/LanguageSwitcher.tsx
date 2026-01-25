import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted rounded-full p-1">
      <motion.button
        onClick={() => setLanguage("bn")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          language === "bn"
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        whileTap={{ scale: 0.95 }}
      >
        বাং
      </motion.button>
      <motion.button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          language === "en"
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
    </div>
  );
};

export default LanguageSwitcher;
