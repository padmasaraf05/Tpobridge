import { useState } from "react";
import {
  Plus, Bookmark, HandHeart, UserPlus, Tag, Paperclip, Eye,
  Send, ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const feedPosts = [
  {
    id: "1", title: "Infosys Hiring for SDE-II Roles", description: "Infosys is looking to hire SDE-II engineers for their Bangalore and Hyderabad offices. CTC range 8-12 LPA. They are open to campus drives in Feb-March.",
    tags: ["Hiring", "IT"], date: "2025-02-14", audience: "All", interested: 12, introRequested: 5,
  },
  {
    id: "2", title: "New Government Placement Guidelines 2025", description: "AICTE has released updated guidelines for campus placement processes. Key changes include mandatory cooling-off periods and CTC disclosure norms.",
    tags: ["Policy", "AICTE"], date: "2025-02-12", audience: "All", interested: 28, introRequested: 0,
  },
  {
    id: "3", title: "Amazon AWS Academy Partnership", description: "Amazon AWS is offering free cloud training programs for engineering colleges. Colleges can register their students for AWS Academy and earn certifications.",
    tags: ["Training", "Cloud"], date: "2025-02-10", audience: "Maharashtra", interested: 18, introRequested: 8,
  },
  {
    id: "4", title: "Wipro Off-Campus Drive – March 2025", description: "Wipro is conducting an off-campus drive for 2025 batch. Eligible branches: CS, IT, ECE. Minimum CGPA 6.5. Register via link.",
    tags: ["Hiring", "Off-Campus"], date: "2025-02-08", audience: "All", interested: 34, introRequested: 15,
  },
];

const AdminFeedPage = () => {
  const [view, setView] = useState<"feed" | "create">("feed");
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [newPost, setNewPost] = useState({ title: "", description: "", link: "", tags: "", audience: "all" });

  const toggleSave = (id: string) => {
    setSavedPosts((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  if (view === "create") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setView("feed")} className="gap-1 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Create Post</h1>
        </div>
        <Card className="shadow-card max-w-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} placeholder="Post title" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={newPost.description} onChange={(e) => setNewPost({ ...newPost, description: e.target.value })} placeholder="Write post content..." rows={6} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Link (optional)</Label>
                <Input value={newPost.link} onChange={(e) => setNewPost({ ...newPost, link: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input value={newPost.tags} onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })} placeholder="Hiring, Policy, Training" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Target Audience</Label>
              <Select value={newPost.audience} onValueChange={(v) => setNewPost({ ...newPost, audience: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <Button variant="outline" className="gap-1"><Paperclip className="h-4 w-4" /> Attach File</Button>
              <Button variant="outline" className="gap-1"><Eye className="h-4 w-4" /> Preview</Button>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setView("feed")}>Cancel</Button>
              <Button className="gap-2" onClick={() => setView("feed")}><Send className="h-4 w-4" /> Publish</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Feed</h1>
          <p className="text-sm text-muted-foreground">Announcements, opportunities, and updates</p>
        </div>
        <Button onClick={() => setView("create")} className="gap-2"><Plus className="h-4 w-4" /> Create Post</Button>
      </div>

      <div className="space-y-4 max-w-3xl">
        {feedPosts.map((post) => (
          <Card key={post.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{post.title}</h3>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    <Badge variant="outline" className="text-[10px]">{post.audience === "All" ? "All Colleges" : post.audience}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className={`h-8 w-8 shrink-0 ${savedPosts.includes(post.id) ? "text-primary" : "text-muted-foreground"}`} onClick={() => toggleSave(post.id)}>
                  <Bookmark className="h-4 w-4" fill={savedPosts.includes(post.id) ? "currentColor" : "none"} />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                  <HandHeart className="h-3.5 w-3.5" /> Interested ({post.interested})
                </Button>
                <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
                  <UserPlus className="h-3.5 w-3.5" /> Request Intro ({post.introRequested})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminFeedPage;
