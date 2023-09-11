const router = require('express').Router()
const { PlaidApi } = require('plaid'); 
const { configuration } = require('../../utils/plaid-utils')

require('dotenv').config({path: __dirname+'../../../env'});

const plaidClient = new PlaidApi(configuration);

router.post('/callback', async (req, res) => {
    const { public_token } = req.body; // Adjust this to match Plaid's response structure.

    try {
        const exchangeResponse = await plaidClient.itemPublicTokenExchange({
            public_token
        })

        const access_token = exchangeResponse.data.access_token

        res.json({ access_token })
    } catch (error) {
        console.error('Error exchanging public_token:', error);
        res.status(500).json({ error: 'Error exchanging public_token' });
    }

})

module.exports = router;
