import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { LoginPage } from "../pages/Login/Login";
import { GoogleCallbackPage } from "../pages/Auth/GoogleCallback";
import { RegisterPage } from "../pages/Register/Register";
import { ConfirmEmailPage } from "../pages/Auth/ConfirmEmail";
import { useAuthState } from "../contexts/useAuthContext";
import { ResetPasswordPage } from "../pages/Auth/PasswordReset";
import { DashboardPage } from "../pages/Individual/Dashboard/DashboardPage";
import { TransactionsPage } from "../pages/Individual/Transactions/TransactionsPage";
import { CategoriesPage } from "../pages/Individual/CategoriesPage/CategoriesPage";
import { ImportPage } from "../pages/Individual/Import/ImportPage";
import { GroupTransactionsPage } from "../pages/Group/Transactions/GroupTransactionsPage";
import { GroupCategoriesPage } from "../pages/Group/CategoriesPage/GroupCategoriesPage";
import { GroupMembersPage } from "../pages/Group/Members/GroupMembersPage";
import { GroupDashboardPage } from "../pages/Group/Dashboard/GroupDashboardPage";
import { SettingsPage } from "../pages/Settings/SettingsPage";

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
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/individual/transactions"
          element={
            <PrivateRoute>
              <TransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/individual/categories"
          element={
            <PrivateRoute>
              <CategoriesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/individual/import"
          element={
            <PrivateRoute>
              <ImportPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:groupId/dashboard"
          element={
            <PrivateRoute>
              <GroupDashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:groupId/transactions"
          element={
            <PrivateRoute>
              <GroupTransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:groupId/categories"
          element={
            <PrivateRoute>
              <GroupCategoriesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:groupId/members"
          element={
            <PrivateRoute>
              <GroupMembersPage />
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
              <SettingsPage />
            </PrivateRoute>
          }
        />
        {/* not-found */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
