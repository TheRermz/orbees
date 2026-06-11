import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Wrapper = styled.div`
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const WrapperTitle = styled.h4`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: #92400e;
  margin: 0;
`;

export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const SubCard = styled.div<{ $accent: string }>`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-top: 3px solid ${({ $accent }) => $accent};
  border-radius: ${theme.borderRadius.md};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SubCardTitle = styled.h5<{ $color: string }>`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${({ $color }) => $color};
  margin: 0;
`;

export const Line = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  line-height: 1.55;
  margin: 0;
`;

export const FootnoteRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

export const FootnoteText = styled.span<{ $color: string }>`
  font-size: ${theme.fontSize.xs};
  color: ${({ $color }) => $color};
  font-style: italic;
`;

export const FootnoteSource = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
`;

export const FootnoteSourceUrl = styled.a`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};

  &:hover {
    text-decoration: underline;
  }

  &::after {
    content: " ↗";
  }
`;
