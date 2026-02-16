import { useState, useRef, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, Search, Bell, ChevronDown, LayoutDashboard, Users,
  Inbox, ExternalLink, CalendarDays, BarChart3, Newspaper, Settings,
  Menu, X, LogOut, User, Building2, Shield, BookOpen, Check,
  HelpCircle, CreditCard, Activity, FileText,
} from "lucide-react";
import { useAuth, UserRole, roleLabelMap } from "@/contexts/AuthContext";

type SidebarItem = { title: string; url: string; icon: typeof LayoutDashboard; badge: number };
type SidebarSection = { label: string; items: SidebarItem[] };

const navigationByRole: Record<UserRole, SidebarSection[]> = {
  tpo: [
    {
      label: "Main",
      items: [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, badge: 0 },
        { title: "Recruiter CRM", url: "/dashboard/crm", icon: Users, badge: 0 },
        { title: "Inbound Intents", url: "/dashboard/inbound", icon: Inbox, badge: 3 },
        { title: "Outbound Links", url: "/dashboard/outbound", icon: ExternalLink, badge: 0 },
        { title: "Drive Manager", url: "/dashboard/drives", icon: CalendarDays, badge: 0 },
        { title: "Reports", url: "/dashboard/reports", icon: BarChart3, badge: 0 },
        { title: "Feed", url: "/dashboard/feed", icon: Newspaper, badge: 0 },
      ],
    },
    {
      label: "Account",
      items: [
        { title: "Settings", url: "/dashboard/settings", icon: Settings, badge: 0 },
      ],
    },
  ],
  owner: [
    {
      label: "Main",
      items: [
        { title: "Owner Dashboard", url: "/dashboard/owner", icon: BookOpen, badge: 0 },
      ],
    },
    {
      label: "Account",
      items: [
        { title: "Settings", url: "/dashboard/settings", icon: Settings, badge: 0 },
      ],
    },
  ],
  admin: [
    {
      label: "Admin",
      items: [
        { title: "Colleges", url: "/dashboard/admin", icon: Shield, badge: 0 },
        { title: "Users", url: "/dashboard/admin/users", icon: Users, badge: 0 },
        { title: "Admin Feed", url: "/dashboard/feed", icon: Newspaper, badge: 0 },
        { title: "Plans & Billing", url: "/dashboard/admin/plans", icon: CreditCard, badge: 0 },
        { title: "Platform Analytics", url: "/dashboard/admin/analytics", icon: Activity, badge: 0 },
        { title: "System Logs", url: "/dashboard/admin/logs", icon: FileText, badge: 0 },
      ],
    },
    {
      label: "Account",
      items: [
        { title: "Settings", url: "/dashboard/settings", icon: Settings, badge: 0 },
      ],
    },
  ],
  student: [
    {
      label: "Main",
      items: [
        { title: "Student Portal", url: "/dashboard/student", icon: GraduationCap, badge: 0 },
      ],
    },
    {
      label: "Account",
      items: [
        { title: "Settings", url: "/dashboard/settings", icon: Settings, badge: 0 },
      ],
    },
  ],
};

const roleBadgeColor: Record<UserRole, string> = {
  tpo: "bg-primary/15 text-primary",
  owner: "bg-success/15 text-success",
  admin: "bg-[hsl(270,60%,55%)]/15 text-[hsl(270,60%,55%)]",
  student: "bg-[hsl(200,70%,50%)]/15 text-[hsl(200,70%,50%)]",
};

const notifications = [
  { id: "1", text: "Infosys drive Round 2 results updated", time: "10 min ago", read: false, type: "drive" },
  { id: "2", text: "New inbound intent from Deloitte", time: "1 hour ago", read: false, type: "inbound" },
  { id: "3", text: "Follow-up with TCS overdue", time: "3 hours ago", read: false, type: "followup" },
  { id: "4", text: "5 offers confirmed for Wipro drive", time: "5 hours ago", read: true, type: "offer" },
  { id: "5", text: "Amazon drive registration closes tomorrow", time: "1 day ago", read: true, type: "drive" },
];

