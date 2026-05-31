import { useState } from "react";
import {
  InputsCard,
  InputsRow,
  FieldGroup,
  FieldLabel,
  FieldInput,
  ResultCard,
  ResultTitle,
  ResultValue,
  ResultBreakdown,
  ResultBreakdownItem,
  ResultBreakdownLabel,
  ResultBreakdownValue,
} from "../.././../pages/Education/Calculators/EducationCalculatorsPage.styles";
import {
  formatBRL,
  parseNum,
} from "../../../pages/Education/Calculators/utils";

export const JurosSimples = () => {
  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [meses, setMeses] = useState("");

  const C = parseNum(capital);
  const i = parseNum(taxa) / 100;
  const t = parseNum(meses);

  const montante = C > 0 && i >= 0 && t > 0 ? C * (1 + i * t) : null;
  const juros = montante !== null ? montante - C : null;

  return (
    <>
      <InputsCard>
        <InputsRow>
          <FieldGroup>
            <FieldLabel>Capital Inicial (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 1000"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Taxa de Juros (% A.M.)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 2.5"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Período (Meses)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 12"
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
            />
          </FieldGroup>
        </InputsRow>
      </InputsCard>

      {montante !== null && (
        <ResultCard>
          <ResultTitle>Montante Final</ResultTitle>
          <ResultValue>{formatBRL(montante)}</ResultValue>
          <ResultBreakdown>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Capital investido</ResultBreakdownLabel>
              <ResultBreakdownValue>{formatBRL(C)}</ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Juros gerados</ResultBreakdownLabel>
              <ResultBreakdownValue>{formatBRL(juros!)}</ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Rendimento</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {(i * t * 100).toFixed(2)}%
              </ResultBreakdownValue>
            </ResultBreakdownItem>
          </ResultBreakdown>
        </ResultCard>
      )}
    </>
  );
};
