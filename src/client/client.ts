// BellBaasClient: Main API client for Bell SDK
import axios, { AxiosInstance, AxiosError } from 'axios';
import crypto from 'crypto';
// Import types from new structure for clarity and maintainability
import type { ClientOptions } from '../types/common';
import type { ApiResponse } from '../types/common';
import type { CreateIndividualPayload } from '../types/user';
import type { TransferPayload, NameEnquiryPayload, RequeryPayload, TransactionsQuery } from '../types/transaction';

export class BellBaasClient {
  private client: AxiosInstance;
  private apiKey: string;
  private webhookSecret?: string;

  constructor(opts: ClientOptions & { webhookSecret?: string } | ClientOptions) {
    const baseUrl = (opts as any).baseUrl || 'https://api.bellmfb.com';
    this.apiKey = opts.apiKey;
    this.webhookSecret = (opts as any).webhookSecret;

    this.client = axios.create({
      baseURL: baseUrl,
      timeout: opts.timeoutMs || 15000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      }
    });

    // Response error normalization
    this.client.interceptors.response.use(
      (r) => r,
      (err: AxiosError) => {
        if (err.response) {
          const status = err.response.status;
          const data = err.response.data as any;
          const message = data?.message || data?.error || `HTTP ${status}`;
          return Promise.reject(new Error(message));
        }
        return Promise.reject(err);
      }
    );
  }

  // --- Virtual Accounts ---
  async createClientIndividual(payload: CreateIndividualPayload): Promise<ApiResponse> {
    const res = await this.client.post<ApiResponse>('/v1/account/clients/individual', payload);
    return res.data;
  }

  async createClientCorporate(payload: Record<string, any>): Promise<ApiResponse> {
    const res = await this.client.post<ApiResponse>('/v1/account/clients/corporate', payload);
    return res.data;
  }

  async getClientAccounts(params?: Record<string, any>): Promise<ApiResponse> {
    const res = await this.client.get<ApiResponse>('/v1/account/accounts', { params });
    return res.data;
  }

  async getAccountInfo(accountNumber: string): Promise<ApiResponse> {
    const res = await this.client.get<ApiResponse>(`/v1/account/info/${encodeURIComponent(accountNumber)}`);
    return res.data;
  }

  // --- Transfer & Banks ---
  async bankList(): Promise<ApiResponse> {
    const res = await this.client.get<ApiResponse>('/v1/transfer/banks');
    return res.data;
  }

  async bankNameEnquiry(payload: NameEnquiryPayload): Promise<ApiResponse> {
    // Some APIs use GET with query params; this uses POST to be explicit
    const res = await this.client.post<ApiResponse>('/v1/transfer/name-enquiry', payload);
    return res.data;
  }

  async transfer(payload: TransferPayload): Promise<ApiResponse> {
    const res = await this.client.post<ApiResponse>('/v1/transfer', payload);
    return res.data;
  }

  async requeryTransfer(payload: RequeryPayload): Promise<ApiResponse> {
    const res = await this.client.post<ApiResponse>('/v1/transfer/requery', payload);
    return res.data;
  }

  // --- Transactions ---
  async getAllTransactions(query?: TransactionsQuery): Promise<ApiResponse> {
    const res = await this.client.get<ApiResponse>('/v1/transactions', { params: query });
    return res.data;
  }

  async getTransactionByReference(reference: string): Promise<ApiResponse> {
    const res = await this.client.get<ApiResponse>(`/v1/transactions/${encodeURIComponent(reference)}`);
    return res.data;
  }

  // --- Reusable helper: raw request (for advanced use) ---
  async raw<T = any>(method: 'get' | 'post' | 'put' | 'delete', path: string, data?: any, params?: any): Promise<T> {
    const res = await this.client.request<T>({ method, url: path, data, params });
    return res.data;
  }

  // --- Webhook signature verification helper ---
  // Implementation assumes HMAC-SHA256 with secret and header `x-bell-signature` (if your webhook uses another header/algorithm adjust accordingly)
  verifyWebhookSignature(payloadBody: string | Buffer, signatureHeader: string | undefined, options?: { secret?: string, algorithm?: 'sha256' | 'sha1' }): boolean {
    const secret = options?.secret ?? this.webhookSecret;
    const algorithm = options?.algorithm ?? 'sha256';
    if (!secret) throw new Error('Webhook secret not configured.');

    if (!signatureHeader) return false;

    // If header contains prefix like "sha256=...", remove prefix
    const signature = signatureHeader.includes('=') ? signatureHeader.split('=')[1] : signatureHeader;

    const hmac = crypto.createHmac(algorithm, secret);
    hmac.update(typeof payloadBody === 'string' ? payloadBody : payloadBody.toString('utf8'));
    const digest = hmac.digest('hex');

    // timingSafeEqual to avoid timing attacks
    try {
      const a = Buffer.from(digest, 'hex');
      const b = Buffer.from(signature, 'hex');
      if (a.length !== b.length) return false;
      return crypto.timingSafeEqual(a, b);
    } catch {
      return false;
    }
  }
}
