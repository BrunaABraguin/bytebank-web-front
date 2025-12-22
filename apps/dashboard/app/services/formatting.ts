// Serviço para formatação de valores monetários
export class CurrencyFormatter {
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  static formatNumber(value: number): string {
    return value.toLocaleString("pt-BR");
  }
}

// Serviço para formatação de datas
export class DateFormatter {
  static formatDate(date: string | Date): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("pt-BR");
  }

  static formatMonth(date: string | Date): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const month = dateObj.toLocaleString("pt-BR", { month: "long" });
    return month.charAt(0).toUpperCase() + month.slice(1);
  }
}

// Validador para transações
export class TransactionTypeValidator {
  static isIncome(type: string): boolean {
    return type === "Receita";
  }

  static isExpense(type: string): boolean {
    return type !== "Receita";
  }
}
