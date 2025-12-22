import { Transaction, TransactionEnum } from "@bytebank-web/types/transaction";

// Abstrações para repositórios (DIP)
export interface TransactionRepository {
  addTransaction(
    transaction: CreateTransactionData
  ): Promise<TransactionResponse>;
  getTransactions(email: string): Promise<Transaction[]>;
  updateTransaction(
    id: string,
    transaction: Partial<Transaction>
  ): Promise<Transaction>;
  deleteTransaction(id: string): Promise<{ message: string }>;
}

export interface FileRepository {
  uploadFile(file: File, metadata: FileMetadata): Promise<FileUploadResponse>;
  processFile(file: File, bank: string): Promise<ProcessedFileData>;
}

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(userData: RegisterData): Promise<AuthResponse>;
  refreshToken(token: string): Promise<AuthResponse>;
  logout(): Promise<void>;
}

// Types para contratos
export interface CreateTransactionData {
  type: TransactionEnum;
  value: string;
  email: string;
  description?: string;
  category?: string;
}

export interface TransactionResponse {
  message: string;
  transaction?: Transaction;
}

export interface FileMetadata {
  bank: string;
  email: string;
}

export interface FileUploadResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface ProcessedFileData {
  transactions: Transaction[];
  summary: {
    total: number;
    processed: number;
    errors: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
