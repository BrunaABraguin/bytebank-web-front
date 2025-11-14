import { Transaction } from "../../entities/transaction";
import { TransactionRepository } from "../../repositories/transaction-repository";

export class GetTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(email: string): Promise<Transaction[]> {
    if (!email) {
      throw new Error("Email é obrigatório");
    }

    const transactions = await this.transactionRepository.findByEmail(email);

    return transactions
      .filter((tx: Transaction) => tx.isValidTransaction())
      .slice(0, 20);
  }
}
