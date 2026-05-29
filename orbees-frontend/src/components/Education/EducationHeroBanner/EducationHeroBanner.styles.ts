import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Banner = styled.div`
  background-color: #1a1a1a;
  border-radius: ${theme.borderRadius.lg};
  padding: 40px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, #f5a62322 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const BannerText = styled.p`
  font-size: ${theme.fontSize.md};
  color: #d1d5db;
  line-height: 1.65;
  margin: 0;
  max-width: 560px;
`;

export const BannerButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background-color: #f5a623;
  color: #1a1a1a;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e09510;
  }
`;
