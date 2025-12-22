import { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import runMiddleware, { cors } from "./libs/cors";
import { TransactionEnum } from "@bytebank-web/types/transaction";
import { validateAndGetTransactions } from "./utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToMongoDB();
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    return handleGetAccount(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetAccount(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await validateAndGetTransactions(req, res);

    if (!result.isValid) {
      return res
        .status(result.error!.status)
        .json({ error: result.error!.message });
    }

    const { transactions } = result;

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "Transactions not found" });
    }

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
    console.error("Erro ao buscar conta:", error);
    return res.status(500).json({ error: "Erro ao buscar conta" });
  }
}
