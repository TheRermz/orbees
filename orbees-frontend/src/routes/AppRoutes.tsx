import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../pages/Login/Login";
import { useAuthContext } from "../contexts/useAuthContext";
import { GoogleCallbackPage } from "../pages/Auth/GoogleCallback";
import { RegisterPage } from "../pages/Register/Register";
import { ConfirmEmailPage } from "../pages/Auth/ConfirmEmail";

// rotas das páginas

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        {/* raiz */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />

        {/* públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route path="/auth/callback" element={<GoogleCallbackPage />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <h1>Forgot Password</h1>
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <h1>Reset Password</h1>
            </PublicRoute>
          }
        />

        <Route
          path="/auth/confirm-email"
          element={
            <PublicRoute>
              <ConfirmEmailPage />
            </PublicRoute>
          }
        />

        <Route
          path="/not-found"
          element={
            <PublicRoute>
              <h1>Not Found</h1>
            </PublicRoute>
          }
        />

        {/* privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <h1>Dashboard</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <h1>Transactions</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <h1>Categories</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <PrivateRoute>
              <h1>Groups</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <h1>Profile</h1>
            </PrivateRoute>
          }
        />

        {/* not-found */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
