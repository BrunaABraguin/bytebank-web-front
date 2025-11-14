export class Account {
  constructor(
    public readonly ownerEmail: string,
    public readonly balance: number,
    public readonly lastUpdate: Date
  ) {}

  public hasPositiveBalance(): boolean {
    return this.balance > 0;
  }

  public getFormattedBalance(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.balance);
  }

  public calculateBalanceChange(previousBalance: number): number {
    return this.balance - previousBalance;
  }

  public updateBalance(newBalance: number): Account {
    return new Account(this.ownerEmail, newBalance, new Date());
  }
}
