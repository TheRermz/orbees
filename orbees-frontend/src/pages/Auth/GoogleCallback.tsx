import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokenStorage } from "../../helpers/storage";

export const GoogleCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      tokenStorage.set(token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login?error=google_auth_failed", { replace: true });
    }
  }, [searchParams, navigate]);

  return null;
};
