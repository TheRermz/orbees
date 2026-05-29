import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Banner, BannerText, BannerButton } from "./EducationHeroBanner.styles";

export const EducationHeroBanner = () => {
  const navigate = useNavigate();

  return (
    <Banner>
      <BannerText>
        A Orbees combina controle financeiro com educação prática. Aqui você
        aprende o que as escolas nunca ensinaram — do orçamento mensal aos
        investimentos de longo prazo — com base em pesquisas e legislação
        brasileira atualizada.
      </BannerText>
      <BannerButton onClick={() => navigate("/education/fundamentals")}>
        <BookOpen size={18} />
        Aprenda na Prática
      </BannerButton>
    </Banner>
  );
};
