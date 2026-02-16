import { useState } from "react";
import {
  Search, Plus, Filter, ChevronDown, ChevronLeft, ChevronRight,
  Edit2, Eye, Trash2, Building2, Phone, Calendar, X,
  Clock, FileText, Upload, Download, Users, MessageSquare,
  CheckCircle2, AlertCircle, Send,
} from "lucide-react";
import { format } from "date-fns";

// ── Sample Data ──
type Stage = "Contacted" | "Scheduled" | "Completed";
type Industry = "IT" | "Finance" | "Consulting" | "Manufacturing" | "Healthcare";

interface Recruiter {
  id: number;
  company: string;
  industry: Industry;
  hrName: string;
  hrPhone: string;
  lastContact: string;
  stage: Stage;
  nextFollowUp: string;
  assignedTo: string;
  address: string;
  email: string;
  website: string;
  notes: string;
  timeline: { date: string; action: string; user: string }[];
  documents: { name: string; type: string; date: string }[];
  drives: { date: string; role: string; registrations: number; offers: number; status: string }[];
}

const recruiters: Recruiter[] = [
  { id: 1, company: "Google India", industry: "IT", hrName: "Priya Sharma", hrPhone: "+91 98765 43210", lastContact: "2026-02-14", stage: "Scheduled", nextFollowUp: "2026-02-20", assignedTo: "Dr. Mehta", address: "Bangalore, Karnataka", email: "hr@google.com", website: "google.com", notes: "Interested in CS and AI students.", timeline: [{ date: "2026-02-14", action: "Confirmed campus visit for Feb 25", user: "Dr. Mehta" }, { date: "2026-02-10", action: "Sent initial outreach email", user: "Admin" }, { date: "2026-02-05", action: "Added to CRM", user: "Admin" }], documents: [{ name: "Campus_Agreement_2026.pdf", type: "pdf", date: "2026-02-10" }, { name: "JD_SDE1.docx", type: "doc", date: "2026-02-12" }], drives: [{ date: "2025-09-15", role: "SDE-1", registrations: 450, offers: 12, status: "Completed" }] },
  { id: 2, company: "Microsoft", industry: "IT", hrName: "Rahul Verma", hrPhone: "+91 87654 32109", lastContact: "2026-02-13", stage: "Contacted", nextFollowUp: "2026-02-18", assignedTo: "Prof. Singh", address: "Hyderabad, Telangana", email: "hr@microsoft.com", website: "microsoft.com", notes: "Looking for full-stack developers.", timeline: [{ date: "2026-02-13", action: "Updated JD for SDE-2 role", user: "Prof. Singh" }, { date: "2026-02-08", action: "Initial call completed", user: "Dr. Mehta" }], documents: [{ name: "MOU_2026.pdf", type: "pdf", date: "2026-02-08" }], drives: [{ date: "2025-10-20", role: "SDE-2", registrations: 320, offers: 8, status: "Completed" }, { date: "2025-03-10", role: "PM Intern", registrations: 180, offers: 5, status: "Completed" }] },
  { id: 3, company: "Deloitte", industry: "Consulting", hrName: "Anita Kapoor", hrPhone: "+91 76543 21098", lastContact: "2026-02-12", stage: "Completed", nextFollowUp: "2026-03-01", assignedTo: "Dr. Mehta", address: "Mumbai, Maharashtra", email: "hr@deloitte.com", website: "deloitte.com", notes: "Annual hiring partner.", timeline: [{ date: "2026-02-12", action: "Sent offer letters to 32 students", user: "Anita Kapoor" }, { date: "2026-02-05", action: "Completed interview rounds", user: "Dr. Mehta" }], documents: [{ name: "Agreement_Deloitte.pdf", type: "pdf", date: "2026-01-15" }], drives: [{ date: "2026-02-05", role: "Analyst", registrations: 280, offers: 32, status: "Completed" }] },
  { id: 4, company: "JP Morgan", industry: "Finance", hrName: "Sanjay Patel", hrPhone: "+91 65432 10987", lastContact: "2026-02-11", stage: "Scheduled", nextFollowUp: "2026-02-22", assignedTo: "Prof. Singh", address: "Mumbai, Maharashtra", email: "hr@jpmorgan.com", website: "jpmorgan.com", notes: "Hiring for quant and tech roles.", timeline: [{ date: "2026-02-11", action: "Drive confirmed for Feb 25", user: "Prof. Singh" }], documents: [], drives: [] },
  { id: 5, company: "Siemens", industry: "Manufacturing", hrName: "Kavita Desai", hrPhone: "+91 54321 09876", lastContact: "2026-02-09", stage: "Contacted", nextFollowUp: "2026-02-17", assignedTo: "Dr. Mehta", address: "Pune, Maharashtra", email: "hr@siemens.com", website: "siemens.com", notes: "Interested in mechanical and electrical students.", timeline: [{ date: "2026-02-09", action: "Sent college brochure", user: "Dr. Mehta" }], documents: [], drives: [{ date: "2025-08-20", role: "Graduate Engineer", registrations: 200, offers: 15, status: "Completed" }] },
  { id: 6, company: "Apollo Hospitals", industry: "Healthcare", hrName: "Dr. Renu Gupta", hrPhone: "+91 43210 98765", lastContact: "2026-02-07", stage: "Contacted", nextFollowUp: "2026-02-16", assignedTo: "Prof. Singh", address: "Chennai, Tamil Nadu", email: "hr@apollo.com", website: "apollohospitals.com", notes: "First-time recruiter.", timeline: [{ date: "2026-02-07", action: "Introductory call completed", user: "Prof. Singh" }], documents: [], drives: [] },
  { id: 7, company: "Infosys", industry: "IT", hrName: "Amit Joshi", hrPhone: "+91 32109 87654", lastContact: "2026-02-06", stage: "Completed", nextFollowUp: "2026-03-05", assignedTo: "Dr. Mehta", address: "Mysore, Karnataka", email: "hr@infosys.com", website: "infosys.com", notes: "Long-term partner.", timeline: [{ date: "2026-02-06", action: "All DOJs confirmed", user: "Admin" }], documents: [{ name: "Infosys_MOU.pdf", type: "pdf", date: "2025-12-01" }], drives: [{ date: "2026-01-15", role: "System Engineer", registrations: 510, offers: 45, status: "Completed" }] },
  { id: 8, company: "Accenture", industry: "Consulting", hrName: "Neha Reddy", hrPhone: "+91 21098 76543", lastContact: "2026-02-04", stage: "Scheduled", nextFollowUp: "2026-02-19", assignedTo: "Prof. Singh", address: "Bangalore, Karnataka", email: "hr@accenture.com", website: "accenture.com", notes: "Multiple roles available.", timeline: [{ date: "2026-02-04", action: "Drive date finalized", user: "Prof. Singh" }], documents: [{ name: "JD_ASE.pdf", type: "pdf", date: "2026-02-03" }], drives: [{ date: "2025-11-10", role: "ASE", registrations: 415, offers: 28, status: "Completed" }] },
];