const searchResults = [
  { label: "Infosys", type: "Company", url: "/dashboard/crm" },
  { label: "Infosys SDE Drive - Feb 2025", type: "Drive", url: "/dashboard/drives/1" },
  { label: "TCS System Engineer Drive", type: "Drive", url: "/dashboard/drives/2" },
  { label: "Rahul Sharma (CS21B001)", type: "Student", url: "/dashboard/student" },
  { label: "Priya Patel (CS21B012)", type: "Student", url: "/dashboard/student" },
  { label: "Accenture", type: "Company", url: "/dashboard/crm" },
];

const typeIcon: Record<string, typeof Building2> = {
  Company: Building2, Drive: CalendarDays, Student: User,
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readNotifs, setReadNotifs] = useState<string[]>(["4", "5"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const userRole = user?.role ?? "tpo";
  const sections = navigationByRole[userRole];

  const unreadCount = notifications.filter((n) => !readNotifs.includes(n.id)).length;
  const filteredSearch = searchQuery.length >= 2
    ? searchResults.filter((r) => r.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const markAllRead = () => setReadNotifs(notifications.map((n) => n.id));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = searchRef.current?.querySelector("input");
        input?.focus();
        setSearchFocused(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-bold text-sidebar-foreground">TPOBridge</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-sidebar-muted hover:text-sidebar-foreground lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {sections.map((section) => (
            <div key={section.label}>
              <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-sidebar-muted">
                {section.label}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.url || (item.url !== "/dashboard" && location.pathname.startsWith(item.url + "/"));
                  return (
                    <Link key={item.title} to={item.url} onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"}`}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge > 0 && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-[10px] font-semibold text-sidebar-primary-foreground">{item.badge}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        {/* Help & Support at bottom */}
        <div className="border-t border-sidebar-border p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors">
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>Help & Support</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b bg-card px-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>

          {/* Global Search */}
          <div ref={searchRef} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search companies, drives, students… (⌘K)" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setSearchFocused(true)}
              className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            {searchFocused && filteredSearch.length > 0 && (
              <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border bg-card shadow-card-hover overflow-hidden">
                {filteredSearch.map((r, i) => {
                  const Icon = typeIcon[r.type] || Building2;
                  return (
                    <button key={i} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-muted/50 transition-colors"
                      onClick={() => { navigate(r.url); setSearchQuery(""); setSearchFocused(false); }}>
                      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="flex-1 text-foreground">{r.label}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{r.type}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Role Badge */}
            <span className={`hidden sm:inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleBadgeColor[userRole]}`}>
              {roleLabelMap[userRole]}
            </span>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">{unreadCount}</span>
                )}
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-lg border bg-card shadow-card-hover overflow-hidden">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                      <span className="text-sm font-semibold text-foreground">Notifications</span>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-colors ${!readNotifs.includes(n.id) ? "bg-primary/5" : ""}`}>
                          <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!readNotifs.includes(n.id) ? "bg-primary" : "bg-transparent"}`} />
                          <div>
                            <p className="text-sm text-foreground">{n.text}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-accent transition-colors">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden text-left sm:block">
                  <div className="text-sm font-medium text-foreground">{user?.name ?? "User"}</div>
                  <div className="text-xs text-muted-foreground">{roleLabelMap[userRole]}</div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border bg-card p-1 shadow-card-hover">
                    <div className="px-3 py-2 border-b mb-1">
                      <div className="text-sm font-medium text-foreground">{user?.name ?? "User"}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-muted-foreground">Role:</span>
                        <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${roleBadgeColor[userRole]}`}>
                          {roleLabelMap[userRole]}
                        </span>
                      </div>
                    </div>
                    <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>
                    <button onClick={() => { setProfileOpen(false); handleLogout(); }}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-accent">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {userRole === "owner" && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              <span>View Only — You have read-only access to this dashboard</span>
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
