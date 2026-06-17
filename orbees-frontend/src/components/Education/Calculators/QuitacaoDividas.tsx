import { useState } from "react";
import {
  InputsCard,
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
  ToggleRow,
  ToggleLabel,
  ToggleButton,
  DebtRow,
  RemoveButton,
  AddDebtButton,
  ExtraRow,
} from "../.././../pages/Education/Calculators/EducationCalculatorsPage.styles";
import {
  parseNum,
  formatBRL,
} from "../../../pages/Education/Calculators/utils";
import type { Debt } from "./interface";

let nextId = 1;

const simulatePayoff = (
  debts: { saldo: number; taxa: number; minimo: number }[],
  extra: number,
  method: "avalanche" | "snowball"
): { months: number; totalJuros: number } => {
  if (debts.length === 0 || debts.every((d) => d.saldo <= 0))
    return { months: 0, totalJuros: 0 };

  let state = debts.map((d) => ({ ...d }));
  let months = 0;
  let totalJuros = 0;
  const MAX = 600;

  while (state.some((d) => d.saldo > 0) && months < MAX) {
    months++;
    // aplicar juros
    state = state.map((d) => {
      if (d.saldo <= 0) return d;
      const j = d.saldo * (d.taxa / 100);
      totalJuros += j;
      return { ...d, saldo: d.saldo + j };
    });

    state = state.map((d) => {
      if (d.saldo <= 0) return d;
      const pag = Math.min(d.minimo, d.saldo);
      return { ...d, saldo: d.saldo - pag };
    });

    let extraLeft = extra;
    while (extraLeft > 0) {
      const active = state.filter((d) => d.saldo > 0);
      if (active.length === 0) break;

      const target =
        method === "avalanche"
          ? active.reduce((a, b) => (a.taxa > b.taxa ? a : b))
          : active.reduce((a, b) => (a.saldo < b.saldo ? a : b));

      const idx = state.indexOf(target);
      const pag = Math.min(extraLeft, state[idx].saldo);
      state[idx].saldo -= pag;
      extraLeft -= pag;
    }
  }

  return { months, totalJuros };
};

export const QuitacaoDividas = () => {
  const [method, setMethod] = useState<"avalanche" | "snowball">("avalanche");
  const [debts, setDebts] = useState<Debt[]>([
    { id: nextId++, name: "", saldo: "", taxa: "", minimo: "" },
  ]);
  const [extra, setExtra] = useState("");

  const addDebt = () =>
    setDebts((prev) => [
      ...prev,
      { id: nextId++, name: "", saldo: "", taxa: "", minimo: "" },
    ]);
  const removeDebt = (id: number) =>
    setDebts((prev) => prev.filter((d) => d.id !== id));
  const updateDebt = (id: number, field: keyof Debt, value: string) =>
    setDebts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );

  const parsedDebts = debts
    .map((d) => ({
      saldo: parseNum(d.saldo),
      taxa: parseNum(d.taxa),
      minimo: parseNum(d.minimo),
    }))
    .filter((d) => d.saldo > 0 && d.taxa > 0 && d.minimo > 0);

  const extraNum = parseNum(extra);
  const totalSaldo = parsedDebts.reduce((acc, d) => acc + d.saldo, 0);

  const result =
    parsedDebts.length > 0
      ? simulatePayoff(parsedDebts, extraNum, method)
      : null;

  return (
    <>
      <InputsCard>
        <ToggleRow>
          <ToggleLabel>Método:</ToggleLabel>
          <ToggleButton
            $active={method === "avalanche"}
            onClick={() => setMethod("avalanche")}
          >
            Avalanche (maior juros primeiro)
          </ToggleButton>
          <ToggleButton
            $active={method === "snowball"}
            onClick={() => setMethod("snowball")}
          >
            Bola de Neve (menor saldo primeiro)
          </ToggleButton>
        </ToggleRow>

        {debts.map((debt, idx) => (
          <DebtRow key={debt.id}>
            <FieldGroup>
              {idx === 0 && <FieldLabel>Nome da Dívida</FieldLabel>}
              <FieldInput
                type="text"
                placeholder="Ex: Cartão Nubank"
                value={debt.name}
                onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              {idx === 0 && <FieldLabel>Saldo (R$)</FieldLabel>}
              <FieldInput
                type="number"
                min="0"
                placeholder="Ex: 3000"
                value={debt.saldo}
                onChange={(e) => updateDebt(debt.id, "saldo", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              {idx === 0 && <FieldLabel>Taxa (% A.M.)</FieldLabel>}
              <FieldInput
                type="number"
                min="0"
                placeholder="Ex: 15"
                value={debt.taxa}
                onChange={(e) => updateDebt(debt.id, "taxa", e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              {idx === 0 && <FieldLabel>Mín. Mensal (R$)</FieldLabel>}
              <FieldInput
                type="number"
                min="0"
                placeholder="Ex: 150"
                value={debt.minimo}
                onChange={(e) => updateDebt(debt.id, "minimo", e.target.value)}
              />
            </FieldGroup>
            {debts.length > 1 && (
              <RemoveButton onClick={() => removeDebt(debt.id)}>✕</RemoveButton>
            )}
          </DebtRow>
        ))}

        <ExtraRow>
          <AddDebtButton onClick={addDebt}>+ Adicionar dívida</AddDebtButton>
          <FieldGroup>
            <FieldLabel>Valor Extra por Mês além dos Mínimos (R$)</FieldLabel>
            <FieldInput
              type="number"
              min="0"
              placeholder="Ex: Digite um valor extra além do mínimo"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
            />
          </FieldGroup>
        </ExtraRow>
      </InputsCard>

      {result !== null && (
        <ResultCard>
          <ResultTitle>
            Prazo para Quitação —{" "}
            {method === "avalanche" ? "Avalanche" : "Bola de Neve"}
          </ResultTitle>
          <ResultValue>
            {result.months} {result.months === 1 ? "mês" : "meses"}
          </ResultValue>
          <ResultBreakdown>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Saldo total atual</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {formatBRL(totalSaldo)}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Total de juros pagos</ResultBreakdownLabel>
              <ResultBreakdownValue style={{ color: "#ef4444" }}>
                {formatBRL(result.totalJuros)}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
            <ResultBreakdownItem>
              <ResultBreakdownLabel>Custo total</ResultBreakdownLabel>
              <ResultBreakdownValue>
                {formatBRL(totalSaldo + result.totalJuros)}
              </ResultBreakdownValue>
            </ResultBreakdownItem>
          </ResultBreakdown>
        </ResultCard>
      )}
    </>
  );
};
