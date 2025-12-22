import { TransactionEnum } from "@bytebank-web/types/transaction";

// Service para validação de transação
export class TransactionValidator {
  static validateForm(transactionValue: string): { transactionValue?: string } {
    const errors: { transactionValue?: string } = {};

    if (!transactionValue || parseFloat(transactionValue) <= 0) {
      errors.transactionValue = "O valor deve ser maior que 0.";
    }

    return errors;
  }

  static isFormValid(errors: Record<string, unknown>): boolean {
    return Object.keys(errors).length === 0;
  }
}

// Service para criação de transação
export class TransactionFactory {
  static createTransaction(
    type: TransactionEnum,
    value: string,
    email: string
  ) {
    return {
      type,
      value: parseFloat(value).toFixed(2),
      email,
    };
  }
}
