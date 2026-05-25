import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const LeftPanel = styled.div`
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xxl} 80px;
  background-color: ${theme.colors.background};
  text-align: center;
`;

export const RightPanel = styled.div`
  width: 480px;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.backgroundDark};
  padding: ${theme.spacing.xl};
`;

export const Logo = styled.img`
  width: 600px;
`;

export const Slogan = styled.h1`
  font-size: ${theme.fontSize.xxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  line-height: 1.3;
  margin-bottom: ${theme.spacing.md};
`;

export const SloganHighlight = styled.span`
  color: ${theme.colors.primary};
`;

export const SloganDescription = styled.p`
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.md};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  max-width: 420px;
  text-align: center;
`;

export const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`;

export const BenefitItem = styled.li`
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "✓";
    color: ${theme.colors.primary};
    font-weight: ${theme.fontWeight.bold};
  }
`;

export const FormCard = styled.form`
  background-color: ${theme.colors.backgroundCard};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
`;

export const FormTitle = styled.h2`
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  margin: 0;
`;

export const FormSubtitle = styled.p`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSize.sm};
  margin: 0;
`;

export const FooterText = styled.p`
  color: ${theme.colors.textMuted};
  font-size: ${theme.fontSize.sm};
  text-align: center;
  margin: 0;

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    font-weight: ${theme.fontWeight.semibold};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const GoogleIcon = styled.span`
  background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.lg};
`;
