import { MongoTransactionRepository, MongoAccountRepository } from "@bytebank-web/infrastructure";
import { GetTransactionsUseCase, CreateTransactionUseCase, GetMonthlyDataUseCase, GetBalanceUseCase } from "@bytebank-web/core";

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
