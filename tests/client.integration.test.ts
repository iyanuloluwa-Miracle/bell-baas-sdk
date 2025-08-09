import { client } from './testUtils';

describe('Client & Account Integration', () => {
  it('should return error for invalid getAccountInfo', async () => {
    await expect(client.getAccountInfo('0000000000')).rejects.toThrow();
  });

  it('should return error for invalid getTransactionByReference', async () => {
    await expect(client.getTransactionByReference('invalid-ref')).rejects.toThrow();
  });

  it('should return error for invalid getAllTransactions', async () => {
    await expect(client.getAllTransactions({ page: -1, limit: -1 })).rejects.toThrow();
  });

  it('should return error for invalid getClientAccounts', async () => {
    await expect(client.getClientAccounts({ invalid: 'param' })).rejects.toThrow();
  });

  it('should return error for invalid createClientIndividual', async () => {
    await expect(client.createClientIndividual({
      firstname: '', lastname: '', phoneNumber: '', address: ''
    })).rejects.toThrow();
  });

  it('should return error for invalid createClientCorporate', async () => {
    await expect(client.createClientCorporate({})).rejects.toThrow();
  });
});
