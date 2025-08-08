// src/types.ts
export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T | null;
}

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
