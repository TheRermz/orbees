import { useState, useEffect } from "react";
import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  parseYearMonth,
  formatYearMonth,
} from "../../../helpers/date";
import {
  Container,
  PeriodLabel,
  MonthButton,
  DateInputGroup,
  DateLabel,
  DateInput,
  ApplyButton,
} from "./PeriodSelector.styles";
import type { PeriodSelectorProps } from "./interface";

export const PeriodSelector = ({
  availableMonths,
  from,
  to,
  onApply,
}: PeriodSelectorProps) => {
  const [localFrom, setLocalFrom] = useState(from);
  const [localTo, setLocalTo] = useState(to);
  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  useEffect(() => {
    setLocalFrom(from);
    setLocalTo(to);
  }, [from, to]);

  const handleMonthClick = (yearMonth: string) => {
    const { year, month } = parseYearMonth(yearMonth);
    const newFrom = getFirstDayOfMonth(year, month);
    const newTo = getLastDayOfMonth(year, month);
    setLocalFrom(newFrom);
    setLocalTo(newTo);
    setActiveMonth(yearMonth);
    onApply(newFrom, newTo);
  };

  const handleAllClick = () => {
    const newFrom = getFirstDayOfMonth(
      ...(Object.values(parseYearMonth(availableMonths[0])) as [number, number])
    );
    const last = availableMonths[availableMonths.length - 1];
    const { year, month } = parseYearMonth(last);
    const newTo = getLastDayOfMonth(year, month);
    setLocalFrom(newFrom);
    setLocalTo(newTo);
    setActiveMonth("all");
    onApply(newFrom, newTo);
  };

  const handleApply = () => {
    setActiveMonth(null);
    onApply(localFrom, localTo);
  };

  return (
    <Container>
      <PeriodLabel>Período</PeriodLabel>

      {availableMonths.map((m) => (
        <MonthButton
          key={m}
          $active={activeMonth === m}
          onClick={() => handleMonthClick(m)}
        >
          {formatYearMonth(m)}
        </MonthButton>
      ))}

      {availableMonths.length > 1 && (
        <MonthButton $active={activeMonth === "all"} onClick={handleAllClick}>
          Todos
        </MonthButton>
      )}

      <DateInputGroup>
        <DateLabel>De</DateLabel>
        <DateInput
          type="date"
          value={localFrom}
          onChange={(e) => {
            setLocalFrom(e.target.value);
            setActiveMonth(null);
          }}
        />
        <DateLabel>até</DateLabel>
        <DateInput
          type="date"
          value={localTo}
          onChange={(e) => {
            setLocalTo(e.target.value);
            setActiveMonth(null);
          }}
        />
        <ApplyButton onClick={handleApply}>Aplicar</ApplyButton>
      </DateInputGroup>
    </Container>
  );
};
