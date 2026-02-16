import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import RecruiterCRMPage from "./pages/RecruiterCRMPage";
import InboundIntentPage from "./pages/InboundIntentPage";
import OutboundLinksPage from "./pages/OutboundLinksPage";
import DriveManagerPage from "./pages/DriveManagerPage";
import DriveDetailPage from "./pages/DriveDetailPage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import AdminFeedPage from "./pages/AdminFeedPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import SettingsPage from "./pages/SettingsPage";
import ReportsPage from "./pages/ReportsPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              {/* TPO routes */}
              <Route index element={<ProtectedRoute allowedRoles={["tpo"]}><DashboardPage /></ProtectedRoute>} />
              <Route path="crm" element={<ProtectedRoute allowedRoles={["tpo"]}><RecruiterCRMPage /></ProtectedRoute>} />
              <Route path="inbound" element={<ProtectedRoute allowedRoles={["tpo"]}><InboundIntentPage /></ProtectedRoute>} />
              <Route path="outbound" element={<ProtectedRoute allowedRoles={["tpo"]}><OutboundLinksPage /></ProtectedRoute>} />
              <Route path="drives" element={<ProtectedRoute allowedRoles={["tpo"]}><DriveManagerPage /></ProtectedRoute>} />
              <Route path="drives/:driveId" element={<ProtectedRoute allowedRoles={["tpo"]}><DriveDetailPage /></ProtectedRoute>} />
              <Route path="reports" element={<ProtectedRoute allowedRoles={["tpo"]}><ReportsPage /></ProtectedRoute>} />
              {/* Feed - TPO reads, Admin creates */}
              <Route path="feed" element={<ProtectedRoute allowedRoles={["tpo", "admin"]}><AdminFeedPage /></ProtectedRoute>} />
              {/* Owner route */}
              <Route path="owner" element={<ProtectedRoute allowedRoles={["owner"]}><OwnerDashboardPage /></ProtectedRoute>} />
              {/* Admin routes */}
              <Route path="admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPanelPage /></ProtectedRoute>} />
              <Route path="admin/users" element={<ProtectedRoute allowedRoles={["admin"]}><PlaceholderPage title="Users Management" /></ProtectedRoute>} />
              <Route path="admin/plans" element={<ProtectedRoute allowedRoles={["admin"]}><PlaceholderPage title="Plans & Billing" /></ProtectedRoute>} />
              <Route path="admin/analytics" element={<ProtectedRoute allowedRoles={["admin"]}><PlaceholderPage title="Platform Analytics" /></ProtectedRoute>} />
              <Route path="admin/logs" element={<ProtectedRoute allowedRoles={["admin"]}><PlaceholderPage title="System Logs" /></ProtectedRoute>} />
              {/* Student route */}
              <Route path="student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboardPage /></ProtectedRoute>} />
              {/* Settings - all roles */}
              <Route path="settings" element={<ProtectedRoute allowedRoles={["tpo", "owner", "admin", "student"]}><SettingsPage /></ProtectedRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
