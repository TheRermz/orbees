import { createContext } from "react";
import type {
  AuthStateContextData,
  AuthActionsContextData,
} from "./AuthContext.types";

export const AuthStateContext = createContext<AuthStateContextData>(
  {} as AuthStateContextData
);
export const AuthActionsContext = createContext<AuthActionsContextData>(
  {} as AuthActionsContextData
);
