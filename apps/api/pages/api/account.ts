import type { NextApiRequest, NextApiResponse } from "next";
import {
  setupTransactionAPI,
  validateAndExtractQuery,
  fetchMonthlyTransactions,
  sendTransactionError,
} from "./utils/transactionHelpers";
import { TransactionEnum } from "@bytebank-web/types/transaction";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isSetupValid = await setupTransactionAPI(req, res);
  if (!isSetupValid) return;

  if (req.method === "GET") {
    return handleGetAccount(req, res);
  }
}

async function handleGetAccount(req: NextApiRequest, res: NextApiResponse) {
  try {
    const queryData = validateAndExtractQuery(req, res);
    if (!queryData) return;

    const { email, month, year } = queryData;
    const transactions = await fetchMonthlyTransactions(email, month, year);

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === TransactionEnum.INCOME) {
          acc.income += transaction.value;
        } else {
          acc.expense += transaction.value;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );

    return res.status(200).json({
      balance: summary.income - Math.abs(summary.expense),
      income: summary.income,
      expense: summary.expense,
    });
  } catch (error) {
    return sendTransactionError(res, error, "buscar conta");
  }
}
