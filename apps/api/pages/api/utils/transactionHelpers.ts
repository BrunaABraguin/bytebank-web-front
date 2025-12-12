import { NextApiRequest, NextApiResponse } from "next";
import connectToMongoDB from "../libs/mongoDB";
import runMiddleware, { cors } from "../libs/cors";
import Transaction from "../models/Transaction";
import { validateRequiredFields } from "./requiredFields";
import { parsedMonth, parsedYear } from "./parseDate";
import { Transaction as TransactionType } from "@bytebank-web/types/transaction";

export interface QueryFilters {
  email: string;
  month: string;
  year: string;
}

/**
 * Common API handler setup for transaction-related endpoints
 */
export async function setupTransactionAPI(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: string[] = ["GET"]
): Promise<boolean> {
  await connectToMongoDB();
  await runMiddleware(req, res, cors);

  if (!allowedMethods.includes(req.method || "")) {
    res.setHeader("Allow", allowedMethods);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return false;
  }

  return true;
}

/**
 * Validates and extracts query parameters for transaction endpoints
 */
export function validateAndExtractQuery(
  req: NextApiRequest,
  res: NextApiResponse
): QueryFilters | null {
  const { email, month, year } = req.query;
  const validation = validateRequiredFields({ email, month, year }, res);

  if (!validation.isValid) {
    return null;
  }

  return {
    email: email as string,
    month: month as string,
    year: year as string,
  };
}

/**
 * Fetches transactions for a given month and year
 */
export async function fetchMonthlyTransactions(
  email: string,
  month: string,
  year: string
): Promise<TransactionType[]> {
  return await Transaction.find({
    ownerEmail: email,
    date: {
      $gte: new Date(parsedYear(year), parsedMonth(month) - 1, 1),
      $lt: new Date(parsedYear(year), parsedMonth(month), 1),
    },
  }).lean<TransactionType[]>();
}

/**
 * Standard error response for transaction-related endpoints
 */
export function sendTransactionError(
  res: NextApiResponse,
  error: unknown,
  operation: string
): void {
  console.error(`Erro ao ${operation}:`, error);
  res.status(500).json({ error: `Erro ao ${operation}` });
}
