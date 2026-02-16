import { useState } from "react";
import {
  Building2, CalendarDays, Award, IndianRupee, TrendingUp, UserCheck,
  Download, Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";

const kpis = [
  { label: "Total Companies Contacted", value: "148", icon: Building2, color: "primary" },
  { label: "Total Drives Conducted", value: "62", icon: CalendarDays, color: "primary" },
  { label: "Total Offers Secured", value: "387", icon: Award, color: "success" },
  { label: "Median CTC", value: "₹6.2 LPA", icon: IndianRupee, color: "primary" },
  { label: "Highest CTC", value: "₹42 LPA", icon: TrendingUp, color: "success" },
  { label: "Offer-to-Join %", value: "88%", icon: UserCheck, color: "success" },
];

const yoyData = [
  { year: "2021", offers: 210, drives: 35 },
  { year: "2022", offers: 280, drives: 42 },
  { year: "2023", offers: 340, drives: 55 },
  { year: "2024", offers: 387, drives: 62 },
];

const deptData = [
  { name: "CS", value: 180, fill: "hsl(215, 70%, 40%)" },
  { name: "IT", value: 85, fill: "hsl(210, 60%, 55%)" },
  { name: "ECE", value: 55, fill: "hsl(142, 60%, 40%)" },
  { name: "EE", value: 30, fill: "hsl(38, 90%, 50%)" },
  { name: "ME", value: 22, fill: "hsl(215, 15%, 55%)" },
  { name: "Other", value: 15, fill: "hsl(215, 15%, 75%)" },
];

const monthlyData = [
  { month: "Jul", drives: 2 }, { month: "Aug", drives: 5 }, { month: "Sep", drives: 8 },
  { month: "Oct", drives: 12 }, { month: "Nov", drives: 10 }, { month: "Dec", drives: 7 },
  { month: "Jan", drives: 9 }, { month: "Feb", drives: 6 }, { month: "Mar", drives: 3 },
];

const topCompanies = [
  { company: "TCS", offers: 52 }, { company: "Infosys", offers: 45 },
  { company: "Wipro", offers: 38 }, { company: "Accenture", offers: 35 },
  { company: "Cognizant", offers: 30 }, { company: "Deloitte", offers: 22 },
];

const OwnerDashboardPage = () => {
  const [dateRange, setDateRange] = useState("2024");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Executive Overview</h1>
          <p className="text-sm text-muted-foreground">Placement performance summary — view only</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024–25</SelectItem>
              <SelectItem value="2023">2023–24</SelectItem>
              <SelectItem value="2022">2022–23</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export PDF</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{kpi.label}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{kpi.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpi.color === "success" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* YoY Comparison */}
        <Card className="shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-base">Year-over-Year Comparison</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={yoyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,88%)", fontSize: 13 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="offers" name="Offers" fill="hsl(215, 70%, 40%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="drives" name="Drives" fill="hsl(142, 60%, 40%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Pie */}
        <Card className="shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-base">Department-wise Offers</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {deptData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,88%)", fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-base">Monthly Drive Trends</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,88%)", fontSize: 13 }} />
                <Line type="monotone" dataKey="drives" stroke="hsl(215, 70%, 40%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(215, 70%, 40%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Companies */}
        <Card className="shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-base">Top Recruiting Companies</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topCompanies} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="company" tick={{ fontSize: 12 }} width={80} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(214,20%,88%)", fontSize: 13 }} />
                <Bar dataKey="offers" fill="hsl(210, 60%, 55%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboardPage;
