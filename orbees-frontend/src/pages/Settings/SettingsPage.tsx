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
} from "./SettingsPage.styles";
import type { Tab } from "./interface";

export const SettingsPage = () => {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <Container>
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
          {tab === "profile" && <ProfileTab />}
          {tab === "groups" && <GroupsTab />}
          {tab === "security" && <SecurityTab />}
        </Panel>
      </Content>
    </Container>
  );
};
