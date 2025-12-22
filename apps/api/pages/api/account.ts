import { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import runMiddleware, { cors } from "./libs/cors";
import Transaction from "./models/Transaction";
import {
  TransactionEnum,
  Transaction as TransactionType,
} from "@bytebank-web/types/transaction";

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
    const { email, month, year } = req.query;
    if (!email || !month || !year) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }

    const parsedMonth = Number.parseInt(month as string, 10);
    const parsedYear = Number.parseInt(year as string, 10);

    const transactions = await Transaction.find({
      ownerEmail: email,
      date: {
        $gte: new Date(parsedYear, parsedMonth - 1, 1),
        $lt: new Date(parsedYear, parsedMonth, 1),
      },
    }).lean<TransactionType[]>();

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
