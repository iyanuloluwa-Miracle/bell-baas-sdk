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
