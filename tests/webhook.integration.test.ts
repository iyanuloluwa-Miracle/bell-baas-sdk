import { BellBaasClient } from '../src/client/client';
import { apiKey, baseUrl, webhookSecret } from './testUtils';

describe('Webhook Signature Verification', () => {
  const client = new BellBaasClient({ apiKey, baseUrl, webhookSecret });

  it('should verify a valid signature', () => {
    const payload = 'test-payload';
    const secret = webhookSecret;
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const signature = hmac.digest('hex');
    const header = `sha256=${signature}`;
    expect(client.verifyWebhookSignature(payload, header)).toBe(true);
  });

  it('should fail for invalid signature', () => {
    const payload = 'test-payload';
    const header = 'sha256=invalidsignature';
    expect(client.verifyWebhookSignature(payload, header)).toBe(false);
  });

  it('should throw if secret is missing', () => {
    const payload = 'test-payload';
    const header = 'sha256=invalidsignature';
    const clientNoSecret = new BellBaasClient({ apiKey, baseUrl });
    expect(() => clientNoSecret.verifyWebhookSignature(payload, header)).toThrow('Webhook secret not configured.');
  });

  it('should make a raw GET request and fail for invalid path', async () => {
    await expect(client.raw('get', '/invalid-path')).rejects.toThrow();
  });
});
