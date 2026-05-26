import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthActions } from "../../../contexts/useAuthContext";
import orbeesLogo from "../../../assets/orbees-branco.png";
import { ChevronDown, ChevronRight, Settings, LogOut } from "lucide-react";
import type { MainLayoutProps } from "./interface";
import {
  SidebarHeader,
  SidebarLogo,
  SidebarContent,
  MenuSection,
  MenuSectionButton,
  SubMenuList,
  SubMenuItem,
  SidebarFooter,
  FooterButton,
  MainContent,
  Container,
  Sidebar,
} from "./MainLayout.styles";
import { menuGroups } from "./MenuGroup";
import { Button, Modal, TopBar } from "../../ui";

export const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthActions();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [openSections, setOpenSections] = useState<string[]>(() => {
    const active = menuGroups.find((g) =>
      location.pathname.startsWith(g.basePath)
    );
    return active ? [active.label] : [menuGroups[0].label];
  });

  const toggleSection = (label: string) => {
    setOpenSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  return (
    <Container>
      <Sidebar>
        <SidebarHeader>
          <SidebarLogo src={orbeesLogo} alt="Orbees" />
        </SidebarHeader>

        <SidebarContent>
          {menuGroups.map((group) => {
            const isOpen = openSections.includes(group.label);
            const isGroupActive = location.pathname.startsWith(group.basePath);

            return (
              <MenuSection key={group.label}>
                <MenuSectionButton
                  $active={isGroupActive}
                  onClick={() => toggleSection(group.label)}
                >
                  {group.icon}
                  {group.label}
                  {isOpen ? (
                    <ChevronDown size={14} style={{ marginLeft: "auto" }} />
                  ) : (
                    <ChevronRight size={14} style={{ marginLeft: "auto" }} />
                  )}
                </MenuSectionButton>

                <SubMenuList $open={isOpen}>
                  {group.subMenus.map((sub) => (
                    <SubMenuItem
                      key={sub.path}
                      $active={location.pathname === sub.path}
                      onClick={() => navigate(sub.path)}
                    >
                      {sub.icon}
                      {sub.label}
                    </SubMenuItem>
                  ))}
                </SubMenuList>
              </MenuSection>
            );
          })}
        </SidebarContent>

        <SidebarFooter>
          <FooterButton onClick={() => navigate("/settings")}>
            <Settings size={16} />
            Configurações
          </FooterButton>
          <FooterButton $danger onClick={() => setShowLogoutModal(true)}>
            <LogOut size={16} />
            Sair
          </FooterButton>
        </SidebarFooter>
      </Sidebar>

      {showLogoutModal && (
        <Modal
          title="Sair da conta"
          description="Tem certeza que deseja sair da sua conta?"
          onClose={() => setShowLogoutModal(false)}
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancelar
              </Button>
              <Button variant="danger" onClick={logout}>
                Sair
              </Button>
            </>
          }
        />
      )}

      <MainContent>
        <TopBar />
        {children}
      </MainContent>
    </Container>
  );
};
