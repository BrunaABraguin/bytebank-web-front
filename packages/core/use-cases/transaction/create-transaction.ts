import { Transaction, TransactionType } from "../../entities/transaction";
import { TransactionRepository } from "../../repositories/transaction-repository";

export interface CreateTransactionRequest {
  ownerEmail: string;
  description: string;
  value: number;
  type: TransactionType;
  category?: string;
}

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(request: CreateTransactionRequest): Promise<void> {
    this.validateRequest(request);

    const transaction = new Transaction(
      crypto.randomUUID(),
      request.ownerEmail,
      request.description,
      request.value,
      request.type,
      new Date(),
      request.category
    );

    await this.transactionRepository.save(transaction);
  }

  private validateRequest(request: CreateTransactionRequest): void {
    if (!request.ownerEmail) {
      throw new Error("Email do proprietário é obrigatório");
    }
    if (!request.description) {
      throw new Error("Descrição é obrigatória");
    }
    if (request.value === 0) {
      throw new Error("Valor deve ser diferente de zero");
    }
  }
}
