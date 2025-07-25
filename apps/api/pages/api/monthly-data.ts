import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import Transaction from "./models/Transaction";
import {
  TransactionEnum,
  Transaction as TransactionType,
} from "@workspace/types/transaction";
import { MonthlyData } from "@workspace/types/monthlyData";
import runMiddleware, { cors } from "./libs/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    return handleGetMonthlyData(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetMonthlyData(req: NextApiRequest, res: NextApiResponse) {
  await connectToMongoDB();

  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const transactions = await Transaction.find({
      date: { $gte: threeMonthsAgo },
      ownerEmail: email,
    }).lean<TransactionType[]>();

    const data = aggregateTransactionsToModelData(transactions);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return res.status(500).json({ error: "Erro ao buscar transações" });
  }
}

function aggregateTransactionsToModelData(
  transactions: TransactionType[]
): MonthlyData[] {
  const groupedData: Record<string, MonthlyData> = {};

  transactions.forEach(({ type, value, date }) => {
    const month = new Date(date).toLocaleString("pt-BR", {
      month: "long",
    });

    if (!groupedData[month]) {
      groupedData[month] = { month, income: 0, expense: 0 };
    }

    if (type === TransactionEnum.INCOME) {
      groupedData[month].income += value;
    } else {
      groupedData[month].expense += value;
    }
  });

  return Object.values(groupedData);
}
