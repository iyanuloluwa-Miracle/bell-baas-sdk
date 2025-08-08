// All API payload and response types for Bell SDK
// ----------------------------------------------

// --- Client/Account Types ---
export interface CreateIndividualPayload {
  firstname: string;
  lastname: string;
  middlename?: string;
  phoneNumber: string;
  address: string;
  bvn?: string | number;
  gender?: 'male' | 'female' | string;
  dateOfBirth?: string;
  metadata?: Record<string, any>;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserProfile {
  userId: string;
  bio?: string;
  avatarUrl?: string;
}

// --- Transaction Types ---
export type TransactionStatus = 'pending' | 'completed' | 'failed' | string;

export interface Transaction {
  id: string;
  amount: number;
  date: string; // ISO format
  status: TransactionStatus;
}

export interface TransferPayload {
  beneficiaryBankCode: string;
  beneficiaryAccountNumber: string;
  narration?: string;
  amount: number;
  reference?: string;
  senderName?: string;
}

export interface NameEnquiryPayload {
  accountNumber: string;
  bankCode: string;
}

export interface RequeryPayload {
  reference: string;
}

export interface TransactionsQuery {
  page?: number;
  limit?: number;
  from?: string | number;
  to?: string | number;
  status?: string;
}

// --- Token Types ---
export interface GenerateTokenHeaders {
  consumerKey: string;
  consumerSecret: string;
  validityTime: number;
}

export interface GenerateTokenResponse {
  success: boolean;
  message: string;
  token: string;
}

// --- API Response Wrapper ---
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T | null;
}

// --- Client Options ---
export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}
