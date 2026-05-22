import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../pages/Login/Login";

// rotas das páginas

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <h1>Register</h1>
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

        {/* fallback */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
