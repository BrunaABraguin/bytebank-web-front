import { NextApiResponse } from "next";

export interface ValidationResult {
  isValid: boolean;
  response?: void;
}


export function validateRequiredFields(
  fields: Record<string, unknown>,
  res: NextApiResponse,
  customMessage = "Campos obrigatórios não preenchidos"
): ValidationResult {
  const missingFields: string[] = [];

  for (const [fieldName, value] of Object.entries(fields)) {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      missingFields.push(fieldName);
    }
  }

  if (missingFields.length > 0) {
    res.status(400).json({
      error: customMessage,
      missingFields: missingFields,
    });
    return { isValid: false };
  }

  return { isValid: true };
}


export function areFieldsValid(fields: Record<string, unknown>): boolean {
  return Object.values(fields).every(
    (value) => value && (typeof value !== "string" || value.trim() !== "")
  );
}
