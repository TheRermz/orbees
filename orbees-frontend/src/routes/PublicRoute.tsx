// src/routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/useAuthContext";
import type { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return null;

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};
