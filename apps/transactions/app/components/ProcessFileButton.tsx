import { Button } from "@bytebank-web/ui/button";

interface ProcessFileButtonProps {
  hasData: boolean;
  hasFile: boolean;
  isPending: boolean;
  isPendingProcess: boolean;
  totalTransactions?: number;
  onUpload: () => void;
  onProcess: () => void;
}

export const ProcessFileButton = ({
  hasData,
  hasFile,
  isPending,
  isPendingProcess,
  totalTransactions,
  onUpload,
  onProcess,
}: ProcessFileButtonProps) => {
  if (hasData && !isPending && !isPendingProcess && hasFile) {
    return (
      <Button
        type="submit"
        onClick={onUpload}
        disabled={isPending || isPendingProcess}
      >
        Processar arquivo ({totalTransactions} transações)
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      onClick={onProcess}
      disabled={isPendingProcess || isPending}
    >
      Enviar arquivo
    </Button>
  );
};
