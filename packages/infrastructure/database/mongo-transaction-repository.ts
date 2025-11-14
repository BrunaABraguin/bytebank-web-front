import {
  TransactionRepository,
  Transaction as TransactionEntity,
  TransactionType,
} from "@bytebank-web/core";
import { Model } from "mongoose";

interface TransactionModel {
  _id: string;
  ownerEmail: string;
  description: string;
  value: number;
  type: string;
  date: Date;
  category?: string;
}

export class MongoTransactionRepository implements TransactionRepository {
  constructor(private readonly model: Model<TransactionModel>) {}

  async findByEmail(email: string): Promise<TransactionEntity[]> {
    const transactions = await this.model
      .find({ ownerEmail: email })
      .sort({ date: -1 })
      .lean();
    return transactions.map((t: TransactionModel) => this.toDomain(t));
  }

  async findByEmailAndDateRange(
    email: string,
    startDate: Date,
    endDate: Date
  ): Promise<TransactionEntity[]> {
    const transactions = await this.model
      .find({
        ownerEmail: email,
        date: { $gte: startDate, $lte: endDate },
      })
      .lean();

    return transactions.map((t: TransactionModel) => this.toDomain(t));
  }

  async findRecentTransactions(
    email: string,
    limit: number = 20
  ): Promise<TransactionEntity[]> {
    const transactions = await this.model
      .find({
        ownerEmail: email,
        value: { $ne: 0 },
        description: { $ne: "SALDO DO DIA" },
      })
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    return transactions.map((t: TransactionModel) => this.toDomain(t));
  }

  async save(transaction: TransactionEntity): Promise<void> {
    const model = new this.model(this.toPersistence(transaction));
    await model.save();
  }

  async update(transaction: TransactionEntity): Promise<void> {
    await this.model.findByIdAndUpdate(
      transaction.id,
      this.toPersistence(transaction)
    );
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  private toDomain(data: TransactionModel): TransactionEntity {
    return new TransactionEntity(
      data._id.toString(),
      data.ownerEmail,
      data.description,
      data.value,
      data.type as TransactionType,
      new Date(data.date),
      data.category
    );
  }

  private toPersistence(
    transaction: TransactionEntity
  ): Partial<TransactionModel> {
    return {
      ownerEmail: transaction.ownerEmail,
      description: transaction.description,
      value: transaction.value,
      type: transaction.type,
      date: transaction.date,
      category: transaction.category,
    };
  }
}
