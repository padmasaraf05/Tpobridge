import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2, Briefcase, Calendar, Users, Award, ChevronLeft, ChevronRight,
  Plus, Search, Filter, Eye, Pencil, Trash2, X, Copy, Check, ArrowUpDown,
  Clock, MapPin, GraduationCap, Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data
const sampleDrives = [
  { id: "1", company: "Infosys", role: "SDE - I", date: "2025-02-20", registrations: 245, currentRound: "Round 2 - Technical", offers: 18, status: "Active", department: "CS" },
  { id: "2", company: "TCS", role: "System Engineer", date: "2025-02-18", registrations: 312, currentRound: "Round 3 - HR", offers: 45, status: "Active", department: "CS" },
  { id: "3", company: "Wipro", role: "Project Engineer", date: "2025-02-15", registrations: 198, currentRound: "Completed", offers: 32, status: "Completed", department: "IT" },
  { id: "4", company: "Cognizant", role: "Programmer Analyst", date: "2025-02-25", registrations: 0, currentRound: "—", offers: 0, status: "Scheduled", department: "CS" },
  { id: "5", company: "Accenture", role: "Associate SE", date: "2025-02-12", registrations: 275, currentRound: "Completed", offers: 52, status: "Completed", department: "ECE" },
  { id: "6", company: "Deloitte", role: "Analyst", date: "2025-02-28", registrations: 0, currentRound: "—", offers: 0, status: "Scheduled", department: "MBA" },
  { id: "7", company: "Amazon", role: "SDE Intern", date: "2025-01-30", registrations: 180, currentRound: "Round 1 - Aptitude", offers: 0, status: "Active", department: "CS" },
  { id: "8", company: "Google", role: "SWE", date: "2025-01-25", registrations: 150, currentRound: "Completed", offers: 8, status: "Completed", department: "CS" },
];

const companies = ["Infosys", "TCS", "Wipro", "Cognizant", "Accenture", "Deloitte", "Amazon", "Google", "Microsoft", "Capgemini"];
const departments = ["CS", "IT", "ECE", "EE", "ME", "CE", "MBA"];

const statusColor: Record<string, string> = {
  Active: "bg-primary/10 text-primary border-primary/20",
  Scheduled: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-success/10 text-success border-success/20",
};

const DriveManagerPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "registrations" | "offers">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [linkCopied, setLinkCopied] = useState(false);

  // Wizard state
  const [newDrive, setNewDrive] = useState({
    company: "", role: "", ctc: "", date: "", time: "", venue: "", eligibility: "",
  });
  const [rounds, setRounds] = useState([
    { name: "Aptitude Test", description: "Online aptitude assessment", criteria: "60% minimum score" },
    { name: "Technical Interview", description: "DSA and system design", criteria: "Clear problem solving" },
    { name: "HR Interview", description: "Cultural fit and expectations", criteria: "Communication skills" },
  ]);

  const perPage = 6;

  // Filter & sort
  let filtered = sampleDrives.filter((d) => {
    if (search && !d.company.toLowerCase().includes(search.toLowerCase()) && !d.role.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && d.status !== statusFilter) return false;
    if (deptFilter !== "all" && d.department !== deptFilter) return false;
    return true;
  });

  filtered.sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortBy === "date") return dir * (new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sortBy === "registrations") return dir * (a.registrations - b.registrations);
    return dir * (a.offers - b.offers);
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (col: "date" | "registrations" | "offers") => {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  const addRound = () => setRounds([...rounds, { name: "", description: "", criteria: "" }]);
  const removeRound = (i: number) => setRounds(rounds.filter((_, idx) => idx !== i));
  const updateRound = (i: number, field: string, value: string) =>
    setRounds(rounds.map((r, idx) => (idx === i ? { ...r, [field]: value } : r)));

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://tpobridge.app/register/drive-abc123");
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const resetWizard = () => {
    setWizardStep(1);
    setNewDrive({ company: "", role: "", ctc: "", date: "", time: "", venue: "", eligibility: "" });
    setRounds([
      { name: "Aptitude Test", description: "Online aptitude assessment", criteria: "60% minimum score" },
      { name: "Technical Interview", description: "DSA and system design", criteria: "Clear problem solving" },
      { name: "HR Interview", description: "Cultural fit and expectations", criteria: "Communication skills" },
    ]);
    setWizardOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Drive Manager</h1>
          <p className="text-sm text-muted-foreground">Manage placement drives, rounds, and offers</p>
        </div>
        <Button onClick={() => setWizardOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Create Drive
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search company or role..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={deptFilter} onValueChange={(v) => { setDeptFilter(v); setPage(1); }}>
              <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="registrations">Sort by Registrations</SelectItem>
                <SelectItem value="offers">Sort by Offers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("date")}>
                <span className="flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3" /></span>
              </TableHead>
              <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("registrations")}>
                <span className="flex items-center gap-1">Registrations <ArrowUpDown className="h-3 w-3" /></span>
              </TableHead>
              <TableHead>Current Round</TableHead>
              <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("offers")}>
                <span className="flex items-center gap-1">Offers <ArrowUpDown className="h-3 w-3" /></span>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((drive) => (
              <TableRow key={drive.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/dashboard/drives/${drive.id}`)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-foreground">{drive.company}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{drive.role}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(drive.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-mono">{drive.registrations}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{drive.currentRound}</TableCell>
                <TableCell>
                  {drive.offers > 0 ? (
                    <Badge className="bg-success/10 text-success border border-success/20">{drive.offers}</Badge>
                  ) : <span className="text-muted-foreground">—</span>}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColor[drive.status]}>{drive.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/dashboard/drives/${drive.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <span className="text-sm text-muted-foreground">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </Card>

      {/* Create Drive Wizard */}
      <Dialog open={wizardOpen} onOpenChange={(open) => { if (!open) resetWizard(); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Steps indicator */}
            <div className="flex items-center gap-2">
              {["Basic Details", "Rounds", "Generate Link", "Publish"].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    wizardStep > i + 1 ? "bg-success text-success-foreground" : wizardStep === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>{i + 1}</div>
                  <span className={`hidden text-sm sm:block ${wizardStep === i + 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{label}</span>
                  {i < 3 && <div className={`h-px w-4 sm:w-8 ${wizardStep > i + 1 ? "bg-success" : "bg-border"}`} />}
                </div>
              ))}
            </div>

            {/* Step 1 */}
            {wizardStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Select value={newDrive.company} onValueChange={(v) => setNewDrive({ ...newDrive, company: v })}>
                      <SelectTrigger><SelectValue placeholder="Select company" /></SelectTrigger>
                      <SelectContent>{companies.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Role / Position</Label>
                    <Input value={newDrive.role} onChange={(e) => setNewDrive({ ...newDrive, role: e.target.value })} placeholder="e.g. SDE - I" />
                  </div>
                  <div className="space-y-2">
                    <Label>CTC Package</Label>
                    <Input value={newDrive.ctc} onChange={(e) => setNewDrive({ ...newDrive, ctc: e.target.value })} placeholder="e.g. 6.5 LPA" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" value={newDrive.date} onChange={(e) => setNewDrive({ ...newDrive, date: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input type="time" value={newDrive.time} onChange={(e) => setNewDrive({ ...newDrive, time: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Venue</Label>
                    <Input value={newDrive.venue} onChange={(e) => setNewDrive({ ...newDrive, venue: e.target.value })} placeholder="e.g. Seminar Hall A" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Eligibility Criteria</Label>
                  <Textarea value={newDrive.eligibility} onChange={(e) => setNewDrive({ ...newDrive, eligibility: e.target.value })} placeholder="e.g. B.Tech CS/IT, CGPA ≥ 7.0, No active backlogs" rows={3} />
                </div>
              </div>
            )}

            {/* Step 2 */}
            {wizardStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Configure Rounds</h3>
                  <Button variant="outline" size="sm" onClick={addRound} className="gap-1"><Plus className="h-3 w-3" /> Add Round</Button>
                </div>
                <div className="space-y-3">
                  {rounds.map((round, i) => (
                    <Card key={i} className="relative">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</div>
                          <div className="flex-1 space-y-3">
                            <Input value={round.name} onChange={(e) => updateRound(i, "name", e.target.value)} placeholder="Round name" className="font-medium" />
                            <Input value={round.description} onChange={(e) => updateRound(i, "description", e.target.value)} placeholder="Description" />
                            <Input value={round.criteria} onChange={(e) => updateRound(i, "criteria", e.target.value)} placeholder="Passing criteria" />
                          </div>
                          {rounds.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-destructive hover:text-destructive" onClick={() => removeRound(i)}>
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {wizardStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Registration Link</h3>
                <Card className="bg-muted/30">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-foreground">Auto-generated student registration link</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border bg-background p-3">
                      <code className="flex-1 text-sm text-muted-foreground truncate">https://tpobridge.app/register/drive-abc123</code>
                      <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-1 shrink-0">
                        {linkCopied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                      </Button>
                    </div>
                    <div className="rounded-lg border bg-background p-4">
                      <h4 className="text-sm font-medium text-foreground mb-3">Registration Form Preview</h4>
                      <div className="space-y-2">
                        {["Full Name", "Roll Number", "Department", "CGPA", "Resume Upload"].map((field) => (
                          <div key={field} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {field}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4 */}
            {wizardStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Review & Publish</h3>
                <Card className="bg-muted/30">
                  <CardContent className="p-4 space-y-3">
                    <div className="grid gap-2 sm:grid-cols-2 text-sm">
                      <div><span className="text-muted-foreground">Company:</span> <span className="font-medium text-foreground">{newDrive.company || "—"}</span></div>
                      <div><span className="text-muted-foreground">Role:</span> <span className="font-medium text-foreground">{newDrive.role || "—"}</span></div>
                      <div><span className="text-muted-foreground">CTC:</span> <span className="font-medium text-foreground">{newDrive.ctc || "—"}</span></div>
                      <div><span className="text-muted-foreground">Date:</span> <span className="font-medium text-foreground">{newDrive.date || "—"}</span></div>
                      <div><span className="text-muted-foreground">Time:</span> <span className="font-medium text-foreground">{newDrive.time || "—"}</span></div>
                      <div><span className="text-muted-foreground">Venue:</span> <span className="font-medium text-foreground">{newDrive.venue || "—"}</span></div>
                    </div>
                    <div className="border-t pt-3">
                      <span className="text-sm text-muted-foreground">Rounds:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {rounds.filter(r => r.name).map((r, i) => (
                          <Badge key={i} variant="secondary">{r.name}</Badge>
                        ))}
                      </div>
                    </div>
                    {newDrive.eligibility && (
                      <div className="border-t pt-3">
                        <span className="text-sm text-muted-foreground">Eligibility:</span>
                        <p className="mt-1 text-sm text-foreground">{newDrive.eligibility}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2 border-t">
              <Button variant="outline" onClick={() => wizardStep === 1 ? resetWizard() : setWizardStep(wizardStep - 1)}>
                {wizardStep === 1 ? "Cancel" : "Back"}
              </Button>
              {wizardStep < 4 ? (
                <Button onClick={() => setWizardStep(wizardStep + 1)}>Continue</Button>
              ) : (
                <Button onClick={resetWizard} className="gap-2 bg-success hover:bg-success/90 text-success-foreground">
                  <Check className="h-4 w-4" /> Publish Drive
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriveManagerPage;
