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
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

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

  return (
    <Container>
      <NotificationButton>
        <Bell size={20} />
        <NotificationBadge>1</NotificationBadge>
      </NotificationButton>

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
