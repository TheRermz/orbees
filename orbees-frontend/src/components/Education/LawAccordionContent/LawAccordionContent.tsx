import {
  BodyText,
  BulletList,
  BulletItem,
  TwoColGrid,
  InlineSource,
} from "../../../pages/Education/Law/EducationLawPage.styles";
import { Source } from "../EducationStatCard/EducationStatCard.styles";

export const CreditContent = () => (
  <TwoColGrid>
    <div>
      <h5 style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: 10 }}>
        Como funciona o Score
      </h5>
      <BodyText>
        O score de crédito é uma pontuação utilizada por empresas de análise de
        crédito para estimar o risco de inadimplência. A pontuação é calculada
        com base em fatores como histórico de pagamentos, dívidas existentes,
        tempo de relacionamento com o mercado e informações do Cadastro
        Positivo. <br /> No caso da Serasa, a pontuação varia de 0 a 1000{" "}
        <InlineSource>
          <Source
            href="https://www.serasa.com.br/score/"
            target="_blank"
            rel="noopener norefeerer"
          >
            Serasa Score
          </Source>
        </InlineSource>
        pontos, sendo que valores mais altos indicam menor risco de
        inadimplência.{" "}
        <InlineSource>
          <Source
            href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12414.htm"
            target="_blank"
            rel="noopener norefeerer"
          >
            Lei do Cadastro Positivo (Lei nº 12.414/2011)
          </Source>{" "}
        </InlineSource>
      </BodyText>
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
          <Source
            href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
            target="_blank"
            rel="noopener norefeerer"
          >
            Lei 13.709/2018
          </Source>
        </InlineSource>
      </h5>
      <BodyText style={{ marginBottom: 10 }}>
        A Lei Geral de Proteção de Dados estabelece regras para a coleta,
        utilização e compartilhamento de dados pessoais, garantindo mais
        transparência e controle ao cidadão.
      </BodyText>
      <BulletList>
        <BulletItem>
          Você pode solicitar acesso, correção e, em determinadas situações,
          exclusão de seus dados pessoais.
        </BulletItem>
        <BulletItem>
          Instituições financeiras devem possuir uma base legal válida para
          tratar seus dados.
        </BulletItem>
        <BulletItem>
          O descumprimento da LGPD pode gerar sanções administrativas e multas
          de até <strong>2% do faturamento</strong> da empresa, limitadas a R$
          50 milhões por infração.
          <InlineSource>
            <Source
              href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
              target="_blank"
              rel="noopener norefeerer"
            >
              Art. 52, LGPD
            </Source>
          </InlineSource>
        </BulletItem>
      </BulletList>
    </div>
    <div>
      <h5 style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: 6 }}>
        Open Finance Brasil{" "}
        <InlineSource style={{ fontSize: "0.65rem" }}>
          <Source
            href="https://www.bcb.gov.br/estabilidadefinanceira/openfinance"
            target="_blank"
            rel="noopener norefereer"
          >
            BCB — Open Finance
          </Source>
        </InlineSource>
      </h5>
      <BodyText style={{ marginBottom: 10 }}>
        O Open Finance é um sistema regulado pelo Banco Central que permite o
        compartilhamento seguro de dados financeiros entre instituições
        autorizadas.
      </BodyText>
      <BulletList>
        <BulletItem>
          Você escolhe quais dados compartilhar e com qual instituição.
        </BulletItem>
        <BulletItem>O compartilhamento depende de sua autorização.</BulletItem>
        <BulletItem>
          Pode facilitar a comparação de produtos financeiros e o acesso a
          ofertas mais adequadas ao seu perfil.
        </BulletItem>
        <BulletItem>
          A autorização pode ser cancelada a qualquer momento.
        </BulletItem>
      </BulletList>
    </div>
  </TwoColGrid>
);
