import { useRef, useState, useEffect } from "react";
import { Bell, Download, AlertTriangle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../../contexts/useAuthContext";
import {
  Container,
  NotificationButton,
  NotificationBadge,
  UserInfo,
  Avatar,
  UserName,
  UserRole,
  UserDetails,
} from "./TopBar.styles";
import {
  NotificationWrapper,
  NotificationPanel,
  PanelHeader,
  PanelTitle,
  MarkAllButton,
  NotificationList,
  NotificationItem,
  NotificationIcon,
  NotificationBody,
  NotificationMessage,
  NotificationTime,
  DownloadLink,
  EmptyState,
} from "./TopBar.notification.styles";
import type { NotificationType } from "../../../contexts/interface";
import { useNotifications } from "../../../contexts/useNotifications";

const TYPE_ICON: Record<NotificationType, React.ReactNode> = {
  download: <Download size={14} />,
  warning: <AlertTriangle size={14} />,
  info: <Info size={14} />,
};

const formatTime = (date: Date): string => {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "Agora mesmo";
  if (diff < 3600) return `Há ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Há ${Math.floor(diff / 3600)}h`;
  return date.toLocaleDateString("pt-BR");
};

export const TopBar = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const pfp = user?.profilePicturePath?.replace("-", "");
  const pfpUrl = pfp
    ? `${import.meta.env.VITE_API_BASE_URL?.replace("/api", "")}${pfp}`
    : null;
  const initials =
    user?.fullname
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 1)
      .join("")
      .toUpperCase() ?? "U";

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <Container>
      <NotificationWrapper ref={panelRef}>
        <NotificationButton onClick={() => setOpen((o) => !o)}>
          <Bell size={20} />
          {unreadCount > 0 && (
            <NotificationBadge>
              {unreadCount > 99 ? "99+" : unreadCount}
            </NotificationBadge>
          )}
        </NotificationButton>

        {open && (
          <NotificationPanel>
            <PanelHeader>
              <PanelTitle>Notificações</PanelTitle>
              <MarkAllButton onClick={markAllRead} disabled={unreadCount === 0}>
                Marcar todas como lidas
              </MarkAllButton>
            </PanelHeader>

            <NotificationList>
              {notifications.length === 0 ? (
                <EmptyState>Nenhuma notificação por enquanto</EmptyState>
              ) : (
                notifications.map((n) => (
                  <NotificationItem key={n.id} $read={n.read}>
                    <NotificationIcon $type={n.type}>
                      {TYPE_ICON[n.type]}
                    </NotificationIcon>
                    <NotificationBody>
                      <NotificationMessage>{n.message}</NotificationMessage>
                      {n.downloadUrl && (
                        <DownloadLink
                          href={n.downloadUrl}
                          download={n.downloadLabel ?? "arquivo"}
                        >
                          {n.downloadLabel ?? "Baixar arquivo"} ↓
                        </DownloadLink>
                      )}
                      <NotificationTime>
                        {formatTime(n.createdAt)}
                      </NotificationTime>
                    </NotificationBody>
                  </NotificationItem>
                ))
              )}
            </NotificationList>
          </NotificationPanel>
        )}
      </NotificationWrapper>

      <UserInfo>
        <Avatar onClick={() => navigate("/settings")}>
          {pfpUrl ? (
            <img
              src={pfpUrl}
              alt={user?.fullname}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            initials
          )}
        </Avatar>
        <UserDetails>
          <UserName>{user?.fullname}</UserName>
          <UserRole>Conta Pessoal</UserRole>
        </UserDetails>
      </UserInfo>
    </Container>
  );
};
