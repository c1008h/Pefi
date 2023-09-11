const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';
// const PLAID_CLIENT_ID = 'your_client_id';
// const PLAID_SECRET = 'your_secret';
// const PLAID_ENV = 'sandbox'; // Change to your desired environment

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

// const plaidClient = new PlaidApi(configuration);

module.exports = { configuration };