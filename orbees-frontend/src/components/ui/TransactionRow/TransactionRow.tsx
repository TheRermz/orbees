import * as LucideIcons from "lucide-react";
import { CategoryChip } from "../CategoryChip/CategoryChip";
import { formatCurrency } from "../../../helpers/formatters";
import { TransactionType } from "../../../interfaces/enums";
import {
  Row,
  IconBox,
  Info,
  Title,
  ChipsRow,
  Right,
  Amount,
  DateText,
  Description,
} from "./TransactionRow.styles";
import type { TransactionRowProps } from "./interface";

export const TransactionRow = ({
  transaction,
  onClick,
}: TransactionRowProps) => {
  const isIncome = transaction.type === TransactionType.Receita;
  const color = transaction.categoryColor ?? "#9ca3af";
  const IconComponent = transaction.categoryIcon
    ? (
      LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ size?: number }>
      >
    )[transaction.categoryIcon]
    : null;

  const date = new Date(transaction.transactionDate);
  const dateStr = date.toLocaleDateString("pt-BR");
  const timeStr = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Row onClick={onClick}>
      <IconBox $color={color}>
        {IconComponent ? <IconComponent size={18} /> : null}
      </IconBox>
      <Info>
        <Title>{transaction.title}</Title>
        <ChipsRow>
          {transaction.categoryName && (
            <CategoryChip
              name={transaction.categoryName}
              color={transaction.categoryColor}
              icon={transaction.categoryIcon}
            />
          )}
          {transaction.groupId && transaction.groupCategoryName && (
            <CategoryChip
              name={transaction.groupCategoryName}
              color={transaction.groupCategoryColor ?? "#6366f1"}
              groupName={transaction.groupName ?? undefined}
            />
          )}
        </ChipsRow>
        {transaction.description && (
          <Description>Descrição: {transaction.description}</Description>
        )}
      </Info>
      <Right>
        <Amount $income={isIncome}>
          {isIncome ? "+" : "-"}
          {formatCurrency(Math.abs(transaction.amount))}
        </Amount>
        <DateText>
          {dateStr}, {timeStr}
        </DateText>
      </Right>
    </Row>
  );
};
