export class MonthlyData {
  constructor(
    public readonly month: string,
    public readonly income: number,
    public readonly expense: number
  ) {}

  public getNetIncome(): number {
    return this.income - this.expense;
  }

  public getFormattedIncome(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.income);
  }

  public getFormattedExpense(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.expense);
  }

  public hasTransactions(): boolean {
    return this.income > 0 || this.expense > 0;
  }
}
