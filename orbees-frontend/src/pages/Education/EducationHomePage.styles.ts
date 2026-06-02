import styled from "styled-components";
import { theme } from "../../styles/theme";

export { PageInnerContainer as Container, PageTitleLarge as PageTitle, PageSubtitle, SectionTitle } from "../../styles/pageLayout";

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


export const SectionDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  margin: 0;
`;
