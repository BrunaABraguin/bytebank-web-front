import { Transaction } from "@bytebank-web/types/transaction";
import {
  ITransactionRepository,
  IQueryService,
  INotificationService,
} from "../domain/repositories";

export class TransactionService {
  constructor(
    private readonly repository: ITransactionRepository,
    private readonly queryService: IQueryService,
    private readonly notificationService: INotificationService
  ) {}

  async updateTransaction(transaction: Transaction): Promise<void> {
    try {
      await this.repository.updateTransaction(transaction);
      this.queryService.invalidateQueries([
        "transactions",
        "monthly-chart",
        "balance",
      ]);
      this.notificationService.showSuccess("Transação atualizada com sucesso!");
    } catch (error) {
      this.notificationService.showError("Erro ao atualizar transação");
      throw error;
    }
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    try {
      await this.repository.deleteTransaction(transactionId);
      this.queryService.invalidateQueries([
        "transactions",
        "monthly-chart",
        "balance",
      ]);
      this.notificationService.showSuccess("Transação excluída com sucesso!");
    } catch (error) {
      this.notificationService.showError("Erro ao excluir transação");
      throw error;
    }
  }
}
