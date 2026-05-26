import { Bell } from "lucide-react";
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

export const TopBar = () => {
  const { user } = useAuthState();

  const initials =
    user?.fullname
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 1)
      .join("")
      .toUpperCase() ?? "U";

  return (
    <Container>
      <NotificationButton>
        <Bell size={20} />
        <NotificationBadge>1</NotificationBadge>
      </NotificationButton>

      <UserInfo>
        <Avatar>{initials}</Avatar>
        <UserDetails>
          <UserName>{user?.fullname}</UserName>
          <UserRole>Conta Pessoal</UserRole>
        </UserDetails>
      </UserInfo>
    </Container>
  );
};
