import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Dot = styled.div<{ $income: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ $income }) =>
    $income ? "#22c55e" : theme.colors.error};
  flex-shrink: 0;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Title = styled.span`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.text};
`;

export const Meta = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textMuted};
`;

export const Amount = styled.span<{ $income: boolean }>`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: ${({ $income }) => ($income ? "#22c55e" : theme.colors.error)};
`;
