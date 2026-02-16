import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Building2, ArrowLeft, Calendar, MapPin, IndianRupee, Pencil, Trash2, Download,
  Users, CheckCircle2, XCircle, Filter, ChevronDown, ChevronRight, FileText,
  Upload, Award, Clock, BarChart3, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock data
const driveData: Record<string, { company: string; role: string; ctc: string; date: string; venue: string; status: string; eligibility: string }> = {
  "1": { company: "Infosys", role: "SDE - I", ctc: "6.5 LPA", date: "2025-02-20", venue: "Seminar Hall A", status: "Active", eligibility: "B.Tech CS/IT, CGPA ≥ 7.0" },
  "2": { company: "TCS", role: "System Engineer", ctc: "3.6 LPA", date: "2025-02-18", venue: "Main Auditorium", status: "Active", eligibility: "All branches, CGPA ≥ 6.0" },
  "3": { company: "Wipro", role: "Project Engineer", ctc: "5.0 LPA", date: "2025-02-15", venue: "Block C - Lab 4", status: "Completed", eligibility: "B.Tech CS/IT/ECE" },
};

const students = [
  { name: "Rahul Sharma", roll: "CS21B001", dept: "CS", cgpa: 8.5, resume: true },
  { name: "Priya Patel", roll: "CS21B012", dept: "CS", cgpa: 9.1, resume: true },
  { name: "Amit Kumar", roll: "IT21B008", dept: "IT", cgpa: 7.8, resume: true },
  { name: "Sneha Reddy", roll: "CS21B025", dept: "CS", cgpa: 8.2, resume: false },
  { name: "Vikram Singh", roll: "ECE21B003", dept: "ECE", cgpa: 7.5, resume: true },
  { name: "Ananya Gupta", roll: "CS21B040", dept: "CS", cgpa: 9.4, resume: true },
  { name: "Rohan Das", roll: "IT21B015", dept: "IT", cgpa: 7.2, resume: true },
  { name: "Kavita Nair", roll: "CS21B033", dept: "CS", cgpa: 8.8, resume: true },
];

const roundsData = [
  { name: "Aptitude Test", participated: 200, cleared: 120, notCleared: 80, reasons: [{ tag: "Aptitude weak", count: 40 }, { tag: "Time management", count: 25 }, { tag: "Technical gaps", count: 15 }] },
  { name: "Technical Interview", participated: 120, cleared: 45, notCleared: 75, reasons: [{ tag: "DSA weak", count: 35 }, { tag: "System design", count: 20 }, { tag: "Communication", count: 20 }] },
  { name: "HR Interview", participated: 45, cleared: 18, notCleared: 27, reasons: [{ tag: "Salary mismatch", count: 12 }, { tag: "Location preference", count: 10 }, { tag: "Communication gap", count: 5 }] },
];

const offers = [
  { name: "Rahul Sharma", dept: "CS", ctc: "6.5 LPA", offerLetter: true, dojStatus: "Confirmed" },
  { name: "Priya Patel", dept: "CS", ctc: "6.5 LPA", offerLetter: true, dojStatus: "Confirmed" },
  { name: "Ananya Gupta", dept: "CS", ctc: "7.0 LPA", offerLetter: false, dojStatus: "Pending" },
  { name: "Kavita Nair", dept: "CS", ctc: "6.5 LPA", offerLetter: true, dojStatus: "Confirmed" },
];

const funnelData = [
  { label: "Registered", count: 245, pct: 100 },
  { label: "Round 1", count: 200, pct: 82 },
  { label: "Round 2", count: 120, pct: 49 },
  { label: "Round 3", count: 45, pct: 18 },
  { label: "Offers", count: 18, pct: 7 },
  { label: "DOJ Confirmed", count: 14, pct: 6 },
];

const deptPerf = [
  { dept: "CS", registered: 150, offers: 12, rate: "8%" },
  { dept: "IT", registered: 50, offers: 4, rate: "8%" },
  { dept: "ECE", registered: 30, offers: 2, rate: "6.7%" },
  { dept: "EE", registered: 15, offers: 0, rate: "0%" },
];

const statusColor: Record<string, string> = {
  Active: "bg-primary/10 text-primary border-primary/20",
  Scheduled: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-success/10 text-success border-success/20",
};

