import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FileText, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";

interface Blog {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const empty = {
  title: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  published: true,
};

const BlogManagement = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState(empty);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "ত্রুটি", description: "ব্লগ লোড করতে সমস্যা হয়েছে", variant: "destructive" });
    } else {
      setBlogs((data as Blog[]) || []);
    }
    setIsLoading(false);
  };

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setIsOpen(true);
  };

  const openEdit = (blog: Blog) => {
    setEditing(blog);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content,
      cover_image_url: blog.cover_image_url || "",
      published: blog.published,
    });
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast({ title: "ত্রুটি", description: "টাইটেল এবং কনটেন্ট দিন", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim(),
      cover_image_url: form.cover_image_url.trim() || null,
      published: form.published,
    };

    const { error } = editing
      ? await supabase.from("blogs").update(payload).eq("id", editing.id)
      : await supabase.from("blogs").insert([payload]);

    setIsSaving(false);

    if (error) {
      toast({ title: "ত্রুটি", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "সফল", description: editing ? "ব্লগ আপডেট হয়েছে" : "ব্লগ যোগ হয়েছে" });
    setIsOpen(false);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      toast({ title: "ত্রুটি", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "সফল", description: "ব্লগ মুছে ফেলা হয়েছে" });
    fetchBlogs();
  };

  const togglePublish = async (blog: Blog) => {
    const { error } = await supabase
      .from("blogs")
      .update({ published: !blog.published })
      .eq("id", blog.id);
    if (error) {
      toast({ title: "ত্রুটি", description: error.message, variant: "destructive" });
      return;
    }
    fetchBlogs();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg md:rounded-xl border p-4 md:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-semibold text-foreground">ব্লগ ম্যানেজমেন্ট</h2>
            <p className="text-xs md:text-sm text-muted-foreground">ব্লগ পোস্ট তৈরি ও পরিচালনা করুন</p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="w-full sm:w-auto" onClick={openNew}>
              <Plus className="w-4 h-4 mr-2" />
              নতুন ব্লগ
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-4 sm:mx-auto max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "ব্লগ এডিট করুন" : "নতুন ব্লগ যোগ করুন"}</DialogTitle>
              <DialogDescription>ব্লগ পোস্টের তথ্য দিন</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>টাইটেল *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="ব্লগের শিরোনাম"
                />
              </div>
              <div className="space-y-2">
                <Label>সংক্ষিপ্ত বিবরণ (Excerpt)</Label>
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="ছোট সারসংক্ষেপ"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>কনটেন্ট *</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="পুরো ব্লগ লিখুন"
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <Label>কভার ইমেজ URL</Label>
                <Input
                  value={form.cover_image_url}
                  onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <Label>প্রকাশিত</Label>
                  <p className="text-xs text-muted-foreground">চালু থাকলে সাইটে দেখাবে</p>
                </div>
                <Switch
                  checked={form.published}
                  onCheckedChange={(v) => setForm({ ...form, published: v })}
                />
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full sm:w-auto">
                বাতিল
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto">
                {isSaving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">লোড হচ্ছে...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">কোনো ব্লগ নেই</div>
      ) : (
        <div className="divide-y divide-border">
          {blogs.map((blog) => (
            <div key={blog.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-foreground truncate">{blog.title}</h3>
                    <Badge variant={blog.published ? "default" : "secondary"} className="shrink-0">
                      {blog.published ? "প্রকাশিত" : "ড্রাফট"}
                    </Badge>
                  </div>
                  {blog.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(blog.created_at), "dd/MM/yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(blog)} title="Publish toggle">
                    {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEdit(blog)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>ব্লগ মুছবেন?</AlertDialogTitle>
                        <AlertDialogDescription>এই কাজ ফেরানো যাবে না।</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>বাতিল</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(blog.id)}>মুছুন</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BlogManagement;
