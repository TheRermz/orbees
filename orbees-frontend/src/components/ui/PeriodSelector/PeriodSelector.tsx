import { useState, useRef } from "react";
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
  MonthsScroll,
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = x - startX.current;
    if (scrollRef.current)
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  return (
    <Container>
      <PeriodLabel>Período</PeriodLabel>
      <MonthsScroll
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
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
      </MonthsScroll>

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
