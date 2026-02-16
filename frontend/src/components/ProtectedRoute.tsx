import { Navigate } from "react-router-dom";
import { useAuth, UserRole, roleDefaultRoute } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={roleDefaultRoute[user.role]} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
