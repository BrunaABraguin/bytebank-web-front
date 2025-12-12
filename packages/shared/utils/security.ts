import { z } from "zod";


function createDOMPurify() {
  return {
    sanitize: (
      input: string,
      options?: {
        ALLOWED_TAGS?: string[];
        ALLOWED_ATTR?: string[];
        KEEP_CONTENT?: boolean;
      }
    ) => {
      if (typeof input !== "string") return "";

      
      let cleaned = input
        .replaceAll(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replaceAll(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
        .replaceAll(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
        .replaceAll(/<embed[^>]*>/gi, "")
        .replaceAll(/on\w+\s*=/gi, "")
        .replaceAll(/javascript:/gi, "")
        .replaceAll(/data:/gi, "");

      if (options?.KEEP_CONTENT && options?.ALLOWED_TAGS?.length === 0) {
        
        cleaned = cleaned.replaceAll(/<[^>]*>/g, "");
      }

      return cleaned;
    },
  };
}

const DOMPurify = createDOMPurify();


export const authSchemas = {
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
};

export const transactionSchemas = {
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(255, "Descrição muito longa")
    .transform((val) => sanitizeInput(val)),

  value: z
    .number()
    .positive("Valor deve ser positivo")
    .max(9999999.99, "Valor muito alto")
    .refine((val) => Number.isFinite(val), "Valor inválido"),

  date: z.date().max(new Date(), "Data não pode ser futura"),

  category: z
    .string()
    .min(1, "Categoria é obrigatória")
    .max(50, "Categoria muito longa")
    .transform((val) => sanitizeInput(val)),
};


export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  }).trim();
}


export function sanitizeHtml(html: string, allowedTags: string[] = []): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}


export function validateCSRFToken(
  token: string,
  expectedToken: string
): boolean {
  if (!token || !expectedToken) return false;

  
  return timingSafeEqual(token, expectedToken);
}


function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    const aCode = a.codePointAt(i) ?? 0;
    const bCode = b.codePointAt(i) ?? 0;
    result |= aCode ^ bCode;
  }

  return result === 0;
}


export class ClientRateLimit {
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
  const sensitiveFields = ["password", "token", "secret", "key", "auth"];
  const masked = { ...data };

  for (const [key, value] of Object.entries(masked)) {
    if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
      if (typeof value === "string") {
        masked[key] = value.length > 0 ? "*".repeat(value.length) : "";
      } else {
        masked[key] = "[MASKED]";
      }
    }
  }

  return masked;
}
