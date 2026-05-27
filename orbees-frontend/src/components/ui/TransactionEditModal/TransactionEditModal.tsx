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
} from "./TransactionEditModal.styles";
import type { TransactionEditModalProps } from "./interface";

export const TransactionEditModal = ({
  transaction,
  onClose,
  onSave,
}: TransactionEditModalProps) => {
  const navigate = useNavigate();
  const { categories: personalCategories } = useCategories();
  const { groups } = useGroups();

  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    transaction.groupId ?? ""
  );
  const { categories: groupCategories } = useCategories(
    selectedGroupId || undefined
  );

  const [form, setForm] = useState<TransactionUpdateDto>({
    title: transaction.title,
    description: transaction.description ?? "",
    categoryId: transaction.categoryId ?? undefined,
    groupId: transaction.groupId ?? undefined,
    groupCategoryId: transaction.groupCategoryId ?? undefined,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    const success = await onSave(transaction.id, form);
    setLoading(false);
    if (success) onClose();
    else setError("Erro ao salvar transação.");
  };

  return (
    <Modal
      title="Editar transação"
      onClose={onClose}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button loading={loading} onClick={handleSave}>
            Salvar
          </Button>
        </>
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
                groupCategoryId: undefined,
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
            <FooterLink onClick={() => navigate("/group/categories")}>
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
