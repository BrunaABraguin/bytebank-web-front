import { z } from "zod";

export const baseSchemas = {
  email: z
    .string()
    .email("Email inválido")
    .min(5, "Email deve ter pelo menos 5 caracteres")
    .max(255, "Email muito longo")
    .transform((val) => val.toLowerCase().trim()),

  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(128, "Senha muito longa")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Senha deve ter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 símbolo"
    ),

  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços")
    .transform((val) => val.trim()),

  id: z.string().uuid("ID inválido"),

  date: z.date(),

  currency: z
    .number()
    .positive("Valor deve ser positivo")
    .max(9999999.99, "Valor muito alto")
    .refine((val) => Number.isFinite(val), "Valor inválido"),
};


export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  return input
    .replaceAll(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replaceAll(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replaceAll(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replaceAll(/<embed[^>]*>/gi, "")
    .replaceAll(/on\w+\s*=/gi, "")
    .replaceAll(/javascript:/gi, "")
    .replaceAll(/data:/gi, "")
    .replaceAll(/<[^>]*>/g, "") 
    .trim();
}


export class SharedRateLimit {
  private readonly attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];

    
    const validAttempts = attempts.filter(
      (attempt) => now - attempt < this.windowMs
    );

    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }

    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);

    return true;
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;

    const oldestAttempt = Math.min(...attempts);
    const remainingTime = this.windowMs - (Date.now() - oldestAttempt);

    return Math.max(0, remainingTime);
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}


export function validateDataIntegrity<T>(
  data: T,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(
          (err) => `${err.path.join(".")}: ${err.message}`
        ),
      };
    }

    return { success: false, errors: ["Erro de validação desconhecido"] };
  }
}


export function maskSensitiveData(
  data: Record<string, unknown>
): Record<string, unknown> {
  const sensitiveFields = [
    "password",
    "token",
    "secret",
    "key",
    "auth",
    "email",
  ];
  const masked = { ...data };

  for (const [key, value] of Object.entries(masked)) {
    if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
      if (typeof value === "string") {
        if (key.toLowerCase().includes("email")) {
          
          const emailParts = value.split("@");
          if (emailParts.length === 2 && emailParts[0] && emailParts[1]) {
            masked[key] = `${emailParts[0].slice(0, 3)}***@${emailParts[1]}`;
          } else {
            masked[key] = "***@***.com";
          }
        } else {
          
          masked[key] =
            value.length > 0 ? "*".repeat(Math.min(value.length, 8)) : "";
        }
      } else {
        masked[key] = "[MASKED]";
      }
    }
  }

  return masked;
}


export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    const aCode = a.codePointAt(i) ?? 0;
    const bCode = b.codePointAt(i) ?? 0;
    result |= aCode ^ bCode;
  }

  return result === 0;
}


export function validateCSRFToken(
  token: string,
  expectedToken: string
): boolean {
  if (!token || !expectedToken) return false;
  return timingSafeEqual(token, expectedToken);
}


export const fileValidation = {
  allowedTypes: [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  maxSize: 5 * 1024 * 1024, 

  validateFile(file: File): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.allowedTypes.includes(file.type)) {
      errors.push("Tipo de arquivo não permitido. Use CSV ou Excel.");
    }

    if (file.size > this.maxSize) {
      errors.push("Arquivo muito grande. Máximo 5MB.");
    }

    if (file.name.length > 255) {
      errors.push("Nome do arquivo muito longo.");
    }

    return { valid: errors.length === 0, errors };
  },
};


export const dateFilterSchema = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    month: z.number().min(1).max(12).optional(),
    year: z.number().min(2020).max(2030).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    { message: "Data inicial deve ser anterior à data final" }
  );
