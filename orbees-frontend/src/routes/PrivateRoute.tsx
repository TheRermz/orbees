import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthState } from "../contexts/useAuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, initializing } = useAuthState();

  if (initializing) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
