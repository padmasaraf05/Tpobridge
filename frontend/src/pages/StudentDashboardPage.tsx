import {
  CalendarDays, Building2, Clock, CheckCircle2, Upload, FileText,
  Bell, User, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const upcomingDrives = [
  { company: "Infosys", role: "SDE - I", date: "2025-02-20", ctc: "6.5 LPA" },
  { company: "Cognizant", role: "Programmer Analyst", date: "2025-02-25", ctc: "4.5 LPA" },
  { company: "Deloitte", role: "Analyst", date: "2025-02-28", ctc: "7.0 LPA" },
];

const registeredDrives = [
  { company: "Amazon", role: "SDE Intern", status: "Round 1 - Aptitude", date: "2025-01-30" },
  { company: "TCS", role: "System Engineer", status: "Selected for HR", date: "2025-02-18" },
  { company: "Wipro", role: "Project Engineer", status: "Offer Released", date: "2025-02-15" },
];

const notifications = [
  { text: "Infosys drive registration opens tomorrow", time: "2 hours ago", type: "drive" },
  { text: "Your resume has been approved by TPO", time: "5 hours ago", type: "info" },
  { text: "TCS HR Round scheduled for Feb 20", time: "1 day ago", type: "drive" },
  { text: "Update your profile for upcoming drives", time: "2 days ago", type: "reminder" },
];

const statusColor: Record<string, string> = {
  "Round 1 - Aptitude": "bg-warning/10 text-warning border-warning/20",
  "Selected for HR": "bg-primary/10 text-primary border-primary/20",
  "Offer Released": "bg-success/10 text-success border-success/20",
};

const StudentDashboardPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
      <p className="text-sm text-muted-foreground">Track your placements, drives, and applications</p>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left: Drives */}
      <div className="lg:col-span-2 space-y-6">
        {/* Upcoming Drives */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> Upcoming Drives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDrives.map((d) => (
              <div key={d.company} className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{d.company}</h4>
                    <p className="text-xs text-muted-foreground">{d.role} · {d.ctc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span>
                  <Button size="sm" className="h-8 text-xs">Register</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Registered Drives */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" /> My Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {registeredDrives.map((d) => (
              <div key={d.company} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{d.company}</h4>
                    <p className="text-xs text-muted-foreground">{d.role} · {new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</p>
                  </div>
                </div>
                <Badge variant="outline" className={statusColor[d.status] || ""}>{d.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right: Profile + Notifications */}
      <div className="space-y-6">
        {/* Resume */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Resume
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-success/5 border border-success/10 p-3">
              <FileText className="h-5 w-5 text-success" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Resume_v3.pdf</p>
                <p className="text-xs text-muted-foreground">Uploaded 3 days ago</p>
              </div>
            </div>
            <Button variant="outline" className="w-full gap-2"><Upload className="h-4 w-4" /> Upload New Resume</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/30 transition-colors">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div>
                  <p className="text-sm text-foreground">{n.text}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Profile Quick */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Rahul Sharma</h4>
                <p className="text-xs text-muted-foreground">CS21B001 · B.Tech CS · CGPA 8.5</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

export default StudentDashboardPage;
