import { Lightbulb } from "lucide-react";
import {
  BodyText,
  ColTitle,
  InlineSource,
  TipBox,
  TwoColGrid,
} from "../FundamentalsAccordion.styles";

export const DebtMethodsContent = () => (
  <>
    <BodyText>
      O cartão de crédito é a principal dívida de <strong>63,6%</strong> dos
      endividados brasileiros, seguido por empréstimos em instituições
      financeiras (<strong>21,3%</strong>). A taxa média cobrada ao consumidor
      chegou a <strong>58,32% a.a.</strong> em 2025.{" "}
      <InlineSource>CNDL / PEIC 2025</InlineSource>
    </BodyText>
    <TwoColGrid>
      <div>
        <ColTitle>Bola de Neve (Snowball)</ColTitle>
        <BodyText>
          Pague o mínimo em todas as dívidas e concentre o máximo na{" "}
          <em>menor dívida</em>. Ao quitá-la, use o valor liberado para a
          próxima.
        </BodyText>
        <BodyText style={{ marginTop: 8 }}>
          Vantagem: motivação psicológica — você elimina dívidas rapidamente e
          mantém o foco.
        </BodyText>
      </div>
      <div>
        <ColTitle>Avalanche</ColTitle>
        <BodyText>
          Pague o mínimo em todas as dívidas e concentre na dívida com{" "}
          <em>maior taxa de juros</em> (ex: rotativo do cartão).
        </BodyText>
        <BodyText style={{ marginTop: 8 }}>
          Vantagem: matematicamente mais eficiente — você paga menos juros no
          total e quita mais rápido.
        </BodyText>
      </div>
    </TwoColGrid>
    <TwoColGrid>
      <TipBox $color="#22c55e">
        <Lightbulb size={14} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          Principais causas de inadimplência: desemprego, redução de renda e
          descontrole financeiro. <InlineSource>Silva, UFPB, 2021</InlineSource>
        </span>
      </TipBox>
      <TipBox $color="#22c55e">
        <span>
          Antes de contrair novo crédito, verifique se a nova taxa é menor que a
          dívida atual. Use o Serasa Limpa Nome para renegociar.
        </span>
      </TipBox>
    </TwoColGrid>
  </>
);
