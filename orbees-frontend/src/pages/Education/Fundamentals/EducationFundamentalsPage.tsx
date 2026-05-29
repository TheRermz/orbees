import { CalloutBox } from "../../../components/Education/Fundamentals/CalloutBox/CalloutBox";
import { CompoundInterest } from "../../../components/Education/Fundamentals/CompoundInterest/CompoundInterest";
import { FundamentalsAccordion } from "../../../components/Education/Fundamentals/FundamentalsAccordion/FundamentalsAccordion";
import { PillarGrid } from "../../../components/Education/Fundamentals/PillarCard/PillarCard";
import { Rule502030 } from "../../../components/Education/Fundamentals/Rule502030/Rule502030";
import { CALLOUT, PILLARS, ACCORDIONS } from "./data";
import {
  Container,
  Header,
  PageTitle,
  PageSubtitle,
  Content,
  Section,
  SectionTitle,
} from "./EducationFundamentalsPage.styles";

export const EducationFundamentalsPage = () => {
  return (
    <Container>
      <Header>
        <PageTitle>Fundamentos</PageTitle>
        <PageSubtitle>
          Os conceitos essenciais que toda pessoa deveria aprender antes dos 25
          anos
        </PageSubtitle>
      </Header>

      <Content>
        <CalloutBox
          title={CALLOUT.title}
          segments={CALLOUT.body}
          source={CALLOUT.source}
          sourceUrl={CALLOUT.sourceUrl}
        />

        <Section>
          <SectionTitle>Os 4 Pilares das Finanças Pessoais</SectionTitle>
          <PillarGrid pillars={PILLARS} />
        </Section>

        <Section>
          <Rule502030 />
        </Section>

        <CompoundInterest />

        {ACCORDIONS.map((item, i) => (
          <FundamentalsAccordion
            key={item.id}
            item={item}
            defaultOpen={i === 0}
          />
        ))}
      </Content>
    </Container>
  );
};
