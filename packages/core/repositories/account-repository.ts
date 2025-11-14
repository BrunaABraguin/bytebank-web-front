import { Account } from "../entities/account";

export interface AccountRepository {
  findByEmail(email: string): Promise<Account | null>;
  save(account: Account): Promise<void>;
  update(account: Account): Promise<void>;
  calculateBalanceByPeriod(
    email: string,
    month: number,
    year: number
  ): Promise<number>;
}
