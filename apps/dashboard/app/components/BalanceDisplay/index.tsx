interface BalanceDisplayProps {
  label: string;
  value: number;
  isLoading: boolean;
}

export const BalanceDisplay = ({
  label,
  value,
  isLoading,
}: BalanceDisplayProps) => {
  if (isLoading) {
    return null;
  }

  return (
    <div className="grid font-semibold">
      <span className="text-sm text-gray-500">{label}</span>
      <span aria-live="polite" aria-atomic="true">
        R$ {value.toLocaleString()}
      </span>
    </div>
  );
};
