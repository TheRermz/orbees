import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Users } from "lucide-react";
import { Button } from "../../../../components/ui";
import { theme } from "../../../../styles/theme";
import {
  SuccessCard,
  SuccessTitle,
  SuccessSubtitle,
  StatsRow,
  StatItem,
  StatValue,
  StatLabel,
  SharedInfo,
  FooterActions,
} from "../ImportPage.styles";
import type { SuccessProps } from "./interface";

export const Success = ({ result, onReset }: SuccessProps) => {
  const navigate = useNavigate();

  return (
    <SuccessCard>
      <CheckCircle2 size={64} color="#22c55e" />
      <SuccessTitle>Extrato importado com sucesso!</SuccessTitle>
      <SuccessSubtitle>
        {result.total} transações foram adicionadas à sua conta.
      </SuccessSubtitle>

      <StatsRow>
        <StatItem>
          <StatValue $color="#22c55e">{result.income}</StatValue>
          <StatLabel>Receitas</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue $color="#ef4444">{result.expenses}</StatValue>
          <StatLabel>Despesas</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue $color={theme.colors.text}>{result.total}</StatValue>
          <StatLabel>Total</StatLabel>
        </StatItem>
      </StatsRow>

      {result.shared > 0 && (
        <SharedInfo>
          <Users size={18} />
          <span>
            <strong>
              {result.shared} transação
              {result.shared > 1
                ? "ões foram compartilhadas"
                : " foi compartilhada"}
            </strong>{" "}
            com o grupo <strong>{result.groupName}</strong> e já aparecem em
            Controle em Grupo {">"} Transações.
          </span>
        </SharedInfo>
      )}

      <FooterActions>
        <Button variant="secondary" onClick={onReset}>
          Importar Outro
        </Button>
        <Button onClick={() => navigate("/individual/dashboard")}>
          Ver Dashboard <ArrowRight size={16} />
        </Button>
      </FooterActions>
    </SuccessCard>
  );
};
