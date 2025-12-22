export class CurrencyFormatter {
  static formatToBRL(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);
  }
}

export class DateFormatter {
  static formatToLocal(date: Date | string): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  static toInputFormat(date: Date | string): string {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toISOString().split("T")[0];
  }
}

export class TransactionStyler {
  static getTypeColor(type: string): string {
    switch (type) {
      case "INCOME":
        return "text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md border border-green-200";
      case "EXPENSE":
        return "text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-md border border-red-200";
      case "TRANSFER":
        return "text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md border border-blue-200";
      default:
        return "text-gray-500 px-2 py-1";
    }
  }
}
