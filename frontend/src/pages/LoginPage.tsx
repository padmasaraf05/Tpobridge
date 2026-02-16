import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useAuth, UserRole, roleDefaultRoute } from "@/contexts/AuthContext";

const roles: { label: string; value: UserRole }[] = [
  { label: "TPO", value: "tpo" },
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
  { label: "Student", value: "student" },
];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("tpo");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") return;
    login(email, password, role);
    navigate(roleDefaultRoute[role]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TPOBridge</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Sign in to your account" : "Reset your password"}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@college.edu" required
              />
            </div>

            {mode === "login" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="••••••••" required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    {roles.map((r) => (
                      <button key={r.value} type="button" onClick={() => setRole(r.value)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          role === r.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "bg-background text-muted-foreground hover:bg-accent"
                        }`}>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button type="submit"
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              {mode === "login" ? "Sign In" : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-4 text-center">
            {mode === "login" ? (
              <button onClick={() => setMode("forgot")} className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            ) : (
              <button onClick={() => setMode("login")} className="text-sm text-primary hover:underline">
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
