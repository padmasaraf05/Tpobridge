import { useState } from "react";
import {
  Search, ChevronLeft, ChevronRight, Eye, CheckCircle2, XCircle,
  ArrowRightCircle, X, ChevronDown, Sparkles, Building2, Briefcase,
  Calendar, IndianRupee, MessageSquare,
} from "lucide-react";
import { format } from "date-fns";

type IntentStatus = "New" | "Accepted" | "Rejected";

interface InboundIntent {
  id: number;
  company: string;
  role: string;
  ctc: number; // in lakhs
  preferredDate: string;
  status: IntentStatus;
  jd: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  receivedAt: string;
  notes: string;
}

const intents: InboundIntent[] = [
  { id: 1, company: "Flipkart", role: "SDE-1", ctc: 18, preferredDate: "2026-03-10", status: "New", jd: "We are looking for talented software engineers to join our backend team. The ideal candidate should have strong problem-solving skills, proficiency in Java/Python, and experience with distributed systems. Key responsibilities include designing scalable APIs, optimizing database queries, and collaborating with cross-functional teams.", contactName: "Rohan Mehta", contactEmail: "rohan@flipkart.com", contactPhone: "+91 98123 45678", receivedAt: "2026-02-15T10:30:00", notes: "" },
  { id: 2, company: "Razorpay", role: "Backend Engineer", ctc: 22, preferredDate: "2026-03-05", status: "New", jd: "Join our payments infrastructure team to build reliable, scalable financial systems. You'll work with Go, Kubernetes, and PostgreSQL to handle millions of transactions daily.", contactName: "Priya Das", contactEmail: "priya@razorpay.com", contactPhone: "+91 87654 12345", receivedAt: "2026-02-14T14:00:00", notes: "" },
  { id: 3, company: "PhonePe", role: "Full Stack Developer", ctc: 16, preferredDate: "2026-03-15", status: "New", jd: "Build consumer-facing financial products used by millions. React, Node.js, and AWS experience preferred.", contactName: "Arun Kumar", contactEmail: "arun@phonepe.com", contactPhone: "+91 76543 98765", receivedAt: "2026-02-13T09:00:00", notes: "" },
  { id: 4, company: "HDFC Bank", role: "Data Analyst", ctc: 12, preferredDate: "2026-02-28", status: "Accepted", jd: "Analyze banking data to drive strategic decisions. Proficiency in SQL, Python, and Tableau required.", contactName: "Sonal Jain", contactEmail: "sonal@hdfcbank.com", contactPhone: "+91 65432 87654", receivedAt: "2026-02-10T11:00:00", notes: "Good fit for MBA students." },
  { id: 5, company: "Zomato", role: "Product Manager", ctc: 20, preferredDate: "2026-03-08", status: "Accepted", jd: "Own the product lifecycle for consumer app features. 2+ years experience in product management preferred.", contactName: "Karan Verma", contactEmail: "karan@zomato.com", contactPhone: "+91 54321 76543", receivedAt: "2026-02-08T16:00:00", notes: "Converted to CRM." },
  { id: 6, company: "Byju's", role: "Content Writer", ctc: 8, preferredDate: "2026-03-01", status: "Rejected", jd: "Create engaging educational content for K-12 students across multiple subjects.", contactName: "Meera Shah", contactEmail: "meera@byjus.com", contactPhone: "+91 43210 65432", receivedAt: "2026-02-05T13:00:00", notes: "CTC too low for our students." },
];

const statusBadge: Record<IntentStatus, string> = {
  New: "bg-primary/10 text-primary",
  Accepted: "bg-success/10 text-success",
  Rejected: "bg-destructive/10 text-destructive",
};

const ITEMS_PER_PAGE = 5;

const InboundIntentPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [selectedIntent, setSelectedIntent] = useState<InboundIntent | null>(null);
  const [jdExpanded, setJdExpanded] = useState(false);

  const newCount = intents.filter((i) => i.status === "New").length;

  const filtered = intents.filter((i) => {
    if (search && !i.company.toLowerCase().includes(search.toLowerCase()) && !i.role.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "All" && i.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Inbound Intents
            {newCount > 0 && (
              <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-primary px-2 text-xs font-semibold text-primary-foreground">
                {newCount}
              </span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">Incoming recruiter interest and hiring requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search company or role..." className="w-full rounded-lg border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="relative">
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="appearance-none rounded-lg border bg-background py-2 pl-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="All">Status: All</option>
            <option value="New">New</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground bg-muted/30">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">CTC</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Preferred Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((intent) => (
                <tr
                  key={intent.id}
                  className={`border-b last:border-0 hover:bg-muted/20 transition-colors ${intent.status === "New" ? "ring-1 ring-inset ring-primary/20 bg-primary/[0.02]" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">{intent.company.charAt(0)}</div>
                      <span className="font-medium text-foreground">{intent.company}</span>
                      {intent.status === "New" && <Sparkles className="h-3.5 w-3.5 text-primary" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{intent.role}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-foreground font-medium">₹{intent.ctc} LPA</td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{format(new Date(intent.preferredDate), "MMM d, yyyy")}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[intent.status]}`}>{intent.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => { setSelectedIntent(intent); setJdExpanded(false); }} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="View Details">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">No intents found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t px-4 py-3">
          <span className="text-xs text-muted-foreground">Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedIntent && (
        <>
          <div className="fixed inset-0 z-40 bg-foreground/20" onClick={() => setSelectedIntent(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border bg-card shadow-xl animate-fade-in">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">{selectedIntent.company.charAt(0)}</div>
                  <div>
                    <h2 className="font-semibold text-foreground">{selectedIntent.company}</h2>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${statusBadge[selectedIntent.status]}`}>{selectedIntent.status}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedIntent(null)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>

              <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem icon={Briefcase} label="Role" value={selectedIntent.role} />
                  <DetailItem icon={IndianRupee} label="CTC" value={`₹${selectedIntent.ctc} LPA`} />
                  <DetailItem icon={Calendar} label="Preferred Date" value={format(new Date(selectedIntent.preferredDate), "MMM d, yyyy")} />
                  <DetailItem icon={Building2} label="Contact" value={selectedIntent.contactName} />
                </div>

                {/* JD */}
                <div>
                  <button onClick={() => setJdExpanded(!jdExpanded)} className="flex items-center gap-1 text-sm font-medium text-foreground mb-1">
                    Job Description <ChevronDown className={`h-3.5 w-3.5 transition-transform ${jdExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {jdExpanded && (
                    <div className="rounded-lg border bg-background p-3 text-sm text-muted-foreground leading-relaxed">{selectedIntent.jd}</div>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">TPO Notes</label>
                  <textarea rows={2} defaultValue={selectedIntent.notes} placeholder="Add your comments..." className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    <ArrowRightCircle className="h-4 w-4" /> Convert to CRM
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-success/10 px-4 py-2 text-sm font-medium text-success hover:bg-success/20 transition-colors">
                    <CheckCircle2 className="h-4 w-4" /> Accept
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value }: { icon: typeof Building2; label: string; value: string }) => (
  <div className="flex items-start gap-2">
    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"><Icon className="h-3.5 w-3.5" /></div>
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  </div>
);

export default InboundIntentPage;

export const getNewIntentCount = () => intents.filter((i) => i.status === "New").length;
