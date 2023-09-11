const router = require('express').Router()
const { PlaidApi } = require('plaid'); 
const { configuration } = require('../../utils/plaid-utils')

require('dotenv').config({path: __dirname+'../../../env'});

const plaidClient = new PlaidApi(configuration);

router.post('/token/create', async (req, res) => {
    const request = {
        user: {
            client_user_id: 'user-id',
            phone_number: '+1 415 5550123'
        },
        client_name: 'Personal Finance App',
        products: ['transactions'],
        country_codes: ['US'],
        language: 'en',
        required_if_supported_products: ['liabilities'],
        webhook: 'https://sample-web-hook.com',
        redirect_uri: process.env.PLAID_REDIRECT_URI
    };

    try {
        const response = await plaidClient.linkTokenCreate(request);
        const linkToken = response.data.link_token;

        console.log(response)
        console.log(linkToken)
        res.json({ linkToken });
    } catch (error) {
        console.error(error.message)

        if (error.response) {
            console.error(`Create Token Response Status: ${error.response.status}`);
            console.error(`Create Token Response Data:`, error.response.data);
        }
        // res.status(500).json( error.message);
        res.status(500).json({ error: 'An error occurred while creating token' });
    }
})

router.post('/token/exchange', async (req, res) => {
    const request = {
        public_token: publicToken,
    };

    try {
        const response = await plaidClient.itemPublicTokenExchange(request);
        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;
        console.log(accessToken, itemId)
        res.json({ accessToken, itemId });
    } catch (error) {
        console.error(error.message)

        if (error.response) {
            console.error(`Response Status: ${error.response.status}`);
            console.error(`Response Data:`, error.response.data);
        }
        // res.status(500).json( error.message);
        res.status(500).json({ error: 'An error occurred while exchanging token' });
    }
})

module.exports = router;
