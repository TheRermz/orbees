import { createContext } from "react";
import type { GroupStateContextData, GroupActionsContextData } from "./GroupContext.types";

export const GroupStateContext = createContext<GroupStateContextData>(
  {} as GroupStateContextData
);
export const GroupActionsContext = createContext<GroupActionsContextData>(
  {} as GroupActionsContextData
);
