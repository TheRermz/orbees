import styled from "styled-components";
import { theme } from "../../../styles/theme";

export { PageInnerContainer as Container, PageTitleLarge as PageTitle, PageSubtitle } from "../../../styles/pageLayout";

export const Header = styled.div`
  padding: 24px 32px 20px;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
`;


export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 32px 40px;
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
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #f5a623;
  display: inline-block;
`;

export const InlineSource = styled.sup`
  font-size: 0.65rem;
  color: ${theme.colors.textLight};
  margin-left: 4px;
  font-weight: normal;
`;
