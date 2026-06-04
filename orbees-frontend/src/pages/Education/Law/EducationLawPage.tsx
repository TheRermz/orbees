import { useState } from "react";
import { ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { FILTER_PILLS, LAW_ACCORDIONS, LAW_REFERENCES } from "./data";
import {
  Container,
  Header,
  PageTitle,
  PageSubtitle,
  Content,
  FilterRow,
  FilterPillButton,
  AccordionsStack,
  AccordionWrapper,
  AccordionHeader,
  AccordionTitle,
  ChevronIcon,
  AccordionBody,
  ReferencesSection,
  RefTitle,
  RefList,
  RefItem,
  RefLink,
} from "./EducationLawPage.styles";
import { CltContent } from "../../../components/Education/CltContent/CltContent";
import { HoleriteContent } from "../../../components/Education/HoleriteContent/HoleriteContent";
import {
  CreditContent,
  LgpdContent,
} from "../../../components/Education/LawAccordionContent/LawAccordionContent";
import { LawCalloutBox } from "../../../components/Education/LawCalloutBox/LawCalloutBox";

const ACCORDION_CONTENT: Record<string, React.ReactNode> = {
  holerite: <HoleriteContent />,
  clt: <CltContent />,
  credit: <CreditContent />,
  lgpd: <LgpdContent />,
};

interface AccordionItemProps {
  id: string;
  title: string;
  defaultOpen?: boolean;
}

const AccordionItem = ({
  id,
  title,
  defaultOpen = false,
}: AccordionItemProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <AccordionWrapper>
      <AccordionHeader $open={open} onClick={() => setOpen((o) => !o)}>
        <AccordionTitle>{title}</AccordionTitle>
        <ChevronIcon $open={open}>
          <ChevronDown size={18} />
        </ChevronIcon>
      </AccordionHeader>
      {open && <AccordionBody>{ACCORDION_CONTENT[id]}</AccordionBody>}
    </AccordionWrapper>
  );
};

export const EducationLawPage = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const visibleAccordions = activeFilter
    ? LAW_ACCORDIONS.filter((a) =>
      FILTER_PILLS.find((p) => p.id === activeFilter)?.accordionIds.includes(
        a.id
      )
    )
    : LAW_ACCORDIONS;

  const handleFilterClick = (id: string) => {
    setActiveFilter((prev) => (prev === id ? null : id));
  };

  return (
    <Container>
      <Header>
        <PageTitle>Direitos e Tributos</PageTitle>
        <PageSubtitle>
          Legislação trabalhista, tributação, crédito e proteção de dados
          financeiros
        </PageSubtitle>
      </Header>

      <Content>
        <LawCalloutBox />

        <FilterRow>
          {FILTER_PILLS.map((pill) => {
            const Icon = (
              LucideIcons as unknown as Record<
                string,
                React.ComponentType<{ size?: number }>
              >
            )[pill.icon];
            return (
              <FilterPillButton
                key={pill.id}
                $color={pill.color}
                $active={activeFilter === pill.id}
                onClick={() => handleFilterClick(pill.id)}
              >
                {Icon && <Icon size={13} />}
                {pill.label}
              </FilterPillButton>
            );
          })}
        </FilterRow>

        <AccordionsStack>
          {visibleAccordions.map((accordion, i) => (
            <AccordionItem
              key={accordion.id}
              id={accordion.id}
              title={accordion.title}
              defaultOpen={i === 0 && activeFilter !== null}
            />
          ))}
        </AccordionsStack>

        <ReferencesSection>
          <RefTitle>Referências desta seção</RefTitle>
          <RefList>
            {LAW_REFERENCES.map((ref, i) => (
              <RefItem key={i}>
                {ref.author} <em>{ref.title}</em>{" "}
                <RefLink
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ref.display}
                </RefLink>
              </RefItem>
            ))}
          </RefList>
        </ReferencesSection>
      </Content>
    </Container>
  );
};
