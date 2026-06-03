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

export const FeriasClt = () => {
  const [salario, setSalario] = useState("");
  const [diasVendidos, setDiasVendidos] = useState("0");

  const S = parseNum(salario);
  const dias = Math.min(Math.max(Math.floor(parseNum(diasVendidos)), 0), 10);

  let resultado: {
    ferias: number;
    terco: number;
    abono: number;
    total: number;
  } | null = null;

  if (S > 0) {
    const diasRestantes = 30 - dias;
    const valorDiario = S / 30;
    const ferias = valorDiario * diasRestantes;
    const abono = valorDiario * dias;
    const terco = (ferias + abono) / 3;
    resultado = { ferias, terco, abono, total: ferias + terco + abono };
  }

  return (
    <>
      <InputsCard>
        <InputsRow>
          <FieldGroup>
            <FieldLabel>Salário Bruto (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 3000"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Dias Vendidos (Abono — Max 10)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              max="10"
              value={diasVendidos}
              onChange={(e) => setDiasVendidos(e.target.value)}
            />
          </FieldGroup>
        </InputsRow>
      </InputsCard>

      {resultado !== null && (
        <ResultCard>
          <ResultTitle>Total a Receber</ResultTitle>
          <ResultValue>{formatBRL(resultado.total)}</ResultValue>
          <ResultBreakdown>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>
                Férias ({30 - dias} dias)
              </ResultBreakdownLabel>
              <ResultBreakdownValue>
                {formatBRL(resultado.ferias)}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>⅓ constitucional</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {formatBRL(resultado.terco)}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
            {dias > 0 && (
              <ResultBreakdownItem>
                <ResultBreakdownLabel>
                  Abono pecuniário ({dias} dias)
                </ResultBreakdownLabel>
                <ResultBreakdownValue>
                  {formatBRL(resultado.abono)}
                </ResultBreakdownValue>
              </ResultBreakdownItem>
            )}
          </ResultBreakdown>
        </ResultCard>
      )}
    </>
  );
};
