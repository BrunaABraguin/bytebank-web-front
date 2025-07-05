import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./Select";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface MonthYearPickerProps {
  value?: { month: number; year: number };
  onChange?: (value: { month: number; year: number }) => void;
  className?: string;
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState<number>(
    value?.month ?? currentMonth
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    value?.year ?? currentYear
  );

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    onChange?.({ month, year: selectedYear });
  };

  const handleYearChange = (delta: number) => {
    const newYear = selectedYear + delta;
    if (newYear > currentYear) return;
    setSelectedYear(newYear);
    if (newYear === currentYear && selectedMonth > currentMonth) {
      setSelectedMonth(currentMonth);
      onChange?.({ month: currentMonth, year: newYear });
    } else {
      onChange?.({ month: selectedMonth, year: newYear });
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Select
        value={selectedMonth.toString()}
        onValueChange={(value) => handleMonthChange(Number(value))}
        disabled={selectedYear === currentYear && selectedMonth > currentMonth}
      >
        <SelectTrigger className="w-[180px] ml-4">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, idx) => (
            <SelectItem
              key={month}
              value={idx.toString()}
              disabled={selectedYear === currentYear && idx > currentMonth}
            >
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={selectedYear.toString()}
        onValueChange={(value) => handleYearChange(Number(value))}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {Array.from(
            { length: currentYear - 2010 },
            (_, i) => currentYear - i
          ).map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
