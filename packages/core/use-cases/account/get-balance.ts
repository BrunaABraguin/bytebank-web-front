import { Account } from "../../entities/account";
import { AccountRepository } from "../../repositories/account-repository";

export class GetBalanceUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(
    email: string,
    month?: number,
    year?: number
  ): Promise<Account> {
    if (!email) {
      throw new Error("Email é obrigatório");
    }

    if (month && year) {
      const balance = await this.accountRepository.calculateBalanceByPeriod(
        email,
        month,
        year
      );
      return new Account(email, balance, new Date());
    }

    let account = await this.accountRepository.findByEmail(email);

    if (!account) {
      account = new Account(email, 0, new Date());
      await this.accountRepository.save(account);
    }

    return account;
  }
}
