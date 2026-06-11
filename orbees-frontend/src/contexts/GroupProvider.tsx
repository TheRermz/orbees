import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { GroupStateContext, GroupActionsContext } from "./GroupContext";
import { groupService } from "../services/groupService";
import { useAuthState } from "./useAuthContext";

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, initializing } = useAuthState();
  const [groupId, setGroupId] = useState<string | null>(null);
  const [groupLoaded, setGroupLoaded] = useState(false);

  const refreshGroup = useCallback(async () => {
    const groups = await groupService.getMyGroups();
    setGroupId(groups.length > 0 ? groups[0].id : null);
    setGroupLoaded(true);
  }, []);

  const clearGroup = useCallback(() => {
    setGroupId(null);
    setGroupLoaded(false);
  }, []);

  useEffect(() => {
    if (!initializing && isAuthenticated) refreshGroup();
    if (!initializing && !isAuthenticated) clearGroup();
  }, [isAuthenticated, initializing, refreshGroup, clearGroup]);

  return (
    <GroupActionsContext.Provider value={{ refreshGroup, clearGroup }}>
      <GroupStateContext.Provider value={{ groupId, groupLoaded }}>
        {children}
      </GroupStateContext.Provider>
    </GroupActionsContext.Provider>
  );
};
