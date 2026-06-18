import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button, InsightItem } from "../../../../components/ui";
import { FooterActions } from "../ImportPage.styles";
import type { CategorizeProps } from "./interface";
import { CategorizeRowItem } from "../../../../components/Import/CategorizeRowItem";

export const Categorize = ({
  preview,
  categories,
  groups,
  categorizeState,
  loading,
  onStateChange,
  onBack,
  onImport,
}: CategorizeProps) => (
  <>
    <InsightItem
      text="Revise as categorias sugeridas e ajuste o que precisar. O sistema aprenderá com suas correções nas próximas importações."
      variant="info"
    />
    <div
      style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {preview.map((p, i) => {
        const state = categorizeState[p.originalDescription ?? p.title] ?? {
          categoryId: "",
          shareWithGroup: false,
          groupId: groups[0]?.id ?? "",
          groupCategoryId: "",
        };
        return (
          <CategorizeRowItem
            key={i}
            preview={p}
            state={state}
            categories={categories}
            groups={groups}
            onChange={onStateChange}
          />
        );
      })}
    </div>
    <FooterActions>
      <Button variant="secondary" onClick={onBack}>
        <ArrowLeft size={16} /> Voltar
      </Button>
      <Button loading={loading} onClick={onImport}>
        Importar Extrato <CheckCircle size={16} />
      </Button>
    </FooterActions>
  </>
);
