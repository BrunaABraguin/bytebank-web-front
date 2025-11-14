import { AccountRepository, Account as AccountEntity } from "@bytebank-web/core";

interface AccountModel {
  _id: string;
  ownerEmail: string;
  balance: number;
  lastUpdate: Date;
}

export class MongoAccountRepository implements AccountRepository {
  constructor(
    private readonly accountModel: any,
    private readonly transactionModel: any
  ) {}

  async findByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.accountModel
      .findOne({ ownerEmail: email })
      .lean();
    return account ? this.toDomain(account) : null;
  }

  async save(account: AccountEntity): Promise<void> {
    const model = new this.accountModel(this.toPersistence(account));
    await model.save();
  }

  async update(account: AccountEntity): Promise<void> {
    await this.accountModel.findOneAndUpdate(
      { ownerEmail: account.ownerEmail },
      this.toPersistence(account),
      { upsert: true }
    );
  }

  async calculateBalanceByPeriod(
    email: string,
    month: number,
    year: number
  ): Promise<number> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await this.transactionModel
      .find({
        ownerEmail: email,
        date: { $gte: startDate, $lte: endDate },
      })
      .lean();

    return transactions.reduce((total: number, transaction: any) => {
      if (transaction.type === "INCOME") {
        return total + transaction.value;
      } else {
        return total - Math.abs(transaction.value);
      }
    }, 0);
  }

  private toDomain(data: AccountModel): AccountEntity {
    return new AccountEntity(
      data.ownerEmail,
      data.balance,
      new Date(data.lastUpdate)
    );
  }

  private toPersistence(account: AccountEntity): Partial<AccountModel> {
    return {
      ownerEmail: account.ownerEmail,
      balance: account.balance,
      lastUpdate: account.lastUpdate,
    };
  }
}
