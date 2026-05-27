import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { groupService } from "../../services/groupService";
import type { GroupRedirectProps } from "./interface";

export const GroupRedirect = ({ to }: GroupRedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    groupService.getMyGroups().then((groups) => {
      if (groups.length > 0) {
        navigate(`/group/${groups[0].id}/${to}`, { replace: true });
      } else {
        navigate("/individual/dashboard", { replace: true });
      }
    });
  }, [navigate, to]);

  return null;
};
