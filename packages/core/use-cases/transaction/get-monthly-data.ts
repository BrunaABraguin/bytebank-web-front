import { MonthlyData } from "../../entities/monthly-data";
import { Transaction } from "../../entities/transaction";
import { TransactionRepository } from "../../repositories/transaction-repository";

export class GetMonthlyDataUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(email: string): Promise<MonthlyData[]> {
    if (!email) {
      throw new Error("Email é obrigatório");
    }

    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    const transactions =
      await this.transactionRepository.findByEmailAndDateRange(
        email,
        threeMonthsAgo,
        currentDate
      );

    const groupedData = this.aggregateTransactionsToModelData(transactions);
    return this.fillMissingMonths(groupedData, threeMonthsAgo, currentDate);
  }

  private aggregateTransactionsToModelData(
    transactions: Transaction[]
  ): Record<string, MonthlyData> {
    const groupedData: Record<string, MonthlyData> = {};

    for (const transaction of transactions) {
      const month = this.formatMonth(transaction.date);

      if (!groupedData[month]) {
        groupedData[month] = new MonthlyData(month, 0, 0);
      }

      if (transaction.isIncome()) {
        groupedData[month] = new MonthlyData(
          month,
          groupedData[month].income + transaction.value,
          groupedData[month].expense
        );
      } else {
        groupedData[month] = new MonthlyData(
          month,
          groupedData[month].income,
          groupedData[month].expense + transaction.getAbsoluteValue()
        );
      }
    }

    return groupedData;
  }

  private fillMissingMonths(
    data: Record<string, MonthlyData>,
    startDate: Date,
    endDate: Date
  ): MonthlyData[] {
    const result: MonthlyData[] = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      const month = this.formatMonth(current);
      if (data[month]) {
        result.push(data[month]);
      } else {
        result.push(new MonthlyData(month, 0, 0));
      }
      current.setMonth(current.getMonth() + 1);
    }

    return result;
  }

  private formatMonth(date: Date): string {
    return date.toLocaleString("pt-BR", { month: "long", year: "numeric" });
  }
}
