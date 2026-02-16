import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "tpo" | "owner" | "admin" | "student";

interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const roleDefaultRoute: Record<UserRole, string> = {
  tpo: "/dashboard",
  owner: "/dashboard/owner",
  admin: "/dashboard/admin",
  student: "/dashboard/student",
};

const roleLabelMap: Record<UserRole, string> = {
  tpo: "TPO",
  owner: "Owner",
  admin: "Admin",
  student: "Student",
};

export { roleDefaultRoute, roleLabelMap };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("tpobridge_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, _password: string, role: UserRole) => {
    const newUser: AuthUser = {
      name: roleLabelMap[role] + " User",
      email,
      role,
    };
    setUser(newUser);
    localStorage.setItem("tpobridge_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tpobridge_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
