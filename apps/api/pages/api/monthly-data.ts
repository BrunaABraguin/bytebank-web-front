import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import Transaction from "./models/Transaction";
import {
  TransactionEnum,
  Transaction as TransactionType,
} from "@bytebank-web/types/transaction";
import { MonthlyData } from "@bytebank-web/types/monthlyData";
import runMiddleware, { cors } from "./libs/cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToMongoDB();
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    return handleGetMonthlyData(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetMonthlyData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }

    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    const transactions = await Transaction.find({
      date: { $gte: threeMonthsAgo },
      ownerEmail: email,
    }).lean<TransactionType[]>();

    const data = fillMissingMonths(
      aggregateTransactionsToModelData(transactions),
      threeMonthsAgo,
      currentDate
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return res.status(500).json({ error: "Erro ao buscar transações" });
  }
}

function aggregateTransactionsToModelData(
  transactions: TransactionType[]
): Record<string, MonthlyData> {
  const groupedData: Record<string, MonthlyData> = {};

  transactions.forEach(({ type, value, date }) => {
    const month = formatMonth(new Date(date));

    if (!groupedData[month]) {
      groupedData[month] = { month, income: 0, expense: 0 };
    }

    if (type === TransactionEnum.INCOME) {
      groupedData[month].income += Math.round(value * 100) / 100;
    } else {
      groupedData[month].expense += Math.abs(Math.round(value * 100) / 100);
    }
  });

  Object.keys(groupedData).forEach((month) => {
    groupedData[month].income = Math.round(groupedData[month].income * 100) / 100;
    groupedData[month].expense = Math.round(groupedData[month].expense * 100) / 100;
  });

  return groupedData;
}

function fillMissingMonths(
  data: Record<string, MonthlyData>,
  startDate: Date,
  endDate: Date
): MonthlyData[] {
  const result: MonthlyData[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const month = formatMonth(current);
    if (data[month]) {
      result.push(data[month]);
    } else {
      result.push({ month, income: 0, expense: 0 });
    }
    current.setMonth(current.getMonth() + 1);
  }

  return result;
}

function formatMonth(date: Date): string {
  return date.toLocaleString("pt-BR", { month: "long", year: "numeric" });
}
