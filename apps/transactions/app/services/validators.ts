import { Transaction } from "@bytebank-web/types/transaction";

export class TransactionValidator {
  static validateValue(value: string | number): string | null {
    const numValue =
      typeof value === "string" ? Number.parseFloat(value) : value;

    if (Number.isNaN(numValue) || numValue <= 0) {
      return "Valor deve ser um número positivo";
    }

    if (numValue > 1000000) {
      return "Valor não pode ser superior a R$ 1.000.000";
    }

    return null;
  }

  static validateDescription(description: string): string | null {
    if (!description || description.trim().length === 0) {
      return "Descrição é obrigatória";
    }

    if (description.length > 100) {
      return "Descrição não pode ter mais de 100 caracteres";
    }

    return null;
  }

  static validateTransaction(
    transaction: Partial<Transaction>
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    const valueError = this.validateValue(transaction.value || 0);
    if (valueError) errors.value = valueError;

    const descError = this.validateDescription(transaction.description || "");
    if (descError) errors.description = descError;

    return errors;
  }
}
