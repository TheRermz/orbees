import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
