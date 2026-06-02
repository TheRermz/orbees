import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokenStorage } from "../../helpers/storage";
import { authService } from "../../services/authService";

export const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      navigate("/login?error=google_auth_failed", { replace: true });
      return;
    }

    authService
      .exchangeCode(code)
      .then(({ token }) => {
        tokenStorage.set(token);
        navigate("/individual/dashboard", { replace: true });
      })
      .catch(() => {
        navigate("/login?error=google_auth_failed", { replace: true });
      });
  }, [searchParams, navigate]);

  return null;
};
