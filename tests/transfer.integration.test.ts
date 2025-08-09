import { client } from './testUtils';

describe('Transfer & Requery Integration', () => {
  it('should return error for invalid transfer', async () => {
    await expect(client.transfer({
      beneficiaryBankCode: '000',
      beneficiaryAccountNumber: '0000000000',
      amount: 1000
    })).rejects.toThrow();
  });

  it('should return error for invalid requery', async () => {
    await expect(client.requeryTransfer({ reference: 'invalid-ref' })).rejects.toThrow();
  });
});
