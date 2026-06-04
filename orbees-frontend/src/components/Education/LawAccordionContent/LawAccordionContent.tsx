import {
  BodyText,
  BulletList,
  BulletItem,
  TwoColGrid,
  InlineSource,
} from "../../../pages/Education/Law/EducationLawPage.styles";

export const CreditContent = () => (
  <TwoColGrid>
    <div>
      <h5 style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: 10 }}>
        Como funciona o Score
      </h5>
      <BodyText>
        O score de crédito (<strong>0 a 1000</strong>) indica a probabilidade de
        pagar contas em dia. Bureaus como Serasa e SPC calculam com base em:
        pagamentos em dia, tempo de relacionamento com o mercado, quantidade de
        dívidas e consultas ao CPF.
        <InlineSource>Serasa Score</InlineSource>
      </BodyText>
      <BulletList style={{ marginTop: 10 }}>
        <BulletItem>0–300: Muito baixo</BulletItem>
        <BulletItem>301–500: Baixo</BulletItem>
        <BulletItem>501–700: Bom</BulletItem>
        <BulletItem>701–1000: Excelente</BulletItem>
      </BulletList>
    </div>
    <div>
      <h5 style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: 10 }}>
        Armadilhas do crédito
      </h5>
      <BulletList>
        <BulletItem>
          <strong>Rotativo do cartão:</strong> até 400% a.a.{" "}
          <InlineSource>BCB</InlineSource> — nunca pague só o mínimo
        </BulletItem>
        <BulletItem>
          <strong>Cheque especial:</strong> taxa similar ao rotativo. Use apenas
          em emergências extremas
        </BulletItem>
        <BulletItem>
          <strong>Parcelamento com juros:</strong> veja o custo total, não
          apenas a parcela
        </BulletItem>
        <BulletItem>
          <strong>Empréstimo para pagar dívida:</strong> só vale se a nova taxa
          for menor que a dívida atual
        </BulletItem>
      </BulletList>
    </div>
  </TwoColGrid>
);

export const LgpdContent = () => (
  <TwoColGrid>
    <div>
      <h5 style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: 6 }}>
        LGPD{" "}
        <InlineSource style={{ fontSize: "0.65rem" }}>
          Lei 13.709/2018
        </InlineSource>
      </h5>
      <BodyText style={{ marginBottom: 10 }}>
        A Lei Geral de Proteção de Dados garante controle sobre seus dados
        pessoais. No contexto financeiro:
      </BodyText>
      <BulletList>
        <BulletItem>
          Bancos e fintechs precisam de consentimento explícito para usar seus
          dados
        </BulletItem>
        <BulletItem>
          Você pode solicitar exclusão, correção e portabilidade dos seus dados
        </BulletItem>
        <BulletItem>
          Violações geram multas de até <strong>2% do faturamento</strong> (máx.
          R$50 milhões por infração)
          <InlineSource>Art. 52, LGPD</InlineSource>
        </BulletItem>
      </BulletList>
    </div>
    <div>
      <h5 style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: 6 }}>
        Open Finance Brasil{" "}
        <InlineSource style={{ fontSize: "0.65rem" }}>
          BCB — Open Finance
        </InlineSource>
      </h5>
      <BodyText style={{ marginBottom: 10 }}>
        Sistema regulado pelo BCB que permite compartilhar dados financeiros
        entre instituições de forma segura:
      </BodyText>
      <BulletList>
        <BulletItem>
          Você autoriza quais dados compartilha e com quem
        </BulletItem>
        <BulletItem>
          Permite comparar produtos (crédito, seguros) entre bancos
        </BulletItem>
        <BulletItem>Facilita portabilidade de salário e de crédito</BulletItem>
        <BulletItem>
          Sempre sob seu controle — você pode revogar a qualquer momento
        </BulletItem>
      </BulletList>
    </div>
  </TwoColGrid>
);
