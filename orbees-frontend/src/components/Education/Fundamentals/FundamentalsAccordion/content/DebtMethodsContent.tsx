import {
  BodyText,
  BulletItem,
  BulletList,
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
          <BulletList>
            <BulletItem>Pague o mínimo em todas as dívidas.</BulletItem>
            <BulletItem>
              Direcione todo valor extra para a dívida com <em>maior juros</em>.
            </BulletItem>
            <BulletItem>Ao quitar, passe para a próxima maior taxa.</BulletItem>
          </BulletList>
        </BodyText>
      </div>
      <div>
        <ColTitle>Bola de Neve (Snowball)</ColTitle>
        <BodyText style={{ marginTop: 8 }}>
          <BulletList>
            <BulletItem>Pague o mínimo em todas as dívidas.</BulletItem>
            <BulletItem>
              Direcione todo valor extra para a dívida com <em>menor saldo</em>.
            </BulletItem>
            <BulletItem>
              Ao quitar, passe para a próxima menor dívida.
            </BulletItem>
          </BulletList>
        </BodyText>
      </div>
    </TwoColGrid>
    <Source
      href="https://blog.nubank.com.br/metodo-avalanche-e-bola-de-neve/"
      target="blank"
      rel="noopener norefeerer"
    >
      Métodos Avalanche e Bola de neve: afinal, o que é isso?
    </Source>
  </>
);
