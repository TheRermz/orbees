const STORAGE_KEY = 'orbees_notifications';

export interface ONotification {
  id: string;
  type: 'download' | 'warning' | 'info';
  title: string;
  message: string;
  href?: string;
  filename?: string;
  read: boolean;
  createdAt: string;
}

export function loadNotifications(): ONotification[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

export function saveNotifications(ns: ONotification[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ns));
}

export function addNotification(n: Omit<ONotification, 'id' | 'read' | 'createdAt'>): void {
  const ns = loadNotifications();
  ns.unshift({
    ...n,
    id: crypto.randomUUID(),
    read: false,
    createdAt: new Date().toISOString(),
  });
  saveNotifications(ns);
  window.dispatchEvent(new Event('orbees:notification'));
}

export function markAllRead(): void {
  const ns = loadNotifications().map(n => ({ ...n, read: true }));
  saveNotifications(ns);
}

export function unreadCount(): number {
  return loadNotifications().filter(n => !n.read).length;
}
