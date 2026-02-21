import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useActor } from "@/hooks/useActor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Loader2, LogOut, Search, Filter, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { PaymentRecord, PaymentStatus } from "@/backend";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const { actor } = useActor();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | PaymentStatus>("all");

  // Fetch all payments
  const { data: payments, isLoading, error, refetch } = useQuery<PaymentRecord[]>({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return [];
      return await actor.getAllPayments();
    },
    enabled: !!actor && isAuthenticated,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Please enter the admin password");
      return;
    }

    // Note: The backend doesn't have checkAdminPassword, so we're using a hardcoded password check
    // In production, this should be validated by the backend
    const ADMIN_PASSWORD = "techify2024";
    
    setIsCheckingPassword(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success("Welcome to Admin Dashboard");
    } else {
      toast.error("Invalid password. Please try again.");
    }

    setIsCheckingPassword(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    toast.info("Logged out successfully");
  };

  // Filter and search payments
  const filteredPayments = useMemo(() => {
    if (!payments) return [];

    let filtered = [...payments];

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.customerName.toLowerCase().includes(query) ||
          p.email.toLowerCase().includes(query) ||
          p.phone.toLowerCase().includes(query) ||
          p.plan.toLowerCase().includes(query)
      );
    }

    // Sort by timestamp descending (newest first)
    filtered.sort((a, b) => Number(b.timestamp - a.timestamp));

    return filtered;
  }, [payments, statusFilter, searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!payments) return { total: 0, completed: 0, pending: 0, failed: 0 };

    return {
      total: payments.length,
      completed: payments.filter((p) => p.status === PaymentStatus.Completed).length,
      pending: payments.filter((p) => p.status === PaymentStatus.Pending).length,
      failed: payments.filter((p) => p.status === PaymentStatus.Failed).length,
    };
  }, [payments]);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000); // Convert nanoseconds to milliseconds
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.Completed:
        return <Badge className="bg-success text-success-foreground">Completed</Badge>;
      case PaymentStatus.Pending:
        return <Badge variant="secondary">Pending</Badge>;
      case PaymentStatus.Failed:
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <CardDescription>Enter password to access payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isCheckingPassword}
                  autoFocus
                />
              </div>

              <Button type="submit" className="w-full" disabled={isCheckingPassword}>
                {isCheckingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Contact administrator if you've forgotten the password
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage Canva Pro subscriptions</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Orders</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl text-success">{stats.completed}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-warning">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Failed</CardDescription>
              <CardTitle className="text-3xl text-destructive">{stats.failed}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle>Payment Records</CardTitle>
                <CardDescription>View and search all customer orders</CardDescription>
              </div>
              <Button onClick={() => refetch()} variant="outline" size="sm">
                Refresh Data
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, phone, or plan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value={PaymentStatus.Completed}>Completed</TabsTrigger>
                  <TabsTrigger value={PaymentStatus.Pending}>Pending</TabsTrigger>
                  <TabsTrigger value={PaymentStatus.Failed}>Failed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <p>Failed to load payment records. Please try again.</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No payment records found</p>
              </div>
            )}

            {/* Table */}
            {!isLoading && !error && filteredPayments.length > 0 && (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(payment.timestamp)}
                        </TableCell>
                        <TableCell className="font-medium">{payment.customerName}</TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div className="text-muted-foreground">{payment.email}</div>
                            <div className="text-muted-foreground">{payment.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{payment.plan}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ₹{Number(payment.amount)}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {payment.transactionId || "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Results Count */}
            {!isLoading && !error && filteredPayments.length > 0 && (
              <p className="text-sm text-muted-foreground text-center">
                Showing {filteredPayments.length} of {payments?.length || 0} records
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
