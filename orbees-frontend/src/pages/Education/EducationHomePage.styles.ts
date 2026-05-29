import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  overflow-y: auto;
  background-color: #f5f5f5;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 32px 40px;
  max-width: 1100px;
  width: 100%;
`;

export const Section = styled.section`
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.h3`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const StatsRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  & > * {
    flex: 1;
    min-width: 200px;
  }
`;

export const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const Header = styled.div`
  padding: 24px 32px 0;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: 20px;
`;

export const PageTitle = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0 0 4px;
`;

export const PageSubtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;

export const SectionDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;
