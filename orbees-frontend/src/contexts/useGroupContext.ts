import { useContext } from "react";
import { GroupStateContext, GroupActionsContext } from "./GroupContext";

export const useGroupState = () => useContext(GroupStateContext);
export const useGroupActions = () => useContext(GroupActionsContext);
