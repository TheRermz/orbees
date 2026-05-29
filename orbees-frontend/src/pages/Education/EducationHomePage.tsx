import { EducationHeroBanner } from "../../components/Education/EducationHeroBanner/EducationHeroBanner";
import { EducationStatCard } from "../../components/Education/EducationStatCard/EducationStatCard";
import { EducationTrailStep } from "../../components/Education/EducationTrailStep/EducationTrailSteps";
import { EducationWhyCard } from "../../components/Education/EducationWhyCard/EducationWhyCard";
import { STAT_CARDS, WHY_CARDS, TRAIL_STEPS } from "./data";
import {
  Container,
  Content,
  Header,
  PageSubtitle,
  PageTitle,
  Section,
  SectionTitle,
  StatsRow,
  WhyGrid,
} from "./EducationHomePage.styles";

export const EducationHomePage = () => {
  return (
    <Container>
      <Content>
        <Header>
          <PageTitle>Educação Financeira</PageTitle>
          <PageSubtitle>
            Conhecimento é o melhor investimento que você pode fazer.
          </PageSubtitle>
        </Header>

        <EducationHeroBanner />

        <StatsRow>
          {STAT_CARDS.map((stat, i) => (
            <EducationStatCard key={i} stat={stat} />
          ))}
        </StatsRow>

        <Section>
          <SectionTitle>Por que gestão financeira é essencial?</SectionTitle>
          <WhyGrid>
            {WHY_CARDS.map((card, i) => (
              <EducationWhyCard key={i} card={card} />
            ))}
          </WhyGrid>
        </Section>

        <Section>
          <SectionTitle>Sua trilha de aprendizado</SectionTitle>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
            Siga as seções em ordem para construir uma base sólida
          </p>
          {TRAIL_STEPS.map((step) => (
            <EducationTrailStep key={step.number} step={step} />
          ))}
        </Section>
      </Content>
    </Container>
  );
};
