import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Truck,
  LogOut,
  Search,
  RefreshCw,
  Calendar,
  MapPin,
  User as UserIcon,
  Phone,
  Clock,
  Settings,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import AdminManagement from "@/components/AdminManagement";
import BlogManagement from "@/components/BlogManagement";
import type { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import { SITE_CONTENT_CLASS } from "@/lib/layout";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type BookingStatus = Database["public"]["Enums"]["booking_status"];

const statusConfig: Record<BookingStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "অপেক্ষমাণ", variant: "secondary" },
  confirmed: { label: "নিশ্চিত", variant: "default" },
  in_progress: { label: "চলমান", variant: "outline" },
  completed: { label: "সম্পন্ন", variant: "default" },
  cancelled: { label: "বাতিল", variant: "destructive" },
};

const vehicleLabels: Record<string, string> = {
  truck: "ট্রাক",
  pickup: "পিকআপ",
  "pickup-van": "পিকআপ ভ্যান",
  "private-car": "প্রাইভেট কার",
  hiace: "হায়েস",
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'admins' | 'blogs'>('bookings');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/admin/auth');
        } else {
          setTimeout(() => {
            checkAdminAccess(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/admin/auth');
      } else {
        checkAdminAccess(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminAccess = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data || (data.role !== 'admin' && data.role !== 'staff')) {
      toast({
        title: "অ্যাক্সেস অস্বীকৃত",
        description: "আপনার অ্যাডমিন অ্যাক্সেস নেই",
        variant: "destructive",
      });
      await supabase.auth.signOut();
      navigate('/admin/auth');
      return;
    }

    setIsAdmin(data.role === 'admin');
    setIsLoading(false);
    fetchBookings();
  };

  const fetchBookings = async () => {
    setIsRefreshing(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "ত্রুটি",
        description: "বুকিং লোড করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    } else {
      setBookings(data || []);
    }
    setIsRefreshing(false);
  };

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: "ত্রুটি",
        description: "স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    } else {
      toast({
        title: "সফল",
        description: "স্ট্যাটাস আপডেট হয়েছে",
      });
      fetchBookings();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_phone.includes(searchTerm) ||
      booking.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.delivery_location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Truck className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className={cn(SITE_CONTENT_CLASS, "py-3 md:py-4")}>
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 md:p-2 rounded-lg">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <span className="text-lg md:text-xl font-bold text-foreground">অ্যাডমিন প্যানেল</span>
            </Link>

            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-xs md:text-sm text-muted-foreground hidden sm:block truncate max-w-[120px] md:max-w-none">
                {user?.email}
              </span>
              <Button
                variant={activeTab === 'blogs' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(activeTab === 'blogs' ? 'bookings' : 'blogs')}
                className="text-xs md:text-sm px-2 md:px-3"
              >
                <FileText className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">{activeTab === 'blogs' ? 'বুকিং' : 'ব্লগ'}</span>
              </Button>
              {isAdmin && (
                <Button
                  variant={activeTab === 'admins' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab(activeTab === 'admins' ? 'bookings' : 'admins')}
                  className="text-xs md:text-sm px-2 md:px-3"
                >
                  <Settings className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">{activeTab === 'admins' ? 'বুকিং' : 'অ্যাডমিন'}</span>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs md:text-sm px-2 md:px-3">
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">লগআউট</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={cn(SITE_CONTENT_CLASS, "py-4 md:py-8 px-3 md:px-4")}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'admins' && isAdmin ? (
            <AdminManagement />
          ) : activeTab === 'blogs' ? (
            <BlogManagement />
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-8">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const count = bookings.filter((b) => b.status === status).length;
                  return (
                    <motion.div
                      key={status}
                      className="bg-card rounded-lg md:rounded-xl p-3 md:p-4 border"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-xl md:text-3xl font-bold text-foreground">{count}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{config.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Filters */}
              <div className="bg-card rounded-lg md:rounded-xl border p-3 md:p-4 mb-4 md:mb-6">
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="নাম, ফোন বা ঠিকানা দিয়ে খুঁজুন..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-sm"
                    />
                  </div>
                  <div className="flex gap-2 md:gap-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="flex-1 md:w-48 text-sm">
                        <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                        {Object.entries(statusConfig).map(([value, config]) => (
                          <SelectItem key={value} value={value}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={fetchBookings}
                      disabled={isRefreshing}
                      className="text-sm px-3"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      <span className="hidden sm:inline ml-2">রিফ্রেশ</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bookings - Mobile Cards / Desktop Table */}
              <div className="bg-card rounded-lg md:rounded-xl border overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            গ্রাহক
                          </div>
                        </TableHead>
                        <TableHead className="min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            ফোন
                          </div>
                        </TableHead>
                        <TableHead className="min-w-[100px]">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            যানবাহন
                          </div>
                        </TableHead>
                        <TableHead className="min-w-[150px]">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            পিকআপ
                          </div>
                        </TableHead>
                        <TableHead className="min-w-[150px]">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            ডেলিভারি
                          </div>
                        </TableHead>
                        <TableHead className="min-w-[120px]">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            তারিখ
                          </div>
                        </TableHead>
                        <TableHead className="min-w-[80px]">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            সময়
                          </div>
                        </TableHead>
                        <TableHead className="min-w-[120px]">স্ট্যাটাস</TableHead>
                        <TableHead className="min-w-[150px]">অ্যাকশন</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                            কোনো বুকিং পাওয়া যায়নি
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.customer_name}</TableCell>
                            <TableCell>{booking.customer_phone}</TableCell>
                            <TableCell>{vehicleLabels[booking.vehicle_type] || booking.vehicle_type}</TableCell>
                            <TableCell className="max-w-[150px] truncate" title={booking.pickup_location}>
                              {booking.pickup_location}
                            </TableCell>
                            <TableCell className="max-w-[150px] truncate" title={booking.delivery_location}>
                              {booking.delivery_location}
                            </TableCell>
                            <TableCell>
                              {format(new Date(booking.pickup_date), 'dd/MM/yyyy')}
                            </TableCell>
                            <TableCell>{booking.pickup_time.slice(0, 5)}</TableCell>
                            <TableCell>
                              <Badge variant={statusConfig[booking.status].variant}>
                                {statusConfig[booking.status].label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={booking.status}
                                onValueChange={(value: BookingStatus) =>
                                  updateBookingStatus(booking.id, value)
                                }
                              >
                                <SelectTrigger className="h-8 w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.entries(statusConfig).map(([value, config]) => (
                                    <SelectItem key={value} value={value}>
                                      {config.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden divide-y divide-border">
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      কোনো বুকিং পাওয়া যায়নি
                    </div>
                  ) : (
                    filteredBookings.map((booking) => (
                      <div key={booking.id} className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-semibold text-foreground">{booking.customer_name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {booking.customer_phone}
                            </div>
                          </div>
                          <Badge variant={statusConfig[booking.status].variant} className="shrink-0">
                            {statusConfig[booking.status].label}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">যানবাহন:</span>
                            <div className="font-medium">{vehicleLabels[booking.vehicle_type] || booking.vehicle_type}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">তারিখ ও সময়:</span>
                            <div className="font-medium">
                              {format(new Date(booking.pickup_date), 'dd/MM/yy')} • {booking.pickup_time.slice(0, 5)}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm space-y-1">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                            <span className="text-muted-foreground line-clamp-1">{booking.pickup_location}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-red-500 mt-1 shrink-0" />
                            <span className="text-muted-foreground line-clamp-1">{booking.delivery_location}</span>
                          </div>
                        </div>

                        <Select
                          value={booking.status}
                          onValueChange={(value: BookingStatus) =>
                            updateBookingStatus(booking.id, value)
                          }
                        >
                          <SelectTrigger className="w-full h-9 text-sm">
                            <SelectValue placeholder="স্ট্যাটাস পরিবর্তন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([value, config]) => (
                              <SelectItem key={value} value={value}>
                                {config.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="mt-4 text-xs md:text-sm text-muted-foreground text-center">
                মোট {filteredBookings.length} টি বুকিং দেখাচ্ছে (সর্বমোট {bookings.length} টি)
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
