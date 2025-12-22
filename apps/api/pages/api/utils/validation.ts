import { NextApiRequest, NextApiResponse } from "next";
import Transaction from "../models/Transaction";
import { Transaction as TransactionType } from "@bytebank-web/types/transaction";

export interface ValidationResult {
  isValid: boolean;
  email?: string;
  month?: number;
  year?: number;
  error?: {
    status: number;
    message: string;
  };
}

export interface TransactionsResult {
  isValid: boolean;
  transactions?: TransactionType[];
  email?: string;
  month?: number;
  year?: number;
  error?: {
    status: number;
    message: string;
  };
}

export function validateRequiredParams(
  req: NextApiRequest,
  res: NextApiResponse,
  requiredParams: string[] = ["email", "month", "year"]
): ValidationResult {
  const { email, month, year } = req.query;

  // Verificar se todos os parâmetros obrigatórios estão presentes
  const missingParams: string[] = [];

  if (requiredParams.includes("email") && !email) {
    missingParams.push("email");
  }
  if (requiredParams.includes("month") && !month) {
    missingParams.push("month");
  }
  if (requiredParams.includes("year") && !year) {
    missingParams.push("year");
  }

  if (missingParams.length > 0) {
    return {
      isValid: false,
      error: {
        status: 400,
        message: `Campos obrigatórios não preenchidos: ${missingParams.join(", ")}`,
      },
    };
  }

  // Parse dos valores numéricos
  const parsedMonth = month ? Number.parseInt(month as string, 10) : undefined;
  const parsedYear = year ? Number.parseInt(year as string, 10) : undefined;

  // Validar se os valores numéricos são válidos
  if (requiredParams.includes("month")) {
    if (
      parsedMonth === undefined ||
      Number.isNaN(parsedMonth) ||
      parsedMonth < 1 ||
      parsedMonth > 12
    ) {
      return {
        isValid: false,
        error: {
          status: 400,
          message: "Mês deve ser um número entre 1 e 12",
        },
      };
    }
  }

  if (requiredParams.includes("year")) {
    if (
      parsedYear === undefined ||
      Number.isNaN(parsedYear) ||
      parsedYear < 1900
    ) {
      return {
        isValid: false,
        error: {
          status: 400,
          message: "Ano deve ser um número válido",
        },
      };
    }
  }

  return {
    isValid: true,
    email: email as string,
    month: parsedMonth,
    year: parsedYear,
  };
}

export async function validateAndGetTransactions(
  req: NextApiRequest,
  res: NextApiResponse,
  requiredParams: string[] = ["email", "month", "year"]
): Promise<TransactionsResult> {
  try {
    const validation = validateRequiredParams(req, res, requiredParams);

    if (!validation.isValid) {
      return {
        isValid: false,
        error: validation.error,
      };
    }

    const { email, month: parsedMonth, year: parsedYear } = validation;

    if (parsedMonth === undefined || parsedYear === undefined) {
      return {
        isValid: false,
        error: {
          status: 400,
          message: "Parâmetros 'month' e 'year' são obrigatórios",
        },
      };
    }

    const transactions = await Transaction.find({
      ownerEmail: email,
      date: {
        $gte: new Date(parsedYear, parsedMonth - 1, 1),
        $lt: new Date(parsedYear, parsedMonth, 1),
      },
    }).lean<TransactionType[]>();

    return {
      isValid: true,
      transactions,
      email,
      month: parsedMonth,
      year: parsedYear,
    };
  } catch (error) {
    console.error("Error in validateAndGetTransactions:", error);
    return {
      isValid: false,
      error: {
        status: 500,
        message: "Erro interno do servidor",
      },
    };
  }
}
