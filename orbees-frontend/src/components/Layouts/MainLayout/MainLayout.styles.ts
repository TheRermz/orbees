import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 250px;
  min-height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
`;

export const SidebarHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #2a2a2a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SidebarLogo = styled.img`
  width: 130px;
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #3a3a3a;
    border-radius: 4px;
  }
`;

export const SidebarFooter = styled.div`
  padding: 16px 12px;
  border-top: 1px solid #2a2a2a;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MenuSection = styled.div`
  margin-bottom: 8px;
`;

export const MenuSectionButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background-color: ${({ $active }) => ($active ? "#F5A623" : "transparent")};
  border: none;
  border-radius: 0;
  color: ${({ $active }) => ($active ? "#1a1a1a" : "#a0a0a0")};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#F5A623" : "#2a2a2a")};
    color: ${({ $active }) => ($active ? "#1a1a1a" : "#ffffff")};
  }
`;

export const SubMenuList = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? "500px" : "0")};
  opacity: ${({ $open }) => ($open ? "1" : "0")};
  transition:
    max-height 0.8s ease,
    opacity 0.5s ease;
`;
export const SubMenuItem = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 20px 9px 40px;
  background-color: ${({ $active }) => ($active ? "#2a2a2a" : "transparent")};
  border: none;
  border-left: 2px solid
    ${({ $active }) => ($active ? "#F5A623" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#707070")};
  font-size: 0.82rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    background-color: #2a2a2a;
    color: #ffffff;
    border-left-color: #f5a623;
  }
`;

export const FooterButton = styled.button<{ $danger?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: ${({ $danger }) => ($danger ? "#ef4444" : "#a0a0a0")};
  font-size: 0.85rem;
  cursor: pointer;
  text-align: left;
  transition:
    background-color 0.2s,
    color 0.2s;

  &:hover {
    background-color: #2a2a2a;
    color: ${({ $danger }) => ($danger ? "#ef4444" : "#ffffff")};
  }
`;

export const MainContent = styled.main`
  margin-left: 250px;
  flex: 1;
  min-height: 100vh;
  background-color: #f5f5f5;
`;
