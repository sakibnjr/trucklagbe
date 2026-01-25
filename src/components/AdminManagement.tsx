import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { UserPlus, Trash2, Shield, Users } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
  email?: string;
}

const AdminManagement = () => {
  const { toast } = useToast();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<AppRole>("staff");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "ত্রুটি",
        description: "ব্যবহারকারী লোড করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    } else {
      setUserRoles(data || []);
    }
    setIsLoading(false);
  };

  const handleAddAdmin = async () => {
    if (!newEmail || !newPassword) {
      toast({
        title: "ত্রুটি",
        description: "ইমেইল এবং পাসওয়ার্ড দিন",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "ত্রুটি",
        description: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);

    try {
      // Create user using Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newEmail,
        password: newPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Add role to user_roles table
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: authData.user.id,
            role: newRole,
          });

        if (roleError) throw roleError;

        toast({
          title: "সফল",
          description: `নতুন ${newRole === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'} যোগ করা হয়েছে`,
        });

        setNewEmail("");
        setNewPassword("");
        setNewRole("staff");
        setIsAddDialogOpen(false);
        fetchUserRoles();
      }
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: error.message || "কিছু সমস্যা হয়েছে",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteUser = async (userRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', userRole.id);

      if (error) throw error;

      toast({
        title: "সফল",
        description: "ব্যবহারকারী মুছে ফেলা হয়েছে",
      });

      fetchUserRoles();
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: error.message || "মুছতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    }
  };

  const updateUserRole = async (userRole: UserRole, newRoleValue: AppRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRoleValue })
        .eq('id', userRole.id);

      if (error) throw error;

      toast({
        title: "সফল",
        description: "রোল আপডেট হয়েছে",
      });

      fetchUserRoles();
    } catch (error: any) {
      toast({
        title: "ত্রুটি",
        description: error.message || "আপডেট করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">অ্যাডমিন ম্যানেজমেন্ট</h2>
            <p className="text-sm text-muted-foreground">অ্যাডমিন এবং স্টাফ যোগ করুন</p>
          </div>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              নতুন যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>নতুন অ্যাডমিন/স্টাফ যোগ করুন</DialogTitle>
              <DialogDescription>
                নতুন ব্যবহারকারীর তথ্য দিন
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ইমেইল</label>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">পাসওয়ার্ড</label>
                <Input
                  type="password"
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">রোল</label>
                <Select value={newRole} onValueChange={(value: AppRole) => setNewRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">অ্যাডমিন</SelectItem>
                    <SelectItem value="staff">স্টাফ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                বাতিল
              </Button>
              <Button onClick={handleAddAdmin} disabled={isAdding}>
                {isAdding ? "যোগ হচ্ছে..." : "যোগ করুন"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">লোড হচ্ছে...</div>
      ) : userRoles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          কোনো অ্যাডমিন/স্টাফ নেই
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ইউজার ID</TableHead>
              <TableHead>রোল</TableHead>
              <TableHead>যোগ করা হয়েছে</TableHead>
              <TableHead className="text-right">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userRoles.map((userRole) => (
              <TableRow key={userRole.id}>
                <TableCell className="font-mono text-sm">
                  {userRole.user_id.slice(0, 8)}...
                </TableCell>
                <TableCell>
                  <Badge variant={userRole.role === 'admin' ? 'default' : 'secondary'}>
                    <Shield className="w-3 h-3 mr-1" />
                    {userRole.role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(userRole.created_at).toLocaleDateString('bn-BD')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Select
                      value={userRole.role}
                      onValueChange={(value: AppRole) => updateUserRole(userRole, value)}
                    >
                      <SelectTrigger className="w-28 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">অ্যাডমিন</SelectItem>
                        <SelectItem value="staff">স্টাফ</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteUser(userRole)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </motion.div>
  );
};

export default AdminManagement;
