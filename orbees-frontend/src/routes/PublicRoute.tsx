import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthState } from "../contexts/useAuthContext";

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, initializing } = useAuthState();

  if (initializing) return null;

  if (isAuthenticated) return <Navigate to="/individual/dashboard" replace />;

  return <>{children}</>;
};
