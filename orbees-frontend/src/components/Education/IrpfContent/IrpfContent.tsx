import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  SubAccordionWrapper,
  SubAccordionHeader,
  SubAccordionTitle,
  SubAccordionBody,
  ChevronIcon,
  BodyText,
  IrpfTable,
  IrpfRow,
  IrpfRange,
  IrpfRate,
  IrpfSource,
  TipBox,
  InlineSource,
} from "../../../pages/Education/Law/EducationLawPage.styles";
import { IRPF_TABLE } from "../../../pages/Education/Law/data";

interface SubAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const SubAccordion = ({
  title,
  defaultOpen = false,
  children,
}: SubAccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <SubAccordionWrapper>
      <SubAccordionHeader $open={open} onClick={() => setOpen((o) => !o)}>
        <SubAccordionTitle>{title}</SubAccordionTitle>
        <ChevronIcon $open={open}>
          <ChevronDown size={16} />
        </ChevronIcon>
      </SubAccordionHeader>
      {open && <SubAccordionBody>{children}</SubAccordionBody>}
    </SubAccordionWrapper>
  );
};

export const IrpfContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <SubAccordion title="Quem é obrigado a declarar?" defaultOpen>
        <BodyText>
          Deve declarar quem recebeu rendimentos tributáveis acima de{" "}
          <strong>R$30.639,90</strong> no ano; rendimentos isentos acima de
          R$200.000; ganho de capital ou operações na Bolsa; bens e direitos
          acima de R$800.000; ou passou à condição de residente no Brasil.
          <InlineSource>Receita Federal — IRPF 2024</InlineSource>
        </BodyText>
      </SubAccordion>

      <SubAccordion title="Simplificada vs Completa">
        <BodyText>
          <strong>Simplificada:</strong> desconto padrão de 20% (limitado a{" "}
          <strong>R$16.754,34</strong>). <strong>Completa:</strong> deduz
          despesas reais de saúde (sem limite), educação (até{" "}
          <strong>R$3.561,50</strong>/pessoa/ano), dependentes (
          <strong>R$2.275,08</strong>/ano cada) e previdência PGBL (até{" "}
          <strong>12%</strong> da renda bruta anual). O programa da Receita
          indica a mais vantajosa automaticamente.
          <InlineSource>Receita Federal — Tabelas 2024</InlineSource>
        </BodyText>
      </SubAccordion>

      <SubAccordion title="Tabela progressiva 2024">
        <IrpfTable>
          {IRPF_TABLE.map((row) => (
            <IrpfRow key={row.range}>
              <IrpfRange>{row.range}</IrpfRange>
              <IrpfRate $color={row.color}>{row.rate}</IrpfRate>
            </IrpfRow>
          ))}
        </IrpfTable>
        <IrpfSource
          href="https://www.gov.br/receitafederal"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fonte: Receita Federal — Tabela Progressiva Mensal 2024 ↗
        </IrpfSource>
        <TipBox>
          <Lightbulb size={14} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            Use o Simulador IRPF na aba{" "}
            <button
              style={{
                background: "none",
                border: "none",
                color: "#15803d",
                cursor: "pointer",
                fontWeight: 600,
                padding: 0,
              }}
              onClick={() => navigate("/education/calculators")}
            >
              Calculadoras
            </button>{" "}
            para estimar seu imposto.
          </span>
        </TipBox>
      </SubAccordion>

      <SubAccordion title="Prazos, restituição e multas">
        <BodyText>
          Entrega entre <strong>março e maio</strong> pelo app Meu Imposto de
          Renda ou programa IRPF. Restituição em lotes (junho–dezembro): quem
          entrega primeiro recebe antes. Atraso: multa de{" "}
          <strong>1% ao mês</strong> sobre o imposto, mínimo{" "}
          <strong>R$165,74</strong>. CPF irregular bloqueia passaporte,
          certidões e operações bancárias.
          <InlineSource>Receita Federal — IRPF</InlineSource>
        </BodyText>
      </SubAccordion>
    </>
  );
};
