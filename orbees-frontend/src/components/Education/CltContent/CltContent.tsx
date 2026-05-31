import { Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CardsGrid,
  CltCard,
  CardTitle,
  BodyText,
  CardSource,
  TipBox,
} from "../../../pages/Education/Law/EducationLawPage.styles";
import { CLT_CARDS } from "../../../pages/Education/Law/data";

export const CltContent = () => {
  const navigate = useNavigate();

  return (
    <>
      <CardsGrid>
        {CLT_CARDS.map((card) => (
          <CltCard key={card.title}>
            <CardTitle>{card.title}</CardTitle>
            <BodyText>
              {card.bold
                ? card.description
                  .split(card.bold)
                  .flatMap((part, i, arr) =>
                    i < arr.length - 1
                      ? [part, <strong key={i}>{card.bold}</strong>]
                      : [part]
                  )
                : card.description}
            </BodyText>
            <CardSource>{card.source}</CardSource>
          </CltCard>
        ))}
      </CardsGrid>
      <TipBox>
        <Lightbulb size={14} style={{ flexShrink: 0, marginTop: 2 }} />
        <span>
          Use a Calculadora de Férias CLT na aba{" "}
          <button
            style={{
              background: "none",
              border: "none",
              color: "#15803d",
              cursor: "pointer",
              fontWeight: 600,
              padding: 0,
            }}
            onClick={() => navigate("/education/calculators")}
          >
            Calculadoras
          </button>{" "}
          para simular seus valores exatos.
        </span>
      </TipBox>
    </>
  );
};