const stages: Stage[] = ["Contacted", "Scheduled", "Completed"];
const industries: Industry[] = ["IT", "Finance", "Consulting", "Manufacturing", "Healthcare"];
const assignees = ["Dr. Mehta", "Prof. Singh", "Admin"];

const stageBadge: Record<Stage, string> = {
  Contacted: "bg-warning/10 text-warning",
  Scheduled: "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
};
const industryBadge: Record<Industry, string> = {
  IT: "bg-primary/10 text-primary",
  Finance: "bg-success/10 text-success",
  Consulting: "bg-accent text-accent-foreground",
  Manufacturing: "bg-warning/10 text-warning",
  Healthcare: "bg-destructive/10 text-destructive",
};

const ITEMS_PER_PAGE = 6;

const RecruiterCRMPage = () => {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("All");
  const [industryFilter, setIndustryFilter] = useState<string>("All");
  const [assignedFilter, setAssignedFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  const [detailTab, setDetailTab] = useState<"overview" | "timeline" | "documents" | "drives">("overview");
  const [newNote, setNewNote] = useState("");

  const filtered = recruiters.filter((r) => {
    if (search && !r.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (stageFilter !== "All" && r.stage !== stageFilter) return false;
    if (industryFilter !== "All" && r.industry !== industryFilter) return false;
    if (assignedFilter !== "All" && r.assignedTo !== assignedFilter) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Recruiter CRM</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} companies in pipeline</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors self-start">
          <Plus className="h-4 w-4" /> Add Recruiter
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search company..."
            className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <SelectFilter label="Stage" value={stageFilter} options={["All", ...stages]} onChange={(v) => { setStageFilter(v); setPage(1); }} />
        <SelectFilter label="Industry" value={industryFilter} options={["All", ...industries]} onChange={(v) => { setIndustryFilter(v); setPage(1); }} />
        <SelectFilter label="Assigned" value={assignedFilter} options={["All", ...assignees]} onChange={(v) => { setAssignedFilter(v); setPage(1); }} />
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground bg-muted/30">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Industry</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">HR Contact</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Last Contact</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Next Follow-up</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                        {r.company.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{r.company}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${industryBadge[r.industry]}`}>
                      {r.industry}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-foreground text-sm">{r.hrName}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" />{r.hrPhone}</div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{format(new Date(r.lastContact), "MMM d, yyyy")}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${stageBadge[r.stage]}`}>
                      {r.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                    <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{format(new Date(r.nextFollowUp), "MMM d, yyyy")}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setSelectedRecruiter(r); setDetailTab("overview"); }} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="View">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="Edit">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">No recruiters found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <span className="text-xs text-muted-foreground">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`h-7 w-7 rounded-md text-xs font-medium transition-colors ${page === i + 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>
                {i + 1}
              </button>
            ))}
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedRecruiter && (
        <>
          <div className="fixed inset-0 z-40 bg-foreground/20" onClick={() => setSelectedRecruiter(null)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto border-l bg-card shadow-xl animate-fade-in">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
                  {selectedRecruiter.company.charAt(0)}
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{selectedRecruiter.company}</h2>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${stageBadge[selectedRecruiter.stage]}`}>
                    {selectedRecruiter.stage}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedRecruiter(null)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-5">
              {(["overview", "timeline", "documents", "drives"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`px-3 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                    detailTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "drives" ? "Drive History" : tab}
                </button>
              ))}
            </div>

            <div className="p-5">
              {detailTab === "overview" && <OverviewTab r={selectedRecruiter} />}
              {detailTab === "timeline" && <TimelineTab r={selectedRecruiter} newNote={newNote} setNewNote={setNewNote} />}
              {detailTab === "documents" && <DocumentsTab r={selectedRecruiter} />}
              {detailTab === "drives" && <DrivesTab r={selectedRecruiter} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ── Sub-components ──

const SelectFilter = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none rounded-lg border bg-background py-2 pl-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o === "All" ? `${label}: All` : o}</option>
      ))}
    </select>
    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
  </div>
);

