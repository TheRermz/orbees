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
import {
  LIMITE_EDUCACAO_ANUAL,
  calcularIR,
  DEDUCAO_DEPENDENTE,
  LIMITE_PREVIDENCIA,
} from "./data";

export const SimuladorIrpf = () => {
  const [salario, setSalario] = useState("");
  const [saude, setSaude] = useState("");
  const [educacao, setEducacao] = useState("");
  const [dependentes, setDependentes] = useState("0");
  const [previdencia, setPrevidencia] = useState("");

  const S = parseNum(salario);
  const saudeAnual = parseNum(saude);
  const educacaoAnual = Math.min(parseNum(educacao), LIMITE_EDUCACAO_ANUAL);
  const nDep = Math.max(Math.floor(parseNum(dependentes)), 0);
  const prevMensal = parseNum(previdencia);

  if (S <= 0)
    return (
      <>
        <InputsCard>
          <InputsRow>
            <FieldGroup>
              <FieldLabel>Salário Bruto Mensal (R$)</FieldLabel>
              <FieldInput
                type="number"
                min="0"
                placeholder="Ex: 5000"
                value={salario}
                onChange={(e) => setSalario(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Despesas de Saúde no Ano (R$)</FieldLabel>
              <FieldInput
                type="number"
                min="0"
                placeholder="Ex: 3600"
                value={saude}
                onChange={(e) => setSaude(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Despesas de Educação no Ano (R$)</FieldLabel>
              <FieldInput
                type="number"
                min="0"
                placeholder={`Limite: R$${LIMITE_EDUCACAO_ANUAL.toFixed(2)}`}
                value={educacao}
                onChange={(e) => setEducacao(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Número de Dependentes</FieldLabel>
              <FieldInput
                type="number"
                min="0"
                value={dependentes}
                onChange={(e) => setDependentes(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Previdência Privada Mensal (R$)</FieldLabel>
              <FieldInput
                type="number"
                min="0"
                placeholder="Ex: 300"
                value={previdencia}
                onChange={(e) => setPrevidencia(e.target.value)}
              />
            </FieldGroup>
          </InputsRow>
        </InputsCard>
      </>
    );

  const rendaAnual = S * 12;

  const inssAnual = S * 12 * 0.09;

  const descontoSimplificado = Math.min(rendaAnual * 0.2, 16754.34);
  const baseSimplificada = Math.max(
    rendaAnual - inssAnual - descontoSimplificado,
    0
  );
  const irSimplificado = calcularIR(baseSimplificada / 12) * 12;

  const dedDependentes = nDep * DEDUCAO_DEPENDENTE * 12;
  const dedEducacao = educacaoAnual;
  const dedSaude = saudeAnual;
  const limPrev = rendaAnual * LIMITE_PREVIDENCIA;
  const dedPrevidencia = Math.min(prevMensal * 12, limPrev);
  const totalDeducoes =
    inssAnual + dedDependentes + dedEducacao + dedSaude + dedPrevidencia;
  const baseCompleta = Math.max(rendaAnual - totalDeducoes, 0);
  const irCompleto = calcularIR(baseCompleta / 12) * 12;

  const maisVantajosa =
    irCompleto <= irSimplificado ? "Completa" : "Simplificada";
  const economia = Math.abs(irSimplificado - irCompleto);

  return (
    <>
      <InputsCard>
        <InputsRow>
          <FieldGroup>
            <FieldLabel>Salário Bruto Mensal (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 5000"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Despesas de Saúde no Ano (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 3600"
              value={saude}
              onChange={(e) => setSaude(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Despesas de Educação no Ano (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder={`Limite: R$${LIMITE_EDUCACAO_ANUAL.toFixed(2)}`}
              value={educacao}
              onChange={(e) => setEducacao(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Número de Dependentes</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              value={dependentes}
              onChange={(e) => setDependentes(e.target.value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel>Previdência Privada Mensal (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: 300"
              value={previdencia}
              onChange={(e) => setPrevidencia(e.target.value)}
            />
          </FieldGroup>
        </InputsRow>
      </InputsCard>

      <ResultCard>
        <ResultTitle>Declaração Mais Vantajosa: {maisVantajosa}</ResultTitle>
        <ResultValue>Economize {formatBRL(economia)}</ResultValue>
        <ResultBreakdown>
          <ResultBreakdownItem>
            <ResultBreakdownLabel>
              IR Simplificada (estimado)
            </ResultBreakdownLabel>
            <ResultBreakdownValue>
              {formatBRL(irSimplificado)}
            </ResultBreakdownValue>
          </ResultBreakdownItem>
          <ResultBreakdownItem>
            <ResultBreakdownLabel>IR Completa (estimado)</ResultBreakdownLabel>
            <ResultBreakdownValue>{formatBRL(irCompleto)}</ResultBreakdownValue>
          </ResultBreakdownItem>
          <ResultBreakdownItem>
            <ResultBreakdownLabel>
              Base cálculo ({maisVantajosa})
            </ResultBreakdownLabel>
            <ResultBreakdownValue>
              {formatBRL(
                maisVantajosa === "Completa" ? baseCompleta : baseSimplificada
              )}
            </ResultBreakdownValue>
          </ResultBreakdownItem>
        </ResultBreakdown>
      </ResultCard>
    </>
  );
};
