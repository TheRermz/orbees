export interface GroupStateContextData {
  groupId: string | null;
  groupLoaded: boolean;
}

export interface GroupActionsContextData {
  refreshGroup: () => Promise<void>;
  clearGroup: () => void;
}
