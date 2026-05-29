import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const Box = styled.div`
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: ${theme.borderRadius.lg};
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.h4`
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.bold};
  color: #92400e;
  margin: 0;
`;

export const Body = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text};
  line-height: 1.65;
  margin: 0;
`;

export const SourceLink = styled.a`
  font-size: ${theme.fontSize.xs};
  color: #b45309;
  text-decoration: none;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
  }
`;
