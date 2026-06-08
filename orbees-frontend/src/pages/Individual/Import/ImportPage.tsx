import { useState, useCallback } from "react";
import { CheckCircle2 } from "lucide-react";
import { useTransactions } from "../../../hooks/useTransaction";
import { useCategories } from "../../../hooks/useCategories";
import { useGroups } from "../../../hooks/useGroups";
import { bankService } from "../../../services/bankService";
import { useToast } from "../../../contexts/useToast";
import {
  getStepStatus,
  STEPS,
  ALLOWED_MIME,
  type CategorizeState,
  type ImportResult,
  type Step,
} from "./interface";

import {
  Container,
  Header,
  PageTitle,
  PageSubtitle,
  StepperCard,
  StepItem,
  StepNumber,
  StepDivider,
  Content,
} from "./ImportPage.styles";
import type { BankDto } from "../../../interfaces/bank";
import { TransactionType } from "../../../interfaces/enums";
import { Upload } from "./steps/Upload";
import { Preview } from "./steps/Preview";
import { Categorize } from "./steps/Categorize";
import { Success } from "./steps/Success";

export const ImportPage = () => {
  const { preview, previewOFX, previewCSV, previewXLS, importTransactions } =
    useTransactions();
  const { categories } = useCategories();
  const { groups } = useGroups();

  const { showToast } = useToast();

  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [banks, setBanks] = useState<BankDto[]>([]);
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [titleOverrides, setTitleOverrides] = useState<Record<string, string>>({});
  const [categorizeState, setCategorizeState] = useState<
    Record<string, CategorizeState>
  >({});
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const handleFile = useCallback(
    async (f: File) => {
      const ext = f.name.split(".").pop()?.toLowerCase();
      if (ext !== "ofx" && ext !== "csv" && ext !== "xls") {
        showToast("error", "Formato inválido. Use arquivos .OFX, .CSV ou .XLS.");
        return;
      }
      if (!ALLOWED_MIME[ext].includes(f.type)) {
        showToast("error", "Tipo de arquivo inválido. Verifique se o arquivo é legítimo.");
        return;
      }
      setFile(f);
      setLoading(true);
      if (ext === "ofx") {
        await previewOFX(f);
        setStep(2);
      } else {
        const bankList = await bankService.getAll();
        setBanks(bankList);
        setSelectedBank(bankList[0]?.id ?? null);
        setStep(2);
      }
      setLoading(false);
    },
    [previewOFX, showToast]
  );

  const handleFilePreview = async () => {
    if (!file || !selectedBank) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    setLoading(true);
    if (ext === "xls") {
      await previewXLS(file, selectedBank);
    } else {
      await previewCSV(file, selectedBank);
    }
    setLoading(false);
  };

  const handleTitleChange = (key: string, title: string) => {
    setTitleOverrides((prev) => ({ ...prev, [key]: title }));
  };

  const goToCategorize = () => {
    const initial: Record<string, CategorizeState> = {};
    preview.forEach((p) => {
      const key = p.originalDescription ?? p.title;
      initial[key] = {
        title: titleOverrides[key] ?? p.title,
        categoryId: p.suggestedCategoryId ?? "",
        shareWithGroup: false,
        groupId: groups[0]?.id ?? "",
        groupCategoryId: "",
      };
    });
    setCategorizeState(initial);
    setStep(3);
  };

  const handleImport = async () => {
    const hasInvalidGroup = Object.values(categorizeState).some(
      (s) => s.shareWithGroup && !s.groupId
    );
    if (hasInvalidGroup) {
      showToast("error", "Selecione um grupo válido para as transações compartilhadas.");
      return;
    }
    setLoading(true);
    const transactions = preview.map((p) => {
      const key = p.originalDescription ?? p.title;
      const state = categorizeState[key];
      return {
        originalDescription: p.originalDescription ?? p.title,
        title: state?.title || p.title,
        amount: p.amount,
        transactionDate: p.transactionDate,
        type: p.type,
        categoryId: state?.categoryId || undefined,
        groupId: state?.shareWithGroup ? state.groupId : undefined,
        groupCategoryId: state?.shareWithGroup
          ? state.groupCategoryId || undefined
          : undefined,
      };
    });

    const success = await importTransactions({ transactions });
    if (success) {
      const income = preview.filter((p) => p.type === TransactionType.Receita).length;
      const expenses = preview.filter((p) => p.type === TransactionType.Despesa).length;
      const shared = Object.values(categorizeState).filter(
        (s) => s.shareWithGroup
      ).length;
      const groupName =
        groups.find(
          (g) =>
            g.id ===
            Object.values(categorizeState).find((s) => s.shareWithGroup)
              ?.groupId
        )?.name ?? "";
      setImportResult({
        total: preview.length,
        income,
        expenses,
        shared,
        groupName,
      });
      setStep(4);
    }
    setLoading(false);
  };

  const resetAll = () => {
    setStep(1);
    setFile(null);
    setTitleOverrides({});
    setCategorizeState({});
    setImportResult(null);
  };

  const handleStateChange = (key: string, state: CategorizeState) => {
    setCategorizeState((prev) => ({ ...prev, [key]: state }));
  };

  return (
    <Container>
      <Header>
        <PageTitle>Importar Extrato</PageTitle>
        <PageSubtitle>
          Faça upload do seu extrato bancário nos formatos OFX, CSV ou XLS
        </PageSubtitle>
      </Header>

      <StepperCard>
        {STEPS.map((label, i) => {
          const n = i + 1;
          const status = getStepStatus(n, step);
          return (
            <>
              <StepItem key={n} $status={status}>
                <StepNumber $status={status}>
                  {status === "done" ? <CheckCircle2 size={14} /> : n}
                </StepNumber>
                {label}
              </StepItem>
              {i < STEPS.length - 1 && <StepDivider key={`div-${n}`} />}
            </>
          );
        })}
      </StepperCard>

      <Content>
        {step === 1 && <Upload loading={loading} onFile={handleFile} />}

        {step === 2 && (
          <Preview
            file={file}
            preview={preview}
            categories={categories}
            banks={banks}
            selectedBank={selectedBank}
            loading={loading}
            needsBankSelector={
              (file?.name.endsWith(".csv") || file?.name.endsWith(".xls")) ?? false
            }
            titleOverrides={titleOverrides}
            onBankChange={setSelectedBank}
            onProcessFile={handleFilePreview}
            onTitleChange={handleTitleChange}
            onBack={() => setStep(1)}
            onContinue={goToCategorize}
          />
        )}

        {step === 3 && (
          <Categorize
            preview={preview}
            categories={categories}
            groups={groups}
            categorizeState={categorizeState}
            loading={loading}
            onStateChange={handleStateChange}
            onBack={() => setStep(2)}
            onImport={handleImport}
          />
        )}

        {step === 4 && importResult && (
          <Success result={importResult} onReset={resetAll} />
        )}
      </Content>
    </Container>
  );
};
