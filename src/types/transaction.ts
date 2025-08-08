// Transaction-related types and interfaces
// ---------------------------------------

// Transaction status enum
export enum TransactionStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled'
}

export interface Transaction {
  id: string;
  amount: number;
  date: string; // ISO format
  status: TransactionStatus;
  // Add more transaction fields as needed
}

// Transfer payload
export interface TransferPayload {
  beneficiaryBankCode: string;
  beneficiaryAccountNumber: string;
  narration?: string;
  amount: number;
  reference?: string;
  senderName?: string;
}

// Name enquiry payload
export interface NameEnquiryPayload {
  accountNumber: string;
  bankCode: string;
}

// Requery payload
export interface RequeryPayload {
  reference: string;
}

// Transactions query
export interface TransactionsQuery {
  page?: number;
  limit?: number;
  from?: string | number;
  to?: string | number;
  status?: string;
}
