import type { NextApiRequest, NextApiResponse } from "next";
import {
  setupTransactionAPI,
  validateAndExtractQuery,
  fetchMonthlyTransactions,
  sendTransactionError,
} from "./utils/transactionHelpers";
import { TransactionEnum } from "@bytebank-web/types/transaction";
import { CategoryData } from "@bytebank-web/types/categoryData";
import categories from "@bytebank-web/utils/categories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isSetupValid = await setupTransactionAPI(req, res);
  if (!isSetupValid) return;

  if (req.method === "GET") {
    return handleGetCategoriesData(req, res);
  }
}

async function handleGetCategoriesData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const queryData = validateAndExtractQuery(req, res);
    if (!queryData) return;

    const { email, month, year } = queryData;
    const transactions = await fetchMonthlyTransactions(email, month, year);

    const categoryData: CategoryData[] = [];

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type !== TransactionEnum.INCOME) {
          acc.expense += Math.abs(transaction.value);
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    const groupedByCategory = transactions.reduce(
      (acc, transaction) => {
        if (
          transaction.category &&
          transaction.type !== TransactionEnum.INCOME
        ) {
          if (!acc[transaction.category]) {
            acc[transaction.category] = 0;
          }
          acc[transaction.category] += Math.abs(transaction.value);
        }
        return acc;
      },
      {} as Record<string, number>
    );

    for (const [category, total] of Object.entries(groupedByCategory)) {
      const percentage = ((total / summary.expense) * 100).toFixed(2);
      categoryData.push({
        name: category,
        percentage: Number.parseFloat(percentage),
      });
    }

    for (const cat of categories) {
      if (!categoryData.some((data) => data.name === cat.name)) {
        categoryData.push({
          name: cat.name,
          percentage: 0,
        });
      }
    }

    return res.status(200).json(categoryData);
  } catch (error) {
    return sendTransactionError(res, error, "buscar transações");
  }
}
