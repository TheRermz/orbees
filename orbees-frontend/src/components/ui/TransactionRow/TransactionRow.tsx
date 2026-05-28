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
  MemberBadge,
} from "./TransactionRow.styles";
import type { TransactionRowProps } from "./interface";

export const TransactionRow = ({
  transaction,
  onClick,
  isGroupView = false,
}: TransactionRowProps) => {
  const isIncome = transaction.type === TransactionType.Receita;
  const iconName =
    isGroupView && transaction.groupCategoryIcon
      ? transaction.groupCategoryIcon
      : transaction.categoryIcon;

  const color =
    isGroupView && transaction.groupCategoryColor
      ? transaction.groupCategoryColor
      : (transaction.categoryColor ?? "#9ca3af");

  const IconComponent = iconName
    ? (
      LucideIcons as unknown as Record<
        string,
        React.ComponentType<{ size?: number }>
      >
    )[iconName]
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
          {isGroupView ? (
            <>
              {transaction.groupCategoryName && (
                <CategoryChip
                  name={transaction.groupCategoryName}
                  color={transaction.groupCategoryColor}
                  icon={transaction.groupCategoryIcon}
                />
              )}
              {transaction.memberName && (
                <MemberBadge>{transaction.memberName}</MemberBadge>
              )}
            </>
          ) : (
            <>
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
                  color={transaction.groupCategoryColor}
                  icon={transaction.groupCategoryIcon}
                  groupName={transaction.groupName ?? undefined}
                />
              )}
            </>
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
