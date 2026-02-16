import { useState } from "react";
import { User, Lock, Bell, Building2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({ title: "Settings updated", description: `${section} saved successfully.` });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="college">College</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="shadow-card">
            <CardHeader className="pb-4"><CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4" /> Profile Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="Admin User" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="admin@college.edu" disabled /></div>
                <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
                <div className="space-y-2"><Label>Designation</Label><Input defaultValue="Training & Placement Officer" /></div>
              </div>
              <Button className="gap-2" onClick={() => handleSave("Profile")}><Save className="h-4 w-4" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card className="shadow-card">
            <CardHeader className="pb-4"><CardTitle className="text-base flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
              <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" /></div>
              <Button className="gap-2" onClick={() => handleSave("Password")}><Save className="h-4 w-4" /> Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-card">
            <CardHeader className="pb-4"><CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" /> Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Drive updates", desc: "New drives, round updates, offer alerts", default: true },
                { label: "Follow-up reminders", desc: "Recruiter follow-up notifications", default: true },
                { label: "Inbound intents", desc: "New company interest notifications", default: true },
                { label: "System announcements", desc: "Platform updates and maintenance", default: false },
                { label: "Email notifications", desc: "Receive notifications via email", default: true },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch defaultChecked={n.default} />
                </div>
              ))}
              <Button className="gap-2" onClick={() => handleSave("Notifications")}><Save className="h-4 w-4" /> Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="college">
          <Card className="shadow-card">
            <CardHeader className="pb-4"><CardTitle className="text-base flex items-center gap-2"><Building2 className="h-4 w-4" /> College Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>College Name</Label><Input defaultValue="ABC Institute of Technology" /></div>
                <div className="space-y-2"><Label>University Affiliation</Label><Input defaultValue="XYZ University" /></div>
                <div className="space-y-2"><Label>City</Label><Input defaultValue="Mumbai" /></div>
                <div className="space-y-2"><Label>State</Label><Input defaultValue="Maharashtra" /></div>
              </div>
              <div className="space-y-2"><Label>Address</Label><Textarea defaultValue="123, College Road, Mumbai - 400001" rows={2} /></div>
              <Button className="gap-2" onClick={() => handleSave("College settings")}><Save className="h-4 w-4" /> Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
