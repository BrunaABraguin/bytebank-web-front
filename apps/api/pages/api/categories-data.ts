import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "./libs/mongoDB";
import runMiddleware, { cors } from "./libs/cors";
import Transaction from "./models/Transaction";
import { validateRequiredFields } from "./utils/requiredFields";
import {
  TransactionEnum,
  Transaction as TransactionType,
} from "@bytebank-web/types/transaction";
import { CategoryData } from "@bytebank-web/types/categoryData";
import categories from "@bytebank-web/utils/categories";
import { parsedMonth, parsedYear } from "./utils/parseDate";

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
    const { email, month, year } = req.query;

    const validation = validateRequiredFields({ email, month, year }, res);
    if (!validation.isValid) {
      return;
    }

    const transactions = await Transaction.find({
      ownerEmail: email,
      date: {
        $gte: new Date(
          parsedYear(year as string),
          parsedMonth(month as string) - 1,
          1
        ),
        $lt: new Date(
          parsedYear(year as string),
          parsedMonth(month as string),
          1
        ),
      },
    }).lean<TransactionType[]>();

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
    console.error("Erro ao buscar transações:", error);
    return res.status(500).json({ error: "Erro ao buscar transações" });
  }
}
