import { Users } from "lucide-react";
import type { CategorizeRowsItemProps } from "./interface";
import {
  CategorizeRow,
  CategorizeTop,
  TxInfo,
  TxAmount,
  TitleInput,
  ShareRow,
  Toggle,
  ShareLabel,
  GroupCategorySelect,
  CategorySelect,
} from "../../pages/Individual/Import/ImportPage.styles";
import { useCategories } from "../../hooks/useCategories";
import { formatCurrency } from "../../helpers/formatters";
import { TransactionType } from "../../interfaces/enums";

export const CategorizeRowItem = ({
  preview: p,
  state,
  categories,
  groups,
  onChange,
}: CategorizeRowsItemProps) => {
  const { categories: groupCats } = useCategories(state.groupId || undefined);

  return (
    <CategorizeRow>
      <CategorizeTop>
        <TxInfo>
          <TitleInput
            value={state.title}
            onChange={(e) =>
              onChange(p.originalDescription ?? p.title, {
                ...state,
                title: e.target.value,
              })
            }
            style={{
              width: "200%",
            }}
          />
          <TxAmount $positive={p.type === TransactionType.Receita}>
            {formatCurrency(Math.abs(p.amount))}
          </TxAmount>
        </TxInfo>
        <CategorySelect
          $uncategorized={!state.categoryId}
          value={state.categoryId}
          onChange={(e) =>
            onChange(p.originalDescription ?? p.title, {
              ...state,
              categoryId: e.target.value,
            })
          }
        >
          <option value="">Selecionar categoria...</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </CategorySelect>
      </CategorizeTop>

      {groups.length > 0 && (
        <ShareRow $active={state.shareWithGroup}>
          <Toggle
            type="checkbox"
            checked={state.shareWithGroup}
            onChange={(e) =>
              onChange(p.originalDescription ?? p.title, {
                ...state,
                shareWithGroup: e.target.checked,
              })
            }
          />
          <Users size={16} color="#92400e" />
          <ShareLabel>
            Compartilhar com{" "}
            <strong>
              {groups.find((g) => g.id === state.groupId)?.name ?? "Grupo"}
            </strong>
          </ShareLabel>
          {state.shareWithGroup && (
            <GroupCategorySelect
              value={state.groupCategoryId}
              onChange={(e) =>
                onChange(p.originalDescription ?? p.title, {
                  ...state,
                  groupCategoryId: e.target.value,
                })
              }
            >
              <option value="">Categoria do grupo...</option>
              {groupCats.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </GroupCategorySelect>
          )}
        </ShareRow>
      )}
    </CategorizeRow>
  );
};
