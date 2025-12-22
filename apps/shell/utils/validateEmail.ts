export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;

  const parts = email.split("@");
  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;

  if (!localPart || localPart.length > 64) return false;
  if (!domain || domain.length > 253) return false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}