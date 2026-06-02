export const FAIXAS = [
  { limite: 2259.2, aliquota: 0, deducao: 0 },
  { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { limite: Infinity, aliquota: 0.275, deducao: 896.0 },
];

export const DEDUCAO_DEPENDENTE = 2275.08 / 12;
export const LIMITE_EDUCACAO_ANUAL = 3561.5;
export const LIMITE_PREVIDENCIA = 0.12;

export const calcularIR = (baseCalculo: number): number => {
  if (baseCalculo <= 0) return 0;
  for (const faixa of FAIXAS) {
    if (baseCalculo <= faixa.limite) {
      return Math.max(baseCalculo * faixa.aliquota - faixa.deducao, 0);
    }
  }
  return 0;
};
