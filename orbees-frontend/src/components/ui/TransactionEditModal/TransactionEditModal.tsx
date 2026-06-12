import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";
import { useGroups } from "../../../hooks/useGroups";
import { Modal, Button, ErrorMessage } from "../index";
import type { TransactionUpdateDto } from "../../../interfaces/transaction";
import {
  Field,
  Label,
  Select,
  SelectWrapper,
  FooterLink,
  FieldRow,
  TypeToggle,
  TypeButton,
} from "./TransactionEditModal.styles";
import { TransactionType } from "../../../interfaces/enums";
import type { TransactionEditModalProps } from "./interface";
import { Trash } from "lucide-react";
import { useTransactions } from "../../../hooks/useTransaction";

export const TransactionEditModal = ({
  transaction,
  onClose,
  onSave,
}: TransactionEditModalProps) => {
  const navigate = useNavigate();
  const { categories: personalCategories } = useCategories();
  const { groups } = useGroups();
  const { remove } = useTransactions();

  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    transaction.groupId ?? ""
  );
  const { categories: groupCategories } = useCategories(
    selectedGroupId || undefined
  );

  const [form, setForm] = useState<TransactionUpdateDto>({
    title: transaction.title,
    description: transaction.description ?? "",
    amount: transaction.amount,
    transactionDate: transaction.transactionDate.slice(0, 10),
    type: transaction.type,
    categoryId: transaction.categoryId ?? undefined,
    groupId: transaction.groupId ?? undefined,
    groupCategoryId: transaction.groupCategoryId ?? undefined,
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    const success = await onSave(transaction.id, form);
    setLoading(false);
    if (success) onClose();
    else setError("Erro ao salvar transação.");
  };

  const handleDelete = async () => {
    setDeleting(true);
    const err = await remove(transaction.id);
    setDeleting(false);
    if (!err) window.location.reload();
    else {
      setConfirming(false);
      setError(err);
    }
  };

  if (confirming) {
    return (
      <Modal
        title="Excluir transação"
        description={`Tem certeza que deseja excluir "${transaction.title}"? Esta ação não pode ser desfeita.`}
        onClose={() => setConfirming(false)}
        actions={
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <Button
              variant="secondary"
              onClick={() => setConfirming(false)}
              style={{ padding: "12px 18px", fontSize: "0.9rem" }}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              loading={deleting}
              onClick={handleDelete}
              style={{ padding: "12px 22px" }}
            >
              Excluir
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <Modal
      title="Editar transação"
      onClose={onClose}
      actions={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            variant="danger"
            loading={deleting}
            onClick={() => setConfirming(true)}
            style={{ padding: "12px 18px" }}
          >
            <Trash size={16} />
          </Button>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="secondary"
              onClick={onClose}
              style={{ padding: "12px 18px", fontSize: "0.9rem" }}
            >
              Cancelar
            </Button>
            <Button
              loading={loading}
              onClick={handleSave}
              style={{ padding: "12px 22px" }}
            >
              Salvar
            </Button>
          </div>
        </div>
      }
    >
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Field>
        <Label>TÍTULO</Label>
        <Select
          value={form.title ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          as="input"
        />
      </Field>

      <Field>
        <Label>DESCRIÇÃO</Label>
        <Select
          value={form.description ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          as="input"
        />
      </Field>

      <FieldRow>
        <Field style={{ flex: 1 }}>
          <Label>VALOR (R$)</Label>
          <Select
            value={form.amount ?? ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, amount: parseFloat(e.target.value.replace(",", ".")) || 0 }))
            }
            as="input"
            type="text"
            inputMode="decimal"
          />
        </Field>
        <Field style={{ flex: 1 }}>
          <Label>TIPO</Label>
          <TypeToggle>
            <TypeButton
              $active={form.type === TransactionType.Receita}
              $type="income"
              onClick={() => setForm((prev) => ({ ...prev, type: TransactionType.Receita }))}
            >
              Receita
            </TypeButton>
            <TypeButton
              $active={form.type === TransactionType.Despesa}
              $type="expense"
              onClick={() => setForm((prev) => ({ ...prev, type: TransactionType.Despesa }))}
            >
              Despesa
            </TypeButton>
          </TypeToggle>
        </Field>
      </FieldRow>

      <Field>
        <Label>DATA</Label>
        <Select
          value={form.transactionDate ?? ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, transactionDate: e.target.value }))
          }
          as="input"
          type="date"
        />
      </Field>

      <Field>
        <FieldRow>
          <Label>CATEGORIA</Label>
          <FooterLink onClick={() => navigate("/individual/categories")}>
            + Nova categoria
          </FooterLink>
        </FieldRow>
        <SelectWrapper>
          <Select
            value={form.categoryId ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                categoryId: e.target.value || undefined,
                removeCategoryId: !e.target.value,
              }))
            }
          >
            <option value="">Sem categoria</option>
            {personalCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </SelectWrapper>
      </Field>

      <Field>
        <Label>GRUPO</Label>
        <SelectWrapper>
          <Select
            value={selectedGroupId}
            onChange={(e) => {
              const newGroupId = e.target.value;
              setSelectedGroupId(newGroupId);
              setForm((prev) => ({
                ...prev,
                groupId: newGroupId || undefined,
                removeGroupId: !newGroupId,
                groupCategoryId: undefined,
                removeGroupCategoryId: !newGroupId,
              }));
            }}
          >
            <option value="">Sem grupo</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Select>
        </SelectWrapper>
      </Field>

      {selectedGroupId && (
        <Field>
          <FieldRow>
            <Label>CATEGORIA DO GRUPO</Label>
            <FooterLink
              onClick={() => navigate(`/group/${selectedGroupId}/categories`)}
            >
              + Nova categoria
            </FooterLink>
          </FieldRow>
          <SelectWrapper>
            <Select
              value={form.groupCategoryId ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  groupCategoryId: e.target.value || undefined,
                  removeGroupCategoryId: !e.target.value,
                }))
              }
            >
              <option value="">Sem categoria</option>
              {groupCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </SelectWrapper>
        </Field>
      )}
    </Modal>
  );
};