const DriveDetailPage = () => {
  const { driveId } = useParams();
  const navigate = useNavigate();
  const drive = driveData[driveId || "1"] || driveData["1"];

  const [deptFilter, setDeptFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [expandedRound, setExpandedRound] = useState<number | null>(0);
  const [updateModal, setUpdateModal] = useState<number | null>(null);

  const filteredStudents = deptFilter === "all" ? students : students.filter((s) => s.dept === deptFilter);

  const toggleStudent = (roll: string) => {
    setSelectedStudents((prev) => prev.includes(roll) ? prev.filter((r) => r !== roll) : [...prev, roll]);
  };

  const toggleAll = () => {
    if (selectedStudents.length === filteredStudents.length) setSelectedStudents([]);
    else setSelectedStudents(filteredStudents.map((s) => s.roll));
  };

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/drives")} className="gap-1 mb-4 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Drives
        </Button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-foreground">{drive.company}</h1>
                <Badge variant="outline" className={statusColor[drive.status]}>{drive.status}</Badge>
              </div>
              <p className="text-lg text-muted-foreground">{drive.role}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{drive.ctc}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(drive.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{drive.venue}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
            <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="registrations">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="rounds">Rounds</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Registrations Tab */}
        <TabsContent value="registrations">
          <Card className="shadow-card">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base">Registered Students ({filteredStudents.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={deptFilter} onValueChange={setDeptFilter}>
                  <SelectTrigger className="w-32 h-9"><SelectValue placeholder="Department" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Depts</SelectItem>
                    {["CS", "IT", "ECE", "EE"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> CSV</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {selectedStudents.length > 0 && (
                <div className="flex items-center gap-3 border-b bg-primary/5 px-6 py-2">
                  <span className="text-sm font-medium text-primary">{selectedStudents.length} selected</span>
                  <Button size="sm" variant="outline" className="h-7 text-xs">Advance to Next Round</Button>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0} onCheckedChange={toggleAll} />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Dept</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Resume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((s) => (
                    <TableRow key={s.roll}>
                      <TableCell><Checkbox checked={selectedStudents.includes(s.roll)} onCheckedChange={() => toggleStudent(s.roll)} /></TableCell>
                      <TableCell className="font-medium text-foreground">{s.name}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{s.roll}</TableCell>
                      <TableCell><Badge variant="secondary">{s.dept}</Badge></TableCell>
                      <TableCell className="text-foreground">{s.cgpa}</TableCell>
                      <TableCell>
                        {s.resume ? (
                          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-primary"><FileText className="h-3 w-3" /> View</Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not uploaded</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rounds Tab */}
        <TabsContent value="rounds">
          <div className="space-y-4">
            {/* Progress funnel */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {funnelData.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="text-center min-w-[80px]">
                        <div className="text-lg font-bold text-foreground">{step.count}</div>
                        <div className="text-[10px] text-muted-foreground">{step.label}</div>
                        <Progress value={step.pct} className="h-1.5 mt-1" />
                      </div>
                      {i < funnelData.length - 1 && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Round cards */}
            {roundsData.map((round, i) => (
              <Card key={i} className="shadow-card overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setExpandedRound(expandedRound === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">{i + 1}</div>
                    <div>
                      <h4 className="font-medium text-foreground">{round.name}</h4>
                      <p className="text-xs text-muted-foreground">{round.participated} participated</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-success font-medium">{round.cleared}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <span className="text-destructive font-medium">{round.notCleared}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedRound === i ? "rotate-180" : ""}`} />
                  </div>
                </div>
                {expandedRound === i && (
                  <div className="border-t px-4 py-4 space-y-3">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg bg-muted/50 p-3 text-center">
                        <div className="text-2xl font-bold text-foreground">{round.participated}</div>
                        <div className="text-xs text-muted-foreground">Participated</div>
                      </div>
                      <div className="rounded-lg bg-success/5 border border-success/10 p-3 text-center">
                        <div className="text-2xl font-bold text-success">{round.cleared}</div>
                        <div className="text-xs text-muted-foreground">Cleared</div>
                      </div>
                      <div className="rounded-lg bg-destructive/5 border border-destructive/10 p-3 text-center">
                        <div className="text-2xl font-bold text-destructive">{round.notCleared}</div>
                        <div className="text-xs text-muted-foreground">Not Cleared</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Rejection Reasons</h5>
                      <div className="flex flex-wrap gap-2">
                        {round.reasons.map((r) => (
                          <Badge key={r.tag} variant="outline" className="gap-1">
                            {r.tag} <span className="text-muted-foreground">({r.count})</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" className="gap-1" onClick={() => setUpdateModal(i)}>
                      <Pencil className="h-3.5 w-3.5" /> Update Results
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Offers Tab */}
        <TabsContent value="offers">
          <Card className="shadow-card">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-base">Offers ({offers.length})</CardTitle>
              <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> Export</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Dept</TableHead>
                    <TableHead>CTC</TableHead>
                    <TableHead>Offer Letter</TableHead>
                    <TableHead>DOJ Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offers.map((o) => (
                    <TableRow key={o.name}>
                      <TableCell className="font-medium text-foreground">{o.name}</TableCell>
                      <TableCell><Badge variant="secondary">{o.dept}</Badge></TableCell>
                      <TableCell className="text-foreground">{o.ctc}</TableCell>
                      <TableCell>
                        {o.offerLetter ? (
                          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-primary"><FileText className="h-3 w-3" /> Download</Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs"><Upload className="h-3 w-3" /> Upload</Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={o.dojStatus === "Confirmed" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                          {o.dojStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Edit DOJ</Button>
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
          <div className="space-y-4">
            {/* Funnel visualization */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Selection Funnel</CardTitle>
                  <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> Export Report</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {funnelData.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-4">
                      <span className="w-28 text-sm text-muted-foreground shrink-0">{step.label}</span>
                      <div className="flex-1 h-8 bg-muted/50 rounded-md overflow-hidden">
                        <div
                          className="h-full bg-primary/20 rounded-md flex items-center px-3 transition-all"
                          style={{ width: `${step.pct}%` }}
                        >
                          <span className="text-xs font-medium text-primary whitespace-nowrap">{step.count} ({step.pct}%)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Department-wise Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Offers</TableHead>
                      <TableHead>Conversion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deptPerf.map((d) => (
                      <TableRow key={d.dept}>
                        <TableCell className="font-medium text-foreground">{d.dept}</TableCell>
                        <TableCell>{d.registered}</TableCell>
                        <TableCell>
                          <Badge className="bg-success/10 text-success border border-success/20">{d.offers}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{d.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Update Results Modal */}
      <Dialog open={updateModal !== null} onOpenChange={(open) => !open && setUpdateModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Round Results</DialogTitle>
          </DialogHeader>
          {updateModal !== null && (
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">{roundsData[updateModal].name}</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Cleared</label>
                  <Input type="number" defaultValue={roundsData[updateModal].cleared} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Not Cleared</label>
                  <Input type="number" defaultValue={roundsData[updateModal].notCleared} />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setUpdateModal(null)}>Cancel</Button>
                <Button onClick={() => setUpdateModal(null)}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriveDetailPage;
