import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../pages/Login/Login";
import { GoogleCallbackPage } from "../pages/Auth/GoogleCallback";
import { RegisterPage } from "../pages/Register/Register";
import { ConfirmEmailPage } from "../pages/Auth/ConfirmEmail";
import { useAuthState } from "../contexts/useAuthContext";
import { ResetPasswordPage } from "../pages/Auth/PasswordReset";

// rotas das páginas

export const AppRoutes = () => {
  const { isAuthenticated } = useAuthState();

  return (
    <BrowserRouter>
      <Routes>
        {/* raiz */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/individual/dashboard" : "/login"}
              replace
            />
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
          path="/auth/reset-password"
          element={
            <PublicRoute>
              <ResetPasswordPage />
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
          path="/individual/dashboard"
          element={
            <PrivateRoute>
              <h1>Dashboard Individual</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/individual/transactions"
          element={
            <PrivateRoute>
              <h1>Transações</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/individual/categories"
          element={
            <PrivateRoute>
              <h1>Categorias</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/individual/import"
          element={
            <PrivateRoute>
              <h1>Importar Extrato</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/group/dashboard"
          element={
            <PrivateRoute>
              <h1>Dashboard Grupo</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/group/transactions"
          element={
            <PrivateRoute>
              <h1>Transações Grupo</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/group/categories"
          element={
            <PrivateRoute>
              <h1>Categorias Grupo</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/group/members"
          element={
            <PrivateRoute>
              <h1>Membros</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/education/home"
          element={
            <PrivateRoute>
              <h1>Educação Financeira</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/education/fundamentals"
          element={
            <PrivateRoute>
              <h1>Fundamentos</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/education/law"
          element={
            <PrivateRoute>
              <h1>Direito e Tributos</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/education/calculators"
          element={
            <PrivateRoute>
              <h1>Calculadoras</h1>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <h1>Configurações</h1>
            </PrivateRoute>
          }
        />
        {/* not-found */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
