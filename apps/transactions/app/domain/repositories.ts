import { Transaction } from "@bytebank-web/types/transaction";

export interface ITransactionRepository {
  getTransactions(
    email: string,
    page: number,
    pageSize: number,
    type?: string
  ): Promise<{
    transactions: Transaction[];
    totalPages: number;
    isLoading: boolean;
  }>;

  updateTransaction(transaction: Transaction): Promise<Transaction>;

  deleteTransaction(transactionId: string): Promise<{ message: string }>;
}

export interface IQueryService {
  invalidateQueries(keys: string[]): void;
}

export interface INotificationService {
  showSuccess(message: string): void;
  showError(message: string): void;
}

export interface ITransactionRepositoryFactory {
  create(): ITransactionRepository;
}
