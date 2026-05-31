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
  parseNum,
  formatBRL,
} from "../../../pages/Education/Calculators/utils";

export const JurosCompostos = () => {
  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [meses, setMeses] = useState("");
  const [aporte, setAporte] = useState("");

  const C = parseNum(capital);
  const i = parseNum(taxa) / 100;
  const n = parseNum(meses);
  const PMT = parseNum(aporte);

  let montante: number | null = null;
  let totalAportado = 0;

  if (C >= 0 && i > 0 && n > 0) {
    const montanteCapital = C * Math.pow(1 + i, n);
    const montanteAportes = PMT > 0 ? PMT * ((Math.pow(1 + i, n) - 1) / i) : 0;
    montante = montanteCapital + montanteAportes;
    totalAportado = C + PMT * n;
  }

  const juros = montante !== null ? montante - totalAportado : null;

  return (
    <>
      <InputsCard>
        <InputsRow>
          <FieldGroup>
            <FieldLabel>Capital Inicial (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 5000"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Taxa de Juros (% A.M.)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 1.0"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Período (Meses)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 24"
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Aporte Mensal (R$) — Opcional</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 200"
              value={aporte}
              onChange={(e) => setAporte(e.target.value)}
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
              <ResultBreakdownLabel>Total investido</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {formatBRL(totalAportado)}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Juros gerados</ResultBreakdownLabel>
              <ResultBreakdownValue>{formatBRL(juros!)}</ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Rendimento total</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {totalAportado > 0
                  ? (
                    ((montante - totalAportado) / totalAportado) *
                    100
                  ).toFixed(2)
                  : "0"}
                %
              </ResultBreakdownValue>
            </ResultBreakdownItem>
          </ResultBreakdown>
        </ResultCard>
      )}
    </>
  );
};
