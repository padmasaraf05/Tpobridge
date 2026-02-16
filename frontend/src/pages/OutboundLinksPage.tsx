import { useState } from "react";
import {
  Plus, Copy, ChevronLeft, ChevronRight, Eye, ExternalLink,
  X, BarChart3, MousePointer, Users, Clock, Check,
} from "lucide-react";
import { format } from "date-fns";

interface PromoLink {
  id: number;
  name: string;
  url: string;
  created: string;
  views: number;
  clicks: number;
  status: "Active" | "Inactive";
  visitors: { time: string; source: string }[];
}

const links: PromoLink[] = [
  { id: 1, name: "Campus Placement Brochure 2026", url: "https://tpobridge.com/promo/campus-2026", created: "2026-01-15", views: 1240, clicks: 387, status: "Active", visitors: [{ time: "2026-02-16T09:30:00", source: "Email" }, { time: "2026-02-16T08:15:00", source: "LinkedIn" }, { time: "2026-02-15T17:00:00", source: "WhatsApp" }, { time: "2026-02-15T14:30:00", source: "Direct" }, { time: "2026-02-14T11:00:00", source: "Email" }] },
  { id: 2, name: "IT Companies Info Pack", url: "https://tpobridge.com/promo/it-pack", created: "2026-01-20", views: 890, clicks: 234, status: "Active", visitors: [{ time: "2026-02-16T07:00:00", source: "LinkedIn" }, { time: "2026-02-15T20:00:00", source: "Email" }, { time: "2026-02-15T13:00:00", source: "Direct" }] },
  { id: 3, name: "Student Achievements Showcase", url: "https://tpobridge.com/promo/achievements", created: "2026-02-01", views: 560, clicks: 145, status: "Active", visitors: [{ time: "2026-02-15T16:00:00", source: "WhatsApp" }, { time: "2026-02-14T09:00:00", source: "Email" }] },
  { id: 4, name: "Winter Internship Drive", url: "https://tpobridge.com/promo/winter-intern", created: "2025-11-10", views: 2100, clicks: 678, status: "Inactive", visitors: [{ time: "2026-01-10T12:00:00", source: "Email" }] },
  { id: 5, name: "Alumni Network Connect", url: "https://tpobridge.com/promo/alumni", created: "2026-02-05", views: 320, clicks: 89, status: "Active", visitors: [{ time: "2026-02-16T06:00:00", source: "LinkedIn" }, { time: "2026-02-15T19:00:00", source: "Direct" }] },
];

const OutboundLinksPage = () => {
  const [selectedLink, setSelectedLink] = useState<PromoLink | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyUrl = (link: PromoLink) => {
    navigator.clipboard.writeText(link.url);
    setCopiedId(link.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Outbound Links</h1>
          <p className="text-sm text-muted-foreground">Create and track promotional links for recruiters</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors self-start">
          <Plus className="h-4 w-4" /> Create New Link
        </button>
      </div>

      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground bg-muted/30">
                <th className="px-4 py-3 font-medium">Link Name</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Created</th>
                <th className="px-4 py-3 font-medium">Views</th>
                <th className="px-4 py-3 font-medium">Clicks</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">CTR</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{link.name}</span>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">{link.url}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{format(new Date(link.created), "MMM d, yyyy")}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{link.views.toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{link.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{((link.clicks / link.views) * 100).toFixed(1)}%</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${link.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {link.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => copyUrl(link)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="Copy Link">
                        {copiedId === link.id ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <button onClick={() => setSelectedLink(link)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="Analytics">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Modal */}
      {selectedLink && (
        <>
          <div className="fixed inset-0 z-40 bg-foreground/20" onClick={() => setSelectedLink(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl border bg-card shadow-xl animate-fade-in">
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-5 py-4">
                <h2 className="font-semibold text-foreground">Link Analytics</h2>
                <button onClick={() => setSelectedLink(null)} className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-5 space-y-5">
                <div>
                  <div className="text-sm font-medium text-foreground">{selectedLink.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedLink.url}</div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <MetricCard icon={Users} label="Views" value={selectedLink.views.toLocaleString()} />
                  <MetricCard icon={MousePointer} label="Clicks" value={selectedLink.clicks.toLocaleString()} />
                  <MetricCard icon={BarChart3} label="CTR" value={`${((selectedLink.clicks / selectedLink.views) * 100).toFixed(1)}%`} />
                </div>

                {/* Recent Visitors */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Recent Visitors</h3>
                  <div className="space-y-2">
                    {selectedLink.visitors.map((v, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border bg-background p-3">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {format(new Date(v.time), "MMM d, h:mm a")}
                        </div>
                        <span className="inline-flex rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">{v.source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) => (
  <div className="rounded-lg border bg-background p-3 text-center">
    <Icon className="mx-auto mb-1 h-4 w-4 text-primary" />
    <div className="text-lg font-bold text-foreground">{value}</div>
    <div className="text-[11px] text-muted-foreground">{label}</div>
  </div>
);

export default OutboundLinksPage;
