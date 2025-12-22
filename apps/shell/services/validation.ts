// Validator seguindo SRP - apenas validações
export class FormValidator {
  static validateEmail(email: string): string | null {
    if (!email.trim()) {
      return "O email é obrigatório.";
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Digite um email válido.";
    }
    return null;
  }

  static validatePassword(password: string): string | null {
    if (!password.trim()) {
      return "A senha é obrigatória.";
    }
    if (password.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres.";
    }
    return null;
  }

  static validateName(name: string): string | null {
    if (!name.trim()) {
      return "O nome é obrigatório.";
    }
    if (name.length < 2) {
      return "O nome deve ter pelo menos 2 caracteres.";
    }
    return null;
  }

  static validateLoginForm(
    email: string,
    password: string
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    const emailError = this.validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validatePassword(password);
    if (passwordError) errors.password = passwordError;

    return errors;
  }

  static validateRegisterForm(
    name: string,
    email: string,
    password: string
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    const nameError = this.validateName(name);
    if (nameError) errors.name = nameError;

    const emailError = this.validateEmail(email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validatePassword(password);
    if (passwordError) errors.password = passwordError;

    return errors;
  }

  static isFormValid(errors: Record<string, string>): boolean {
    return Object.keys(errors).length === 0;
  }
}
