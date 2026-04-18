import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { KeyRound, Lock } from "lucide-react";

const PasswordChange = () => {
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({
        title: "ত্রুটি",
        description: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "ত্রুটি",
        description: "পাসওয়ার্ড মিলছে না",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      toast({
        title: "সফল",
        description: "পাসওয়ার্ড পরিবর্তন হয়েছে",
      });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: error.message || "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg md:rounded-xl border p-4 md:p-6 max-w-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-lg">
          <KeyRound className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground">পাসওয়ার্ড পরিবর্তন</h2>
          <p className="text-xs md:text-sm text-muted-foreground">আপনার অ্যাকাউন্টের পাসওয়ার্ড পরিবর্তন করুন</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            নতুন পাসওয়ার্ড
          </label>
          <Input
            type="password"
            placeholder="কমপক্ষে ৬ অক্ষর"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <Input
            type="password"
            placeholder="পুনরায় পাসওয়ার্ড দিন"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <Button
          onClick={handleChangePassword}
          disabled={isSaving || !newPassword || !confirmPassword}
          className="w-full sm:w-auto"
        >
          {isSaving ? "পরিবর্তন হচ্ছে..." : "পাসওয়ার্ড পরিবর্তন করুন"}
        </Button>
      </div>
    </motion.div>
  );
};

export default PasswordChange;
