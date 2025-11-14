import { MongoTransactionRepository } from "../../infrastructure/database/mongo-transaction-repository";
import { MongoAccountRepository } from "../../infrastructure/database/mongo-account-repository";
import { GetTransactionsUseCase } from "../../core/use-cases/transaction/get-transactions";
import { CreateTransactionUseCase } from "../../core/use-cases/transaction/create-transaction";
import { GetMonthlyDataUseCase } from "../../core/use-cases/transaction/get-monthly-data";
import { GetBalanceUseCase } from "../../core/use-cases/account/get-balance";

let TransactionModel: any;
let AccountModel: any;

export function configureModels(transactionModel: any, accountModel: any) {
  TransactionModel = transactionModel;
  AccountModel = accountModel;
}

class DIContainer {
  private _transactionRepository?: MongoTransactionRepository;
  private _accountRepository?: MongoAccountRepository;

  get transactionRepository(): MongoTransactionRepository {
    if (!this._transactionRepository) {
      if (!TransactionModel) {
        throw new Error(
          "TransactionModel não foi configurado. Chame configureModels() primeiro."
        );
      }
      this._transactionRepository = new MongoTransactionRepository(
        TransactionModel
      );
    }
    return this._transactionRepository;
  }

  get accountRepository(): MongoAccountRepository {
    if (!this._accountRepository) {
      if (!AccountModel || !TransactionModel) {
        throw new Error(
          "Models não foram configurados. Chame configureModels() primeiro."
        );
      }
      this._accountRepository = new MongoAccountRepository(
        AccountModel,
        TransactionModel
      );
    }
    return this._accountRepository;
  }

  get getTransactionsUseCase(): GetTransactionsUseCase {
    return new GetTransactionsUseCase(this.transactionRepository);
  }

  get createTransactionUseCase(): CreateTransactionUseCase {
    return new CreateTransactionUseCase(this.transactionRepository);
  }

  get getMonthlyDataUseCase(): GetMonthlyDataUseCase {
    return new GetMonthlyDataUseCase(this.transactionRepository);
  }

  get getBalanceUseCase(): GetBalanceUseCase {
    return new GetBalanceUseCase(this.accountRepository);
  }
}

export const container = new DIContainer();
