import {
  BodyText,
  ColTitle,
  Source,
  TwoColGrid,
} from "../FundamentalsAccordion.styles";

export const DebtMethodsContent = () => (
  <>
    <TwoColGrid>
      <div>
        <ColTitle>Avalanche</ColTitle>
        <BodyText>
          Pague o mínimo em todas as dívidas e concentre na dívida com{" "}
          <em>maior taxa de juros</em> (ex: rotativo do cartão).
        </BodyText>
        <BodyText style={{ marginTop: 8 }}>
          Também chamado de “empilhamento de dívidas”, a ideia dessa tática é
          pagar a menor quantidade de juros possível e quitar tudo.
        </BodyText>
      </div>
      <div>
        <ColTitle>Bola de Neve (Snowball)</ColTitle>
        <BodyText>
          Pague o mínimo em todas as dívidas e concentre o máximo na{" "}
          <em>menor dívida</em>. Ao quitá-la, use o valor liberado para a
          próxima.
        </BodyText>
        <BodyText style={{ marginTop: 8 }}>
          Essa estratégia funciona da mesma forma que o método avalanche, porém,
          com uma diferença: aqui, ao invés de organizar seus débitos
          colocando-os do que tem maior juros para o que tem o menor, você os
          ordena de acordo com a quantia do saldo pendente, do menor para o
          maior.
        </BodyText>
      </div>
    </TwoColGrid>
    <Source
      href="https://blog.nubank.com.br/metodo-avalanche-e-bola-de-neve/?utm_source=chatgpt.com"
      target="blank"
      rel="noopener norefeerer"
    >
      Métodos Avalanche e Bola de neve: afinal, o que é isso?
    </Source>
  </>
);
