// Common utility types
// -------------------

export type Nullable<T> = T | null;

// Standard API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T | null;
}

// Client configuration options
export interface ClientOptions {
  apiKey: string;
  baseUrl?: string;
  timeoutMs?: number;
}

// Add more utility types as needed

// --- Token Generation Types ---
// Headers for token generation (used in /v1/generate-token)
export interface GenerateTokenHeaders {
  consumerKey: string;
  consumerSecret: string;
  validityTime: number; // in seconds or ms, as per API
}

// Response for token generation
export interface GenerateTokenResponse {
  success: boolean;
  message: string;
  token: string;
}
