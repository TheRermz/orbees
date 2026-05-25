import type { ReactNode } from "react";
import {
  Container,
  LeftPanel,
  RightPanel,
  Logo,
  Slogan,
  SloganHighlight,
  SloganDescription,
  BenefitList,
  BenefitItem,
} from "./AuthLayout.styles";
import orbeesLogo from "../../../assets/orbees-logo-full.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <Container>
    <LeftPanel>
      <Logo src={orbeesLogo} alt="Orbees" />
      <Slogan>
        Controle suas finanças <SloganHighlight>sem esforço</SloganHighlight>
      </Slogan>
      <SloganDescription>
        Importe seu extrato bancário e tenha uma visão completa da sua vida
        financeira em segundos.
      </SloganDescription>
      <BenefitList>
        <BenefitItem>Importação automática de OFX e CSV</BenefitItem>
        <BenefitItem>Categorização inteligente de transações</BenefitItem>
        <BenefitItem>Controle financeiro individual e em grupo</BenefitItem>
        <BenefitItem>Educação financeira</BenefitItem>
      </BenefitList>
    </LeftPanel>
    <RightPanel>{children}</RightPanel>
  </Container>
);
