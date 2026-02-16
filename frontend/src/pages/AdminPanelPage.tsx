import { useState } from "react";
import {
  Building2, Users, BarChart3, Search, Eye, Pencil, ChevronLeft, ChevronRight,
  Shield, CheckCircle2, XCircle, TrendingUp, CalendarDays, CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

const colleges = [
  { id: "1", name: "IIT Delhi", plan: "Enterprise", status: "Active", users: 1240, drives: 62, renewal: "2025-08-01" },
  { id: "2", name: "NIT Trichy", plan: "Pro", status: "Active", users: 890, drives: 45, renewal: "2025-06-15" },
  { id: "3", name: "BITS Pilani", plan: "Pro", status: "Active", users: 720, drives: 38, renewal: "2025-09-20" },
  { id: "4", name: "VIT Vellore", plan: "Free", status: "Trial", users: 350, drives: 12, renewal: "2025-03-01" },
  { id: "5", name: "SRM Chennai", plan: "Pro", status: "Inactive", users: 480, drives: 28, renewal: "2025-01-15" },
];

const allUsers = [
  { name: "Dr. Rajesh Kumar", email: "rajesh@iitd.ac.in", college: "IIT Delhi", role: "TPO", active: true },
  { name: "Amit Singh", email: "amit@iitd.ac.in", college: "IIT Delhi", role: "Admin", active: true },
  { name: "Priya Menon", email: "priya@nitt.edu", college: "NIT Trichy", role: "TPO", active: true },
  { name: "Sneha Gupta", email: "sneha@bits.ac.in", college: "BITS Pilani", role: "TPO", active: true },
  { name: "Rahul Verma", email: "rahul@vit.ac.in", college: "VIT Vellore", role: "TPO", active: false },
  { name: "Kavita Nair", email: "kavita@srm.edu.in", college: "SRM Chennai", role: "Admin", active: false },
];

const platformStats = [
  { label: "Total Colleges", value: "24", icon: Building2 },
  { label: "Total Users", value: "4,280", icon: Users },
  { label: "Total Drives", value: "312", icon: CalendarDays },
  { label: "Monthly Revenue", value: "₹2.4L", icon: CreditCard },
];

const planColor: Record<string, string> = {
  Free: "bg-muted text-muted-foreground",
  Pro: "bg-primary/10 text-primary border-primary/20",
  Enterprise: "bg-success/10 text-success border-success/20",
};

const AdminPanelPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<typeof colleges[0] | null>(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] = useState("all");

  const filteredUsers = allUsers.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (collegeFilter !== "all" && u.college !== collegeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">Platform management and analytics</p>
      </div>

      {/* Platform Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="colleges">
        <TabsList>
          <TabsTrigger value="colleges">Colleges</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Colleges Tab */}
        <TabsContent value="colleges">
          <Card className="shadow-card">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base">Colleges ({colleges.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search colleges..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>College</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Drives</TableHead>
                    <TableHead>Renewal</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colleges.filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase())).map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                      <TableCell><Badge variant="outline" className={planColor[c.plan]}>{c.plan}</Badge></TableCell>
                      <TableCell>
                        <Badge variant="outline" className={c.status === "Active" ? "bg-success/10 text-success border-success/20" : c.status === "Trial" ? "bg-warning/10 text-warning border-warning/20" : "bg-muted text-muted-foreground"}>
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{c.users.toLocaleString()}</TableCell>
                      <TableCell>{c.drives}</TableCell>
                      <TableCell className="text-muted-foreground">{new Date(c.renewal).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => setSelectedCollege(c)}>
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="shadow-card">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4 flex-wrap gap-2">
              <CardTitle className="text-base">All Users ({filteredUsers.length})</CardTitle>
              <div className="flex gap-2">
                <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                  <SelectTrigger className="w-36 h-9"><SelectValue placeholder="College" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colleges</SelectItem>
                    {[...new Set(allUsers.map((u) => u.college))].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-28 h-9"><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="TPO">TPO</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.email}>
                      <TableCell className="font-medium text-foreground">{u.name}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell>{u.college}</TableCell>
                      <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                      <TableCell>
                        {u.active ? (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-muted text-muted-foreground">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch checked={u.active} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader className="pb-2"><CardTitle className="text-base">Growth Metrics</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "College Onboarding", current: 24, target: 50 },
                  { label: "Active Users", current: 3200, target: 5000 },
                  { label: "Monthly Drives", current: 45, target: 80 },
                ].map((m) => (
                  <div key={m.label} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-medium text-foreground">{m.current} / {m.target}</span>
                    </div>
                    <Progress value={(m.current / m.target) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-2"><CardTitle className="text-base">System Health</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "API Uptime", value: "99.9%", ok: true },
                  { label: "Avg Response Time", value: "120ms", ok: true },
                  { label: "Error Rate", value: "0.02%", ok: true },
                  { label: "Storage Used", value: "42 GB / 100 GB", ok: true },
                ].map((h) => (
                  <div key={h.label} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                    <span className="text-sm text-muted-foreground">{h.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{h.value}</span>
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* College Detail Modal */}
      <Dialog open={!!selectedCollege} onOpenChange={(open) => !open && setSelectedCollege(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selectedCollege?.name}</DialogTitle></DialogHeader>
          {selectedCollege && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="text-xl font-bold text-foreground">{selectedCollege.users.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="text-xl font-bold text-foreground">{selectedCollege.drives}</div>
                  <div className="text-xs text-muted-foreground">Drives</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Plan</span>
                  <Badge variant="outline" className={planColor[selectedCollege.plan]}>{selectedCollege.plan}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">{selectedCollege.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Seat Limit</span>
                  <span className="text-sm font-medium text-foreground">2,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Renewal Date</span>
                  <span className="text-sm text-foreground">{new Date(selectedCollege.renewal).toLocaleDateString("en-IN")}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t">
                <Button size="sm" variant="outline" className="flex-1">Extend Trial</Button>
                <Button size="sm" variant="outline" className="flex-1">Change Plan</Button>
                <Button size="sm" className="flex-1">Manage Seats</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanelPage;
