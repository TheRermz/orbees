import {
  BodyText,
  BulletItem,
  BulletList,
  InlineSource,
} from "../FundamentalsAccordion.styles";

export const EmergencyFundContent = () => (
  <>
    <BodyText>
      O fundo de emergência é a base de qualquer planejamento financeiro. Sem
      ele, qualquer imprevisto vira dívida.
    </BodyText>
    <BulletList>
      <BulletItem>
        <strong>Meta mínima:</strong> 3 meses de despesas mensais para quem tem
        renda fixa CLT <InlineSource>BCB</InlineSource>
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
    </BulletList>
  </>
);
