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

export const CustoParcelamento = () => {
  const [valor, setValor] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [taxa, setTaxa] = useState("");

  const PV = parseNum(valor);
  const n = Math.floor(parseNum(parcelas));
  const i = parseNum(taxa) / 100;

  let resultado: { pmt: number; total: number; juros: number } | null = null;

  if (PV > 0 && n > 0) {
    let pmt: number;
    if (i === 0) {
      pmt = PV / n;
    } else {
      pmt = (PV * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
    }
    const total = pmt * n;
    resultado = { pmt, total, juros: total - PV };
  }

  return (
    <>
      <InputsCard>
        <InputsRow>
          <FieldGroup>
            <FieldLabel>Valor do Produto (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 1500"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Número de Parcelas</FieldLabel>
            <FieldInput
              type="number"
              min="1"
              placeholder="Ex: 12"
              value={parcelas}
              onChange={(e) => setParcelas(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Taxa de Juros (% A.M.) — 0 se sem juros</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 2.99"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
            />
          </FieldGroup>
        </InputsRow>
      </InputsCard>

      {resultado !== null && (
        <ResultCard>
          <ResultTitle>Custo Total</ResultTitle>
          <ResultValue>{formatBRL(resultado.total)}</ResultValue>
          <ResultBreakdown>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Valor da parcela</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {formatBRL(resultado.pmt)}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Valor original</ResultBreakdownLabel>
              <ResultBreakdownValue>{formatBRL(PV)}</ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Juros pagos</ResultBreakdownLabel>
              <ResultBreakdownValue
                style={{ color: resultado.juros > 0 ? "#ef4444" : "#e5e7eb" }}
              >
                {formatBRL(resultado.juros)}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
            {resultado.juros > 0 && (
              <ResultBreakdownItem>
                <ResultBreakdownLabel>Custo efetivo</ResultBreakdownLabel>
                <ResultBreakdownValue style={{ color: "#ef4444" }}>
                  +{((resultado.juros / PV) * 100).toFixed(2)}%
                </ResultBreakdownValue>
              </ResultBreakdownItem>
            )}
          </ResultBreakdown>
        </ResultCard>
      )}
    </>
  );
};