const OverviewTab = ({ r }: { r: Recruiter }) => (
  <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-2">
      <InfoItem icon={Building2} label="Address" value={r.address} />
      <InfoItem icon={Phone} label="Phone" value={r.hrPhone} />
      <InfoItem icon={Send} label="Email" value={r.email} />
      <InfoItem icon={Calendar} label="Next Follow-up" value={format(new Date(r.nextFollowUp), "MMM d, yyyy")} />
    </div>
    <div>
      <h3 className="text-sm font-medium text-foreground mb-2">HR Contacts</h3>
      <div className="rounded-lg border bg-background p-3 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"><Users className="h-4 w-4" /></div>
        <div>
          <div className="text-sm font-medium text-foreground">{r.hrName}</div>
          <div className="text-xs text-muted-foreground">{r.hrPhone} · {r.email}</div>
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-sm font-medium text-foreground mb-1">Notes</h3>
      <p className="text-sm text-muted-foreground">{r.notes}</p>
    </div>
    <button className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
      <Edit2 className="h-4 w-4" /> Edit Details
    </button>
  </div>
);

const InfoItem = ({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) => (
  <div className="flex items-start gap-2.5">
    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"><Icon className="h-3.5 w-3.5" /></div>
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  </div>
);

const TimelineTab = ({ r, newNote, setNewNote }: { r: Recruiter; newNote: string; setNewNote: (v: string) => void }) => (
  <div className="space-y-5">
    <div className="flex gap-2">
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Add a note..."
        className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
        <MessageSquare className="h-4 w-4" />
      </button>
    </div>
    <div className="relative space-y-4 pl-6 before:absolute before:left-2.5 before:top-1 before:bottom-1 before:w-px before:bg-border">
      {r.timeline.map((t, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full border bg-card">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div className="text-xs text-muted-foreground mb-0.5">{format(new Date(t.date), "MMM d, yyyy")} · {t.user}</div>
          <div className="text-sm text-foreground">{t.action}</div>
        </div>
      ))}
    </div>
  </div>
);

const DocumentsTab = ({ r }: { r: Recruiter }) => (
  <div className="space-y-4">
    <button className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
      <Upload className="h-4 w-4" /> Upload Document
    </button>
    {r.documents.length === 0 ? (
      <p className="text-sm text-muted-foreground py-8 text-center">No documents uploaded yet.</p>
    ) : (
      <div className="space-y-2">
        {r.documents.map((d, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border bg-background p-3">
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium text-foreground">{d.name}</div>
                <div className="text-xs text-muted-foreground">{format(new Date(d.date), "MMM d, yyyy")}</div>
              </div>
            </div>
            <button className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const DrivesTab = ({ r }: { r: Recruiter }) => (
  <div className="space-y-3">
    {r.drives.length === 0 ? (
      <p className="text-sm text-muted-foreground py-8 text-center">No past drives with this company.</p>
    ) : (
      r.drives.map((d, i) => (
        <div key={i} className="rounded-lg border bg-background p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{d.role}</span>
            <span className="text-xs text-muted-foreground">{format(new Date(d.date), "MMM d, yyyy")}</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">{d.registrations}</div>
              <div className="text-[11px] text-muted-foreground">Registrations</div>
            </div>
            <div>
              <div className="text-lg font-bold text-success">{d.offers}</div>
              <div className="text-[11px] text-muted-foreground">Offers</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{((d.offers / d.registrations) * 100).toFixed(1)}%</div>
              <div className="text-[11px] text-muted-foreground">Conversion</div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);

export default RecruiterCRMPage;
