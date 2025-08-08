# Bell SDK

A TypeScript/JavaScript SDK for interacting with the Bell BAAS API, providing easy access to virtual accounts, transfers, transactions, and more.

## Features
- Create and manage virtual accounts (individual/corporate)
- Perform bank transfers and name enquiries
- Query transactions and account information
- Secure webhook signature verification
- Token generation for authentication

## Installation
```sh
npm install bell-sdk
```

## Usage

### Import and Initialize
```ts
import { BellBaasClient } from './src/client/client';

const client = new BellBaasClient({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://api.bellmfb.com', // or sandbox URL
  timeoutMs: 15000,
  webhookSecret: 'YOUR_WEBHOOK_SECRET', // optional
});
```

### Generate Token
```ts
const tokenRes = await client.generateToken({
  consumerKey: 'yourConsumerKey',
  consumerSecret: 'yourConsumerSecret',
  validityTime: 3600,
});
console.log(tokenRes.token);
```

### Create Individual Virtual Account
```ts
const res = await client.createClientIndividual({
  firstname: 'John',
  lastname: 'Doe',
  phoneNumber: '08012345678',
  address: '123 Main St',
});
console.log(res.data);
```

### List Accounts
```ts
const accounts = await client.getClientAccounts();
console.log(accounts.data);
```

### Get Account Info
```ts
const info = await client.getAccountInfo('0000000033');
console.log(info.data);
```

### Bank List & Name Enquiry
```ts
const banks = await client.bankList();
const name = await client.bankNameEnquiry({
  accountNumber: '0000000033',
  bankCode: '123',
});
```

### Transfer & Requery
```ts
const transfer = await client.transfer({
  beneficiaryBankCode: '123',
  beneficiaryAccountNumber: '0000000033',
  amount: 1000,
});
const requery = await client.requeryTransfer({ reference: 'tx-ref' });
```

### Transactions
```ts
const txs = await client.getAllTransactions({ page: 1, limit: 10 });
const tx = await client.getTransactionByReference('tx-ref');
```

### Webhook Signature Verification
```ts
const isValid = client.verifyWebhookSignature(
  req.rawBody,
  req.headers['x-bell-signature']
);
```

## Types
All request/response and entity types are exported from `src/types/api-types.ts`.

## Error Handling
All methods throw errors for failed requests. Use try/catch to handle errors.

## License
MIT
