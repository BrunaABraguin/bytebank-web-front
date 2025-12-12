import { Transaction } from "@bytebank-web/types/transaction";

export interface CellProps {
  row: { id: string; original: Transaction };
  isEditing: boolean;
  editingData?: Partial<Transaction>;
  onEditingDataChange?: (data: Partial<Transaction>) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onStartEdit?: () => void;
  onDelete?: () => void;
}
