import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, MessageSquare, X } from "lucide-react";
import { useState } from "react";

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = "https://wa.me/8801608832209";
  const phoneNumber = "tel:+8801978832209";
  const smsNumber = "sms:+8801978832209";

  const buttons = [
    {
      href: whatsappUrl,
      icon: <MessageCircle className="w-6 h-6 text-white fill-white" />,
      bg: "bg-[#25D366]",
      label: "WhatsApp",
    },
    {
      href: smsNumber,
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      bg: "bg-[#2196F3]",
      label: "SMS",
    },
    {
      href: phoneNumber,
      icon: <Phone className="w-6 h-6 text-white" />,
      bg: "bg-[#4CAF50]",
      label: "Call",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-3">
      {/* Main toggle button */}
      <motion.button
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow ${isOpen ? 'bg-destructive' : 'bg-[#25D366]'}`}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact options"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Phone className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />}
      </motion.button>

      {/* Expandable buttons */}
      <AnimatePresence>
        {isOpen && buttons.map((btn, index) => (
          <motion.a
            key={btn.label}
            href={btn.href}
            target={btn.label === "WhatsApp" ? "_blank" : undefined}
            rel={btn.label === "WhatsApp" ? "noopener noreferrer" : undefined}
            className={`flex items-center gap-2 justify-center w-12 h-12 ${btn.bg} rounded-full shadow-lg hover:shadow-xl transition-shadow`}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label={btn.label}
          >
            {btn.icon}
          </motion.a>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingContactButtons;
