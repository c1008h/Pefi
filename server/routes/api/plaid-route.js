const express = require('express');
const plaidClient = require('../../utils/plaid-utils'); 
const router = express.Router();

// Route to fetch transactions from Plaid
router.get('/fetch-transactions', async (req, res) => {
  try {
    // Make a Plaid API request to fetch transactions
    const accessToken = 'user_access_token'; // Replace with the user's access token
    const startDate = '2023-01-01'; // Replace with the desired start date
    const endDate = '2023-09-01'; // Replace with the desired end date

    // Use the plaidClient.transactionsGet method to retrieve transactions
    const transactionsResponse = await plaidClient.transactionsGet(
      accessToken,
      startDate,
      endDate
    );

    // Handle the Plaid API response
    const transactions = transactionsResponse.data.transactions;
    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
});

module.exports = router;