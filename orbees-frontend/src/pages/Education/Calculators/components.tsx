import { CustoParcelamento } from "../../../components/Education/Calculators/CustoParcelamento";
import { FeriasClt } from "../../../components/Education/Calculators/FeriasClt";
import { JurosCompostos } from "../../../components/Education/Calculators/JurosCompostos";
import { JurosSimples } from "../../../components/Education/Calculators/JurosSimples";
import { MetasPoupanca } from "../../../components/Education/Calculators/MetasPoupanca";
import { QuitacaoDividas } from "../../../components/Education/Calculators/QuitacaoDividas";

export const COMPONENTS: Record<string, React.ReactNode> = {
  "juros-simples": <JurosSimples />,
  "juros-compostos": <JurosCompostos />,
  "ferias-clt": <FeriasClt />,
  parcelamento: <CustoParcelamento />,
  metas: <MetasPoupanca />,
  quitacao: <QuitacaoDividas />,
};
