import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  CalendarDays,
  TrendingUp,
  Gift,
  UserCheck,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bell,
  Briefcase,
  ArrowRight,
} from "lucide-react";

// --- KPI Data ---
const kpiCards = [
  { label: "Total Recruiters", value: "156", trend: "+12 this month", icon: Building2, color: "primary" as const },
  { label: "Active Pipeline", value: "34", trend: "8 new this week", icon: Briefcase, color: "primary" as const },
  { label: "Drives This Month", value: "12", trend: "3 upcoming", icon: CalendarDays, color: "primary" as const },
  { label: "Offers Released", value: "287", trend: "+42 this month", icon: Gift, color: "success" as const },
  { label: "DOJ Confirmed", value: "198", trend: "89 pending", icon: UserCheck, color: "success" as const },
  { label: "Overdue Follow-ups", value: "7", trend: "Action needed", icon: AlertTriangle, color: "destructive" as const },
];

const recruiterUpdates = [
  { company: "Google India", action: "Confirmed campus visit", time: "12 min ago" },
  { company: "Microsoft", action: "Updated JD for SDE-2", time: "1 hr ago" },
  { company: "Amazon", action: "Shortlisted 45 students", time: "2 hrs ago" },
  { company: "Deloitte", action: "Sent offer letters", time: "4 hrs ago" },
  { company: "Infosys", action: "Requested student list", time: "Yesterday" },
];

const driveUpdates = [
  { company: "TCS", status: "Registration Open", time: "30 min ago", statusType: "ongoing" as const },
  { company: "Wipro", status: "Interviews Scheduled", time: "2 hrs ago", statusType: "ongoing" as const },
  { company: "Accenture", status: "Completed – 32 offers", time: "5 hrs ago", statusType: "completed" as const },
  { company: "Cognizant", status: "Results Awaited", time: "Yesterday", statusType: "pending" as const },
  { company: "JP Morgan", status: "Drive Confirmed", time: "Yesterday", statusType: "scheduled" as const },
];

const alerts = [
  { type: "red" as const, title: "3 Dormant Recruiters", desc: "No response in 15+ days from Capgemini, HCL, and Tech Mahindra.", action: "Send Reminder" },
  { type: "red" as const, title: "2 Missed Follow-ups", desc: "Scheduled calls with Oracle and SAP were not completed.", action: "Reschedule" },
  { type: "yellow" as const, title: "5 Pending Inbound Intents", desc: "New recruiter interest from 5 companies awaiting review.", action: "Review" },
  { type: "yellow" as const, title: "Student Consent Pending", desc: "14 students haven't confirmed participation for upcoming TCS drive.", action: "Notify" },
  { type: "green" as const, title: "Wipro Drive Completed", desc: "Successfully placed 28 students. Average CTC: ₹6.5 LPA.", action: "View Report" },
  { type: "green" as const, title: "100% DOJ Confirmation", desc: "All 12 students confirmed DOJ for Infosys batch.", action: "Details" },
];

// --- Color maps ---
const kpiGradient: Record<string, string> = {
  primary: "from-primary/8 to-primary/3",
  success: "from-success/8 to-success/3",
  destructive: "from-destructive/8 to-destructive/3",
};
const kpiIconBg: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  destructive: "bg-destructive/10 text-destructive",
};
const kpiTrendColor: Record<string, string> = {
  primary: "text-primary",
  success: "text-success",
  destructive: "text-destructive",
};

const driveStatusStyle: Record<string, string> = {
  ongoing: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  scheduled: "bg-accent text-accent-foreground",
};

const alertBorder: Record<string, string> = {
  red: "border-l-destructive",
  yellow: "border-l-warning",
  green: "border-l-success",
};
const alertIcon: Record<string, typeof AlertCircle> = {
  red: AlertCircle,
  yellow: Bell,
  green: CheckCircle2,
};
const alertIconColor: Record<string, string> = {
  red: "text-destructive",
  yellow: "text-warning",
  green: "text-success",
};
const alertBtnStyle: Record<string, string> = {
  red: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  yellow: "bg-warning/10 text-warning hover:bg-warning/20",
  green: "bg-success/10 text-success hover:bg-success/20",
};

// --- Component ---
const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header + Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your placement office activity.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/dashboard/drives"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Create Drive
          </Link>
          <Link
            to="/dashboard/crm"
            className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            <Users className="h-4 w-4" />
            Add Recruiter
          </Link>
          <Link
            to="/dashboard/reports"
            className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            <FileText className="h-4 w-4" />
            View Reports
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className={`group rounded-xl border bg-gradient-to-br ${kpiGradient[card.color]} p-5 transition-shadow hover:shadow-card-hover`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${kpiIconBg[card.color]} transition-transform group-hover:scale-105`}>
                <card.icon className="h-[18px] w-[18px]" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground">{card.value}</div>
            <div className={`mt-1 flex items-center gap-1 text-xs ${kpiTrendColor[card.color]}`}>
              {card.color === "destructive" ? (
                <AlertTriangle className="h-3 w-3" />
              ) : (
                <ArrowUpRight className="h-3 w-3" />
              )}
              {card.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity – Two Columns */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recruiter Updates */}
        <div className="rounded-xl border bg-card shadow-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-semibold text-foreground">Recent Recruiter Updates</h2>
            <Link to="/dashboard/crm" className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-0.5">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y">
            {recruiterUpdates.map((item, i) => (
              <Link
                key={i}
                to="/dashboard/crm"
                className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.company}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.action}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Drive Updates */}
        <div className="rounded-xl border bg-card shadow-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="font-semibold text-foreground">Recent Drive Updates</h2>
            <Link to="/dashboard/drives" className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-0.5">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y">
            {driveUpdates.map((item, i) => (
              <Link
                key={i}
                to="/dashboard/drives"
                className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.company}</p>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${driveStatusStyle[item.statusType]}`}>
                    {item.status}
                  </span>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="rounded-xl border bg-card shadow-card">
        <div className="border-b px-5 py-4">
          <h2 className="font-semibold text-foreground">Alerts &amp; Notifications</h2>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {alerts.map((alert, i) => {
            const Icon = alertIcon[alert.type];
            return (
              <div
                key={i}
                className={`rounded-lg border border-l-4 ${alertBorder[alert.type]} bg-background p-4 transition-shadow hover:shadow-card-hover`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${alertIconColor[alert.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{alert.desc}</p>
                    <button className={`mt-3 inline-flex rounded-md px-3 py-1 text-xs font-medium transition-colors ${alertBtnStyle[alert.type]}`}>
                      {alert.action}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
