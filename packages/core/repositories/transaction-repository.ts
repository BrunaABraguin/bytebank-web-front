import { Transaction } from "../entities/transaction";

export interface TransactionRepository {
  findByEmail(email: string): Promise<Transaction[]>;
  findByEmailAndDateRange(
    email: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
  update(transaction: Transaction): Promise<void>;
  delete(id: string): Promise<void>;
  findRecentTransactions(email: string, limit?: number): Promise<Transaction[]>;
}
