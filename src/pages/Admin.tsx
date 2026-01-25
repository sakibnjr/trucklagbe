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
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

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
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">অ্যাডমিন প্যানেল</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:block">
              {user?.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              লগআউট
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = bookings.filter((b) => b.status === status).length;
              return (
                <motion.div
                  key={status}
                  className="bg-card rounded-xl p-4 border"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-3xl font-bold text-foreground">{count}</div>
                  <div className="text-sm text-muted-foreground">{config.label}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="bg-card rounded-xl border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="নাম, ফোন বা ঠিকানা দিয়ে খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
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
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                রিফ্রেশ
              </Button>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
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
          </div>

          {/* Summary */}
          <div className="mt-4 text-sm text-muted-foreground text-center">
            মোট {filteredBookings.length} টি বুকিং দেখাচ্ছে (সর্বমোট {bookings.length} টি)
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Admin;
