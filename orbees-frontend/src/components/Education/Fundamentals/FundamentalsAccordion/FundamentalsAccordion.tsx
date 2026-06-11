import { useState } from "react";
import type { FundamentalsAccordionProps } from "./interface";
import { EmergencyFundContent } from "./content/EmergencyFundContent";
import { DebtMethodsContent } from "./content/DebtMethodsContent";
import {
  AccordionBody,
  AccordionHeader,
  AccordionTitle,
  AccordionWrapper,
  ChevronIcon,
} from "./FundamentalsAccordion.styles";
import { ChevronDown } from "lucide-react";

export const FundamentalsAccordion = ({
  item,
  defaultOpen = false,
}: FundamentalsAccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const renderContent = () => {
    switch (item.content.type) {
      case "emergency_fund":
        return <EmergencyFundContent />;
      case "debt_methods":
        return <DebtMethodsContent />;
      // case "budget_role":
      //   return <BudgetRoleContent />;
    }
  };

  return (
    <AccordionWrapper>
      <AccordionHeader $open={open} onClick={() => setOpen((o) => !o)}>
        <AccordionTitle>{item.title}</AccordionTitle>
        <ChevronIcon $open={open}>
          <ChevronDown size={18} />
        </ChevronIcon>
      </AccordionHeader>
      {open && <AccordionBody>{renderContent()}</AccordionBody>}
    </AccordionWrapper>
  );
};
