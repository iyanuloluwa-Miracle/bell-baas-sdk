import { client } from './testUtils';

describe('Bank API Integration', () => {
  it('should fetch bank list', async () => {
    const res = await client.bankList();
    expect(res).toHaveProperty('data');
    expect(Array.isArray(res.data)).toBe(true);
  });

  it('should return error for invalid name enquiry', async () => {
    await expect(client.bankNameEnquiry({ accountNumber: '0000000000', bankCode: '000' }))
      .rejects.toThrow();
  });
});
