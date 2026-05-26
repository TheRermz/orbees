import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthState } from "../contexts/useAuthContext";
import { MainLayout } from "../components/Layouts";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, initializing } = useAuthState();

  if (initializing) return null;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <MainLayout>{children}</MainLayout>;
};
