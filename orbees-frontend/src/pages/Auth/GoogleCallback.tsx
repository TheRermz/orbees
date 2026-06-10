import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuthActions } from "../../contexts/useAuthContext";

export const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuthActions();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      navigate("/login?error=google_auth_failed", { replace: true });
      return;
    }

    authService
      .exchangeCode(code)
      .then(({ token }) => loginWithToken(token))
      .then((result) => {
        if (result.success) {
          navigate("/individual/dashboard", { replace: true });
        } else {
          navigate("/login?error=google_auth_failed", { replace: true });
        }
      })
      .catch(() => {
        navigate("/login?error=google_auth_failed", { replace: true });
      });
  }, [code, navigate, loginWithToken]);

  return null;
};
