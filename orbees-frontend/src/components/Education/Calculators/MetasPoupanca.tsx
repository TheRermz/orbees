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

export const MetasPoupanca = () => {
  const [meta, setMeta] = useState("");
  const [atual, setAtual] = useState("");
  const [meses, setMeses] = useState("");

  const M = parseNum(meta);
  const A = parseNum(atual);
  const n = parseNum(meses);

  const falta = Math.max(M - A, 0);
  const mensal = n > 0 && falta > 0 ? falta / n : null;

  return (
    <>
      <InputsCard>
        <InputsRow>
          <FieldGroup>
            <FieldLabel>Valor da Meta (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 10000"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Valor Já Guardado (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 2000"
              value={atual}
              onChange={(e) => setAtual(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Prazo (Meses)</FieldLabel>
            <FieldInput
              type="number"
              min="1"
              placeholder="Ex: 12"
              value={meses}
              onChange={(e) => setMeses(e.target.value)}
            />
          </FieldGroup>
        </InputsRow>
      </InputsCard>

      {mensal !== null && (
        <ResultCard>
          <ResultTitle>Poupança Mensal Necessária</ResultTitle>
          <ResultValue>{formatBRL(mensal)}</ResultValue>
          <ResultBreakdown>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Falta juntar</ResultBreakdownLabel>
              <ResultBreakdownValue>{formatBRL(falta)}</ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Prazo</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {n} {n === 1 ? "mês" : "meses"}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Progresso atual</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {M > 0 ? ((A / M) * 100).toFixed(1) : "0"}%
              </ResultBreakdownValue>
            </ResultBreakdownItem>
          </ResultBreakdown>
        </ResultCard>
      )}
    </>
  );
};
