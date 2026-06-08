import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { useCategories } from "../../../hooks/useCategories";
import { ColorPicker } from "../../../components/ui/ColorPicker/ColorPicker";
import { IconPicker } from "../../../components/ui/IconPicker/IconPicker";
import { Button, Modal } from "../../../components/ui";
import { Plus, Pencil } from "lucide-react";
import type { CategoryReadDto } from "../../../interfaces/category";
import {
  Container,
  Section,
  SectionTitle,
  ChipsGrid,
  EditableChip,
  FormGrid,
  FormColumn,
  Label,
  NameInput,
  Preview,
  PreviewCircle,
  PreviewLabel,
  PreviewChip,
  FormActions,
  DeleteButton,
} from "./CategoriesPage.styles";
import { type CategoriesPageProps, DEFAULT_COLOR, DEFAULT_ICON } from "./interface";
import { useToast } from "../../../contexts/useToast";

export const CategoriesPage = ({ groupId }: CategoriesPageProps) => {
  const { categories, create, update, remove } = useCategories(groupId);
  const { showToast } = useToast();

  const [editing, setEditing] = useState<CategoryReadDto | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [icon, setIcon] = useState(DEFAULT_ICON);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const isEditing = !!editing;

  const resetForm = () => {
    setEditing(null);
    setName("");
    setColor(DEFAULT_COLOR);
    setIcon(DEFAULT_ICON);
  };

  const openEdit = (cat: CategoryReadDto) => {
    setEditing(cat);
    setName(cat.name);
    setColor(cat.color ?? DEFAULT_COLOR);
    setIcon(cat.icon ?? DEFAULT_ICON);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    const errorMsg = isEditing
      ? await update(editing.id, { name, color, icon })
      : await create({ name, color, icon, groupId });
    setLoading(false);
    if (!errorMsg) {
      showToast("success", isEditing ? "Categoria atualizada." : "Categoria criada.");
      resetForm();
    } else {
      showToast("error", errorMsg);
    }
  };

  const handleDelete = async () => {
    if (!editing) return;
    setDeleteLoading(true);
    const errorMsg = await remove(editing.id);
    setDeleteLoading(false);
    if (!errorMsg) {
      showToast("success", "Categoria removida.");
      setShowDeleteModal(false);
      resetForm();
    } else {
      showToast("error", errorMsg);
    }
  };

  const PreviewIcon = LucideIcons[icon as keyof typeof LucideIcons] as
    | React.ComponentType<{ size?: number }>
    | undefined;

  return (
    <Container>
      <Section>
        <SectionTitle>Categorias existentes</SectionTitle>
        <ChipsGrid>
          {categories.map((cat) => {
            const Icon = LucideIcons[cat.icon as keyof typeof LucideIcons] as
              | React.ComponentType<{ size?: number }>
              | undefined;
            return (
              <EditableChip
                key={cat.id}
                $color={cat.color ?? "#9ca3af"}
                $active={editing?.id === cat.id}
                $disabled={cat.isSystem}
                onClick={() => {
                  if (!cat.isSystem)
                    return editing?.id === cat.id ? resetForm() : openEdit(cat);
                }}
                title={cat.isSystem ? "Categoria padrão do sistema" : undefined}
              >
                {Icon && <Icon size={14} />}
                {cat.name}
                {editing?.id === cat.id && <Pencil size={12} />}
              </EditableChip>
            );
          })}
        </ChipsGrid>
      </Section>

      <Section>
        <SectionTitle>
          {isEditing ? `Editar: ${editing.name}` : "Nova categoria"}
        </SectionTitle>

        <FormGrid>
          <FormColumn>
            <Label>NOME</Label>
            <NameInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Pets, Viagens, Streaming..."
            />
            <Label style={{ marginTop: 16 }}>ÍCONE</Label>
            <IconPicker value={icon} color={color} onChange={setIcon} />
          </FormColumn>

          <FormColumn>
            <Label>COR</Label>
            <ColorPicker value={color} onChange={setColor} />
          </FormColumn>

          <FormColumn>
            <Label>PREVIEW</Label>
            <Preview>
              <PreviewCircle $color={color}>
                {PreviewIcon && <PreviewIcon size={28} />}
              </PreviewCircle>
              <PreviewLabel>{name || "Nome"}</PreviewLabel>
              <PreviewChip $color={color}>
                {PreviewIcon && <PreviewIcon size={12} />}
                {name || "Nome"}
              </PreviewChip>
            </Preview>
          </FormColumn>
        </FormGrid>

        <FormActions>
          {isEditing && (
            <DeleteButton onClick={() => setShowDeleteModal(true)}>
              Remover categoria
            </DeleteButton>
          )}
          {isEditing && (
            <Button variant="secondary" onClick={resetForm}>
              Cancelar
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            loading={loading}
            disabled={!name.trim()}
          >
            {isEditing ? (
              <>
                <Pencil size={16} /> Salvar alterações
              </>
            ) : (
              <>
                <Plus size={16} /> Criar Categoria
              </>
            )}
          </Button>
        </FormActions>
      </Section>

      {showDeleteModal && (
        <Modal
          title="Remover categoria"
          description={`Tem certeza que deseja remover a categoria "${editing?.name}"? As transações vinculadas ficarão sem categoria.`}
          onClose={() => setShowDeleteModal(false)}
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                loading={deleteLoading}
                onClick={handleDelete}
              >
                Remover
              </Button>
            </>
          }
        />
      )}
    </Container>
  );
};
