import { useState } from "react";
import { User, Users, Lock } from "lucide-react";
import { ProfileTab } from "./tabs/ProfileTab";
import { GroupsTab } from "./tabs/GroupsTab";
import { SecurityTab } from "./tabs/SecurityTab";
import {
  Container,
  Header,
  PageTitle,
  PageSubtitle,
  Content,
  Sidebar,
  TabButton,
  Panel,
  SuccessToast,
  ErrorToast,
} from "./SettingsPage.styles";
import type { Tab } from "./interface";

export const SettingsPage = () => {
  const [tab, setTab] = useState<Tab>("profile");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <Container>
      {toast &&
        (toast.type === "success" ? (
          <SuccessToast>{toast.message}</SuccessToast>
        ) : (
          <ErrorToast>{toast.message}</ErrorToast>
        ))}

      <Header>
        <PageTitle>Configurações</PageTitle>
        <PageSubtitle>
          Gerencie seu perfil, grupos e segurança da conta
        </PageSubtitle>
      </Header>

      <Content>
        <Sidebar>
          <TabButton
            $active={tab === "profile"}
            onClick={() => setTab("profile")}
          >
            <User size={16} /> Perfil
          </TabButton>
          <TabButton
            $active={tab === "groups"}
            onClick={() => setTab("groups")}
          >
            <Users size={16} /> Grupos
          </TabButton>
          <TabButton
            $active={tab === "security"}
            onClick={() => setTab("security")}
          >
            <Lock size={16} /> Segurança
          </TabButton>
        </Sidebar>

        <Panel>
          {tab === "profile" && <ProfileTab onToast={showToast} />}
          {tab === "groups" && <GroupsTab onToast={showToast} />}
          {tab === "security" && <SecurityTab onToast={showToast} />}
        </Panel>
      </Content>
    </Container>
  );
};
