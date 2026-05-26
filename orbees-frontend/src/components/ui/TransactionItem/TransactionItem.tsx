import { formatCurrency, formatDate } from "../../../helpers/formatters";
import { TransactionType } from "../../../interfaces/enums";
import type { TransactionItemProps } from "./interface";
import {
  Container,
  Left,
  Dot,
  Info,
  Title,
  Meta,
  Amount,
} from "./TransactionItem.styles";

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isIncome = transaction.type === TransactionType.Receita;

  return (
    <Container>
      <Left>
        <Dot $income={isIncome} />
        <Info>
          <Title>{transaction.title}</Title>
          <Meta>
            {transaction.categoryName ?? "Sem categoria"} ·{" "}
            {formatDate(transaction.transactionDate)}
          </Meta>
        </Info>
      </Left>
      <Amount $income={isIncome}>
        {formatCurrency(Math.abs(transaction.amount))}
      </Amount>
    </Container>
  );
};
