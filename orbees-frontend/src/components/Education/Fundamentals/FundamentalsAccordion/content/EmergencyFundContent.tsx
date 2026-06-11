import {
  BodyText,
  BulletItem,
  BulletList,
  Source,
} from "../FundamentalsAccordion.styles";

export const EmergencyFundContent = () => (
  <>
    <BodyText>
      A reserva de emergência é a base de uma vida financeira saudável. Ela
      oferece proteção contra imprevistos e reduz a necessidade de recorrer a
      empréstimos ou crédito de alto custo.
    </BodyText>
    <BulletList>
      <BulletItem>
        <strong>Objetivo:</strong> formar uma reserva capaz de sustentar
        despesas essenciais durante períodos de instabilidade financeira.
      </BulletItem>
      <BulletItem>
        <strong>Meta ideal:</strong> 6 meses para CLT ou 12 meses para
        autônomos/profissionais liberais
      </BulletItem>
      <BulletItem>
        <strong>Onde guardar:</strong> Tesouro Selic (liquidez D+1) ou CDB com
        liquidez diária de banco sólido
      </BulletItem>
      <BulletItem>
        <strong>Como construir:</strong> Comece com R$500 como primeira meta.
        Depois aumente gradualmente
      </BulletItem>
      <BulletItem>
        <strong>Não use para:</strong> Oportunidades de investimento, viagens,
        presentes. É reserva de emergência, não fundo de oportunidades
      </BulletItem>
      <BulletItem>
        <strong>Fontes:</strong>
        <Source
          href="https://www.bcb.gov.br/content/cidadaniafinanceira/documentos_cidadania/RCF/relatorio_de_cidadania_financeira_2025.pdf"
          target="blank"
          rel="noopener noreferrer"
        >
          Banco Central do Brasil (Cidadania Financeira),
        </Source>
        <Source
          href="https://www.tesourodireto.com.br/produtos/dados-sobre-titulos/rendimento-dos-titulos"
          target="blank"
          rel="noopener noreferrer"
        >
          Tesouro Nacional,
        </Source>
        e
        <Source
          href="https://www.gov.br/investidor/pt-br"
          target="blank"
          rel="noopener noreferrer"
        >
          CVM
        </Source>
      </BulletItem>
    </BulletList>
  </>
);
