import { CheckCircle, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../../../components/ui";
import { formatCurrency } from "../../../../helpers/formatters";
import {
  PreviewCard,
  PreviewHeader,
  PreviewFileName,
  PreviewCount,
  Table,
  Th,
  Td,
  Amount,
  CategoryTag,
  FooterActions,
} from "../ImportPage.styles";
import type { PreviewProps } from "./interface";

export const Preview = ({
  file,
  preview,
  categories,
  banks,
  selectedBank,
  loading,
  isCSV,
  onBankChange,
  onProcessCSV,
  onBack,
  onContinue,
}: PreviewProps) => {
  const uncategorizedCount = preview.filter(
    (p) => !p.suggestedCategoryId
  ).length;

  return (
    <>
      {isCSV && !preview.length && (
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <select
            value={selectedBank ?? ""}
            onChange={(e) => onBankChange(Number(e.target.value))}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: "0.9rem",
            }}
          >
            {banks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <Button loading={loading} onClick={onProcessCSV}>
            Processar CSV
          </Button>
        </div>
      )}

      {preview.length > 0 && (
        <PreviewCard>
          <PreviewHeader>
            <PreviewFileName>
              <FileText size={16} />
              {file?.name}
            </PreviewFileName>
            <PreviewCount>{preview.length} transações encontradas</PreviewCount>
          </PreviewHeader>
          <Table>
            <thead>
              <tr>
                <Th>Data</Th>
                <Th>Descrição</Th>
                <Th>Valor</Th>
                <Th>Categoria</Th>
              </tr>
            </thead>
            <tbody>
              {preview.map((p, i) => (
                <tr key={i}>
                  <Td>
                    {new Date(p.transactionDate).toLocaleDateString("pt-BR")}
                  </Td>
                  <Td>{p.title}</Td>
                  <Td>
                    <Amount $positive={p.amount > 0}>
                      {p.amount > 0 ? "+" : ""}
                      {formatCurrency(Math.abs(p.amount))}
                    </Amount>
                  </Td>
                  <Td>
                    {p.suggestedCategoryId ? (
                      <CategoryTag $suggested>
                        <CheckCircle size={12} />
                        {categories.find((c) => c.id === p.suggestedCategoryId)
                          ?.name ?? "Sugerida"}
                      </CategoryTag>
                    ) : (
                      <CategoryTag $suggested={false}>
                        A categorizar
                      </CategoryTag>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PreviewCard>
      )}

      <FooterActions>
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft size={16} /> Voltar
        </Button>
        {preview.length > 0 && (
          <Button onClick={onContinue}>
            {uncategorizedCount > 0
              ? `Categorizar ${uncategorizedCount} transações`
              : "Continuar"}
            <ArrowRight size={16} />
          </Button>
        )}
      </FooterActions>
    </>
  );
};
