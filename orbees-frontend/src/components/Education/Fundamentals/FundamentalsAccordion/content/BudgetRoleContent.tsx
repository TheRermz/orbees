import {
  BodyText,
  BulletItem,
  BulletList,
  InlineSource,
} from "../FundamentalsAccordion.styles";

export const BudgetRoleContent = () => (
  <>
    <BodyText>
      <strong>47,7%</strong> dos brasileiros não realizam qualquer controle do
      próprio orçamento. <InlineSource>CNDL, 2020</InlineSource> O orçamento não
      é uma prisão — é um mapa financeiro. Ele mostra onde você está e para onde
      está indo.
    </BodyText>
    <BulletList>
      <BulletItem>
        Liste todas as receitas (salário, freelance, aluguéis, benefícios)
      </BulletItem>
      <BulletItem>
        Categorize todas as despesas: fixas (aluguel, condomínio, plano de
        saúde) e variáveis (alimentação, lazer, vestuário)
      </BulletItem>
      <BulletItem>
        Calcule o saldo: se negativo, identifique onde cortar antes de contrair
        mais dívidas
      </BulletItem>
      <BulletItem>
        Defina metas de poupança e acompanhe semanalmente — 81,8% dos
        brasileiros que acompanham as finanças pagam contas em dia{" "}
        <InlineSource>BCB, 2023</InlineSource>
      </BulletItem>
    </BulletList>
    <BodyText>
      A Orbees faz isso automaticamente ao importar seu extrato bancário — basta
      conectar e acompanhar.
    </BodyText>
  </>
);
