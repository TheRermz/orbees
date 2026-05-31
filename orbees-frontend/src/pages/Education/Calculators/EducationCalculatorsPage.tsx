import { useState } from "react";
import { CALCULATORS } from "./data";

import {
  Container,
  Header,
  PageTitle,
  PageSubtitle,
  Body,
  Sidebar,
  SidebarItem,
  SidebarItemName,
  SidebarItemFormula,
  Panel,
  PanelHeader,
  PanelTitleGroup,
  PanelTitle,
  PanelSubtitle,
  FormulaBadge,
} from "./EducationCalculatorsPage.styles";
import { COMPONENTS } from "./components";

export const EducationCalculatorsPage = () => {
  const [activeId, setActiveId] = useState("juros-simples");
  const active = CALCULATORS.find((c) => c.id === activeId)!;

  return (
    <Container>
      <Header>
        <PageTitle>Calculadoras</PageTitle>
        <PageSubtitle>
          Simule cenários reais e tome decisões com números, não com achismos
        </PageSubtitle>
      </Header>

      <Body>
        <Sidebar>
          {CALCULATORS.map((calc) => (
            <SidebarItem
              key={calc.id}
              $active={calc.id === activeId}
              onClick={() => setActiveId(calc.id)}
            >
              <SidebarItemName $active={calc.id === activeId}>
                {calc.name}
              </SidebarItemName>
              <SidebarItemFormula $active={calc.id === activeId}>
                {calc.formula}
              </SidebarItemFormula>
            </SidebarItem>
          ))}
        </Sidebar>

        <Panel>
          <PanelHeader>
            <PanelTitleGroup>
              <PanelTitle>{active.name}</PanelTitle>
              <PanelSubtitle>{active.subtitle}</PanelSubtitle>
            </PanelTitleGroup>
            <FormulaBadge>{active.badge}</FormulaBadge>
          </PanelHeader>

          {COMPONENTS[activeId]}
        </Panel>
      </Body>
    </Container>
  );
};
