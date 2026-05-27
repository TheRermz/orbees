import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { useCategories } from "../../../hooks/useCategories";
import { ColorPicker } from "../../../components/ui/ColorPicker/ColorPicker";
import { IconPicker } from "../../../components/ui/IconPicker/IconPicker";
import { Button, Modal, ErrorMessage } from "../../../components/ui";
import { Plus } from "lucide-react";
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
  ModalActions,
  DeleteButton,
} from "./CategoriesPage.styles";

const DEFAULT_COLOR = "#F5A623";
const DEFAULT_ICON = "Tag";

export const CategoriesPage = () => {
  const { categories, create, update, remove, error } = useCategories();

  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [icon, setIcon] = useState(DEFAULT_ICON);
  const [loading, setLoading] = useState(false);

  const [editing, setEditing] = useState<CategoryReadDto | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState(DEFAULT_COLOR);
  const [editIcon, setEditIcon] = useState(DEFAULT_ICON);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    await create({ name, color, icon });
    setLoading(false);
    setName("");
    setColor(DEFAULT_COLOR);
    setIcon(DEFAULT_ICON);
  };

  const openEdit = (cat: CategoryReadDto) => {
    setEditing(cat);
    setEditName(cat.name);
    setEditColor(cat.color ?? DEFAULT_COLOR);
    setEditIcon(cat.icon ?? DEFAULT_ICON);
  };

  const handleUpdate = async () => {
    if (!editing) return;
    setEditLoading(true);
    await update(editing.id, {
      name: editName,
      color: editColor,
      icon: editIcon,
    });
    setEditLoading(false);
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!editing) return;
    setDeleteLoading(true);
    await remove(editing.id);
    setDeleteLoading(false);
    setEditing(null);
  };

  const PreviewIcon = LucideIcons[icon as keyof typeof LucideIcons] as
    | React.ComponentType<{ size?: number }>
    | undefined;
  const EditPreviewIcon = editing
    ? (LucideIcons[editIcon as keyof typeof LucideIcons] as
      | React.ComponentType<{ size?: number }>
      | undefined)
    : undefined;

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}

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
                onClick={() => openEdit(cat)}
              >
                {Icon && <Icon size={14} />}
                {cat.name}
              </EditableChip>
            );
          })}
        </ChipsGrid>
      </Section>

      <Section>
        <SectionTitle>Nova categoria</SectionTitle>
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

        <Button
          onClick={handleCreate}
          loading={loading}
          disabled={!name.trim()}
          style={{ alignSelf: "flex-start", marginTop: 8 }}
        >
          <Plus size={16} />
          Criar Categoria
        </Button>
      </Section>

      {editing && (
        <Modal
          title={`Editar: ${editing.name}`}
          onClose={() => setEditing(null)}
          actions={
            <ModalActions>
              <DeleteButton onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? "Removendo..." : "Remover categoria"}
              </DeleteButton>
              <Button variant="secondary" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
              <Button loading={editLoading} onClick={handleUpdate}>
                Salvar
              </Button>
            </ModalActions>
          }
        >
          <FormGrid style={{ gridTemplateColumns: "1fr 1fr 160px" }}>
            <FormColumn>
              <Label>NOME</Label>
              <NameInput
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <Label style={{ marginTop: 16 }}>ÍCONE</Label>
              <IconPicker
                value={editIcon}
                color={editColor}
                onChange={setEditIcon}
              />
            </FormColumn>

            <FormColumn>
              <Label>COR</Label>
              <ColorPicker value={editColor} onChange={setEditColor} />
            </FormColumn>

            <FormColumn>
              <Label>PREVIEW</Label>
              <Preview>
                <PreviewCircle $color={editColor}>
                  {EditPreviewIcon && <EditPreviewIcon size={28} />}
                </PreviewCircle>
                <PreviewLabel>{editName}</PreviewLabel>
                <PreviewChip $color={editColor}>
                  {EditPreviewIcon && <EditPreviewIcon size={12} />}
                  {editName}
                </PreviewChip>
              </Preview>
            </FormColumn>
          </FormGrid>
        </Modal>
      )}
    </Container>
  );
};
