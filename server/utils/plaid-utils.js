require('dotenv').config();
const { Configuration, PlaidApi, PlaidEnvironments} = require('plaid');
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

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

const client = new PlaidApi(configuration);


module.export = client
// const getAssetReportWithRetries = (
//     plaidClient,
//     asset_report_token,
//     ms = 1000,
//     retriesLeft = 20,
//   ) =>
//     new Promise((resolve, reject) => {
//       const request = {
//         asset_report_token,
//       };
  
//       plaidClient
//         .assetReportGet(request)
//         .then(resolve)
//         .catch(() => {
//           setTimeout(() => {
//             if (retriesLeft === 1) {
//               reject('Ran out of retries while polling for asset report');
//               return;
//             }
//             getAssetReportWithRetries(
//               plaidClient,
//               asset_report_token,
//               ms,
//               retriesLeft - 1,
//             ).then(resolve);
//           }, ms);
//         });
// });
  
// const formatError = (error) => {
//     return {
//         error: { ...error.data, status_code: error.status },
//     };
// };

// const authorizeAndCreateTransfer = async (accessToken) => {
//     // We call /accounts/get to obtain first account_id - in production,
//     // account_id's should be persisted in a data store and retrieved
//     // from there.
//     const accountsResponse = await client.accountsGet({
//       access_token: accessToken,
//     });
//     const accountId = accountsResponse.data.accounts[0].account_id;
  
//     const transferAuthorizationResponse =
//       await client.transferAuthorizationCreate({
//         access_token: accessToken,
//         account_id: accountId,
//         type: 'credit',
//         network: 'ach',
//         amount: '1.34',
//         ach_class: 'ppd',
//         user: {
//           legal_name: 'FirstName LastName',
//           email_address: 'foobar@email.com',
//           address: {
//             street: '123 Main St.',
//             city: 'San Francisco',
//             region: 'CA',
//             postal_code: '94053',
//             country: 'US',
//           },
//         },
//       });
//     prettyPrintResponse(transferAuthorizationResponse);
//     const authorizationId = transferAuthorizationResponse.data.authorization.id;
  
//     const transferResponse = await client.transferCreate({
//       access_token: accessToken,
//       account_id: accountId,
//       authorization_id: authorizationId,
//       description: 'Payment',
//     });
//     prettyPrintResponse(transferResponse);
//     return transferResponse.data.transfer.id;
// };