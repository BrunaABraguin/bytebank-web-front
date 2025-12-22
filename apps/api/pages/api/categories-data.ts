import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import { TransactionEnum } from "@bytebank-web/types/transaction";
import { CategoryData } from "@bytebank-web/types/categoryData";

import runMiddleware, { cors } from "./libs/cors";
import categories from "@bytebank-web/utils/categories";
import { validateAndGetTransactions } from "./utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    return handleGetCategoriesData(req, res);
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetCategoriesData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToMongoDB();

  try {
    const result = await validateAndGetTransactions(req, res);

    if (!result.isValid) {
      return res
        .status(result.error!.status)
        .json({ error: result.error!.message });
    }

    const { transactions } = result;

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found" });
    }

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

    for (const [category, total] of Object.entries(groupedByCategory) as [string, number][]) {
      let percentage = 0;
      if (summary.expense > 0) {
        percentage = Math.round((total / summary.expense) * 10000) / 100;
      }
      categoryData.push({
        name: category,
        percentage,
      });
    }

    categories.forEach((cat) => {
      if (!categoryData.some((data) => data.name === cat.name)) {
        categoryData.push({
          name: cat.name,
          percentage: 0,
        });
      }
    });

    return res.status(200).json(categoryData);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return res.status(500).json({ error: "Erro ao buscar transações" });
  }
}
