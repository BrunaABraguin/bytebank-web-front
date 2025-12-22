import { NextApiRequest, NextApiResponse } from "next";

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
        message: "Campos obrigatórios não preenchidos",
      },
    };
  }

  // Parse dos valores numéricos
  const parsedMonth = month ? Number.parseInt(month as string, 10) : undefined;
  const parsedYear = year ? Number.parseInt(year as string, 10) : undefined;

  // Validar se os valores numéricos são válidos
  if (
    requiredParams.includes("month") &&
    (Number.isNaN(parsedMonth!) || parsedMonth! < 1 || parsedMonth! > 12)
  ) {
    return {
      isValid: false,
      error: {
        status: 400,
        message: "Mês deve ser um número entre 1 e 12",
      },
    };
  }

  if (
    requiredParams.includes("year") &&
    (Number.isNaN(parsedYear!) || parsedYear! < 1900)
  ) {
    return {
      isValid: false,
      error: {
        status: 400,
        message: "Ano deve ser um número válido",
      },
    };
  }

  return {
    isValid: true,
    email: email as string,
    month: parsedMonth,
    year: parsedYear,
  };
}
