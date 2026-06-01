import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Modal, Button, ErrorMessage } from "../index";
import { useCategories } from "../../../hooks/useCategories";
import type { TransactionCreateDto } from "../../../interfaces/transaction";
import { TransactionType } from "../../../interfaces/enums";
import {
  TransactionList,
  TransactionForm,
  FormRow,
  FormField,
  Label,
  StyledInput,
  StyledSelect,
  RemoveButton,
  AddRowButton,
  TypeToggle,
  TypeButton,
} from "./AddTransactionModal.styles";
import {
  emptyForm,
  type AddTransactionModalProps,
  type TransactionFormState,
} from "./interface";
import { useGroups } from "../../../hooks/useGroups";

export const AddTransactionModal = ({
  onClose,
  onCreate,
  onCreateBulk,
}: AddTransactionModalProps) => {
  const { categories } = useCategories();
  const [forms, setForms] = useState<TransactionFormState[]>([emptyForm()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { groups } = useGroups();
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const { categories: groupCategories } = useCategories(
    selectedGroupId || undefined
  );

  const updateForm = (
    index: number,
    field: keyof TransactionCreateDto,
    value: unknown
  ) => {
    setForms((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [field]: value } : f))
    );
  };

  const addRow = () => setForms((prev) => [...prev, emptyForm()]);

  const removeRow = (index: number) => {
    if (forms.length === 1) return;
    setForms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const invalid = forms.find(
      (f) =>
        !f.title.trim() ||
        f.amount <= 0 ||
        f.amount > 999999999.99 ||
        !f.transactionDate
    );
    if (invalid) {
      setError("Preencha título e valor válidos (máx. R$ 999.999.999,99).");
      return;
    }

    setLoading(true);
    setError(null);

    const dtos: TransactionCreateDto[] = forms.map((f) => ({
      title: f.title,
      description: f.description || undefined,
      amount: Number(f.amount),
      transactionDate: f.transactionDate,
      type: f.type,
      categoryId: f.categoryId || undefined,
      groupId: f.groupId || undefined,
      groupCategoryId: f.groupCategoryId || undefined,
    }));

    const success =
      forms.length === 1 ? await onCreate(dtos[0]) : await onCreateBulk(dtos);

    setLoading(false);
    if (success) onClose();
    else setError("Erro ao salvar transações.");
  };

  return (
    <Modal
      title={
        forms.length > 1
          ? `Adicionar ${forms.length} transações`
          : "Adicionar transação"
      }
      onClose={onClose}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button loading={loading} onClick={handleSubmit}>
            {forms.length > 1 ? `Salvar ${forms.length} transações` : "Salvar"}
          </Button>
        </>
      }
    >
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TransactionList>
        {forms.map((form, i) => (
          <TransactionForm key={i}>
            {forms.length > 1 && (
              <RemoveButton onClick={() => removeRow(i)}>
                <X size={14} />
              </RemoveButton>
            )}

            <FormRow>
              <FormField>
                <Label>Título *</Label>
                <StyledInput
                  value={form.title}
                  onChange={(e) => updateForm(i, "title", e.target.value)}
                  placeholder="Ex: Aluguel, Salário..."
                />
              </FormField>
              <FormField>
                <Label>Data *</Label>
                <StyledInput
                  type="date"
                  value={
                    form.transactionDate ||
                    new Date().toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    updateForm(i, "transactionDate", e.target.value)
                  }
                />
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <Label>Valor *</Label>
                <StyledInput
                  type="number"
                  min="0"
                  max="999999999.99"
                  step="0.01"
                  value={form.amount || ""}
                  onChange={(e) => updateForm(i, "amount", e.target.value)}
                  placeholder="0,00"
                />
              </FormField>
              <FormField>
                <Label>Tipo</Label>
                <TypeToggle>
                  <TypeButton
                    $active={form.type === TransactionType.Receita}
                    $type="income"
                    onClick={() =>
                      updateForm(i, "type", TransactionType.Receita)
                    }
                  >
                    Receita
                  </TypeButton>
                  <TypeButton
                    $active={form.type === TransactionType.Despesa}
                    $type="expense"
                    onClick={() =>
                      updateForm(i, "type", TransactionType.Despesa)
                    }
                  >
                    Despesa
                  </TypeButton>
                </TypeToggle>
              </FormField>
            </FormRow>

            <FormRow>
              <FormField>
                <Label>Categoria</Label>
                <StyledSelect
                  value={form.categoryId ?? ""}
                  onChange={(e) =>
                    updateForm(i, "categoryId", e.target.value || undefined)
                  }
                >
                  <option value="">Sem categoria</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </StyledSelect>
              </FormField>
              <FormField>
                <Label>Descrição</Label>
                <StyledInput
                  value={form.description ?? ""}
                  onChange={(e) => updateForm(i, "description", e.target.value)}
                  placeholder="Opcional..."
                />
              </FormField>
            </FormRow>
            <FormField>
              <Label>Grupo</Label>
              <StyledSelect
                value={form.groupId ?? ""}
                onChange={(e) => {
                  setSelectedGroupId(e.target.value);
                  updateForm(i, "groupId", e.target.value || undefined);
                  updateForm(i, "groupCategoryId", undefined);
                }}
              >
                <option value="">Sem grupo</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </StyledSelect>
            </FormField>

            {form.groupId && (
              <FormField>
                <Label>Categoria do Grupo</Label>
                <StyledSelect
                  value={form.groupCategoryId ?? ""}
                  onChange={(e) =>
                    updateForm(
                      i,
                      "groupCategoryId",
                      e.target.value || undefined
                    )
                  }
                >
                  <option value="">Sem categoria *</option>
                  {groupCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </StyledSelect>
              </FormField>
            )}
          </TransactionForm>
        ))}
      </TransactionList>

      <AddRowButton onClick={addRow}>
        <Plus size={14} /> Adicionar outra transação
      </AddRowButton>
    </Modal>
  );
};
