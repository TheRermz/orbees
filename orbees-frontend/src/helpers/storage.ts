export const storage = {
  get: (key: string): string | null => localStorage.getItem(key),
  set: (key: string, value: string): void => localStorage.setItem(key, value),
  remove: (key: string): void => localStorage.removeItem(key),
  clear: (): void => localStorage.clear(),
};

export const tokenStorage = {
  get: (): string | null => storage.get("token"),
  set: (token: string): void => storage.set("token", token),
  remove: (): void => storage.remove("token"),
};
