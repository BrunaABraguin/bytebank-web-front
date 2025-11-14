export class Transaction {
  constructor(
    public readonly id: string,
    public readonly ownerEmail: string,
    public readonly description: string,
    public readonly value: number,
    public readonly type: TransactionType,
    public readonly date: Date,
    public readonly category?: string
  ) {}

  public isIncome(): boolean {
    return this.type === TransactionType.INCOME;
  }

  public isExpense(): boolean {
    return this.type === TransactionType.EXPENSE;
  }

  public getAbsoluteValue(): number {
    return Math.abs(this.value);
  }

  public getFormattedValue(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.value);
  }

  public isValidTransaction(): boolean {
    return this.value !== 0 && this.description !== "SALDO DO DIA";
  }
}

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}
