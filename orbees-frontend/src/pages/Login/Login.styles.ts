import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
`;
export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 80px;
  background-color: #ffffff;
  text-align: center;
`;
export const RightPanel = styled.div`
  width: 480px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  padding: 40px;
`;

export const Logo = styled.img`
  width: 600px;
  margin-bottom: 0.5rem;
`;

export const Slogan = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 8px;
`;

export const SloganHighlight = styled.span`
  color: #f5a623;
`;

export const SloganDescription = styled.p`
  color: #777777;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 32px;
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
  color: #333333;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "✓";
    color: #f5a623;
    font-weight: 700;
  }
`;

export const FormCard = styled.form`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
`;

export const FormTitle = styled.h2`
  color: #1a1a1a;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
`;
export const FormSubtitle = styled.p`
  color: #f5a623;
  font-size: 0.85rem;
  margin: 0;
`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  color: #555555;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  background-color: #ffffff;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#ef4444" : "#dddddd")};
  border-radius: 8px;
  color: #1a1a1a;
  font-size: 0.95rem;
  padding: 12px 16px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #aaaaaa;
  }

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "#ef4444" : "#F5A623")};
  }
`;

export const SubmitButton = styled.button`
  background-color: #f5a623;
  border: none;
  border-radius: 8px;
  color: #1a1a1a;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  padding: 14px;
  margin-top: 4px;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #e09500;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Divider = styled.div`
  color: #aaaaaa;
  font-size: 0.85rem;
  text-align: center;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #dddddd;
  }

  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;

export const GoogleButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 8px;
  color: #1a1a1a;
  cursor: pointer;
  font-size: 0.95rem;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #f5a623;
  }
`;

export const GoogleIcon = styled.span`
  background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 1rem;
`;

export const FooterText = styled.p`
  color: #777777;
  font-size: 0.85rem;
  text-align: center;
  margin: 0;

  a {
    color: #f5a623;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.div`
  background-color: #2d1515;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #ef4444;
  font-size: 0.85rem;
  padding: 10px 14px;
`;

export const FieldError = styled.span`
  color: #ef4444;
  font-size: 0.78rem;
`;
