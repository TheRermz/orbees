import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const RuleTitle = styled.h4`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.text};
  margin: 0;
`;

export const SubtitleSource = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

export const Subtitle = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textMuted};
  text-align: right;
`;

export const Source = styled.a`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
  text-decoration: none;
  text-align: right;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  height: 32px;
`;

export const ProgressSegment = styled.div<{ $color: string; $value: number }>`
  flex: ${({ $value }) => $value};
  background-color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
`;

export const LegendRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const LegendDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
  margin-top: 3px;
`;

export const LegendText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const LegendLabel = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const LegendDetail = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const Footnote = styled.p`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textLight};
  font-style: italic;
  margin: 0;
`;
