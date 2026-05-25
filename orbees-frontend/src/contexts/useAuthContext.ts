import { useContext } from "react";
import { AuthStateContext, AuthActionsContext } from "./AuthContext";

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthActions = () => useContext(AuthActionsContext);
