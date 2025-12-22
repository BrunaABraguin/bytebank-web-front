// Service para validação de arquivo
export class FileValidator {
  static validateFile(file: File | null): string | null {
    if (!file) {
      return "Por favor, selecione um arquivo.";
    }

    if (file.type !== "application/pdf") {
      return "Apenas arquivos PDF são aceitos.";
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return "Arquivo muito grande. Máximo de 10MB.";
    }

    return null;
  }

  static validateEmail(email: string | null): string | null {
    if (!email) {
      return "Email não encontrado.";
    }
    return null;
  }
}

// Service para processamento de arquivo
export class FileProcessor {
  static async processFile(
    file: File,
    processFn: (data: { file: File }) => void
  ) {
    const validationError = FileValidator.validateFile(file);
    if (validationError) {
      throw new Error(validationError);
    }

    processFn({ file });
  }

  static async uploadFile(
    file: File,
    email: string,
    uploadFn: (data: { email: string; file: File }) => void
  ) {
    const fileValidation = FileValidator.validateFile(file);
    const emailValidation = FileValidator.validateEmail(email);

    if (fileValidation) {
      throw new Error(fileValidation);
    }

    if (emailValidation) {
      throw new Error(emailValidation);
    }

    uploadFn({ email, file });
  }
}
