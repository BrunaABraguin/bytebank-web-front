export const API_URL = process.env.API_URL;

export const PASSWORD_VALIDATION = {
  MIN_LENGTH: 6,
  REQUIRED_MESSAGE: "A senha é obrigatória.",
  MIN_LENGTH_MESSAGE: "A senha deve ter pelo menos 6 caracteres.",
  COMBINED_MESSAGE: "A senha é obrigatória e deve ter pelo menos 6 caracteres.",
} as const;
