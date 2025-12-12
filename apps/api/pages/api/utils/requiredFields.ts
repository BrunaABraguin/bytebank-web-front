import { NextApiResponse } from "next";

export interface ValidationResult {
  isValid: boolean;
  response?: void;
}

/**
 * Validates required fields and automatically sends error response if validation fails
 * @param fields - Object with field names as keys and their values
 * @param res - NextApiResponse object to send error response
 * @param customMessage - Optional custom error message
 * @returns ValidationResult indicating if validation passed
 */
export function validateRequiredFields(
  fields: Record<string, any>,
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

/**
 * Simplified version that only checks if fields exist (no automatic response)
 * @param fields - Object with field names as keys and their values
 * @returns boolean indicating if all fields are present and valid
 */
export function areFieldsValid(fields: Record<string, any>): boolean {
  return Object.values(fields).every(
    (value) => value && (typeof value !== "string" || value.trim() !== "")
  );
}
