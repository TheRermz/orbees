import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Chip = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 20px;
  background-color: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}44;
  font-size: ${theme.fontSize.xs};
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ $color }) => $color};
  white-space: nowrap;
`;

export const ChipIcon = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const GroupName = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
  margin-top: 2px;
`;

export const ChipWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
