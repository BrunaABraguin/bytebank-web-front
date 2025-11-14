import {
  MongoTransactionRepository,
  MongoAccountRepository,
} from "@bytebank-web/infrastructure";
import {
  GetTransactionsUseCase,
  CreateTransactionUseCase,
  GetMonthlyDataUseCase,
  GetBalanceUseCase,
} from "@bytebank-web/core";
import { Model } from "mongoose";

let TransactionModel: Model<any>;
let AccountModel: Model<any>;

export function configureModels(
  transactionModel: Model<any>,
  accountModel: Model<any>
) {
  TransactionModel = transactionModel;
  AccountModel = accountModel;
}

class DIContainerImpl {
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

export const container = new DIContainerImpl();

// Métodos estáticos para acesso global
export class DIContainer {
  private static readonly instance = container;

  static getGetTransactionsUseCase(): GetTransactionsUseCase {
    return DIContainer.instance.getTransactionsUseCase;
  }

  static getCreateTransactionUseCase(): CreateTransactionUseCase {
    return DIContainer.instance.createTransactionUseCase;
  }

  static getGetMonthlyDataUseCase(): GetMonthlyDataUseCase {
    return DIContainer.instance.getMonthlyDataUseCase;
  }

  static getGetBalanceUseCase(): GetBalanceUseCase {
    return DIContainer.instance.getBalanceUseCase;
  }

  static init(): void {
    // Método para inicialização se necessário
    console.log("DIContainer inicializado");
  }
}
