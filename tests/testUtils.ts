import { BellBaasClient } from '../src/client/client';

export const apiKey = process.env.BELL_API_KEY || 'test_api_key';
export const baseUrl = process.env.BELL_BASE_URL || 'https://api.bellmfb.com';
export const webhookSecret = 'test_webhook_secret';

export const client = new BellBaasClient({ apiKey, baseUrl, webhookSecret });
