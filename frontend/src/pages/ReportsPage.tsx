import { useState } from "react";
import {
  Download, FileText, Calendar, Filter, BarChart3, Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const reportTemplates = [
  { id: "1", name: "Placement Summary Report", desc: "Overall placement stats with department breakdown", icon: BarChart3 },
  { id: "2", name: "Company-wise Report", desc: "Performance by recruiting company", icon: FileText },
  { id: "3", name: "Student Placement Report", desc: "Individual student placement status", icon: FileText },
  { id: "4", name: "CTC Analysis Report", desc: "Package statistics and trends", icon: BarChart3 },
];

const savedReports = [
  { name: "Placement Summary - Jan 2025", template: "Placement Summary Report", date: "2025-01-31", format: "PDF" },
  { name: "Company Report Q3 2024", template: "Company-wise Report", date: "2024-12-15", format: "Excel" },
  { name: "Student Status - Dec 2024", template: "Student Placement Report", date: "2024-12-01", format: "PDF" },
];

const ReportsPage = () => {
  const [dateFilter, setDateFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Generate and download placement reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Date Range" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Depts</SelectItem>
              <SelectItem value="CS">CS</SelectItem>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="ECE">ECE</SelectItem>
              <SelectItem value="EE">EE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Report Templates</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {reportTemplates.map((t) => (
            <Card key={t.id} className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1 text-xs"><Download className="h-3 w-3" /> PDF</Button>
                  <Button size="sm" variant="outline" className="h-8 gap-1 text-xs"><Download className="h-3 w-3" /> Excel</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Saved Reports */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" /> Report History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Format</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedReports.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="font-medium text-foreground">{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.template}</TableCell>
                  <TableCell className="text-muted-foreground">{new Date(r.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                  <TableCell><Badge variant="secondary">{r.format}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-primary"><Download className="h-3.5 w-3.5" /> Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
