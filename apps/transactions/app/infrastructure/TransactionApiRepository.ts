import { Transaction } from "@bytebank-web/types/transaction";
import { useTransactions } from "@bytebank-web/utils/use-transactions";
import { patchTransaction } from "../services/patchTransaction";
import { deleteTransaction } from "../services/deleteTransaction";
import { ITransactionRepository } from "../domain/repositories";

export class TransactionApiRepository implements ITransactionRepository {
  async getTransactions(
    email: string,
    page: number,
    pageSize: number,
    type?: string
  ) {
    // Aqui usaríamos a implementação real da API
    // Por enquanto delegamos para o hook existente
    const result = useTransactions(email, page, pageSize, type as any);
    return {
      transactions: result.transactions || [],
      totalPages: result.totalPages || 0,
      isLoading: result.isLoading || false,
    };
  }

  async updateTransaction(transaction: Transaction): Promise<Transaction> {
    return await patchTransaction(transaction);
  }

  async deleteTransaction(transactionId: string): Promise<{ message: string }> {
    return await deleteTransaction(transactionId);
  }
}

export class TransactionRepositoryFactory {
  static create(): ITransactionRepository {
    return new TransactionApiRepository();
  }
}
