const router = require('express').Router()
const { PlaidApi } = require('plaid'); 
const { configuration } = require('../../utils/plaid-utils')

require('dotenv').config({path: __dirname+'../../../env'});

const plaidClient = new PlaidApi(configuration);

router.post('/', async (req, res) => {
    const { count, offset, query } = req.body;

    const request = {
        count: 500 || count,
        offset: offset || 0,
        country_codes: ['US'],
        ...(query && { query })
    };

    try {
        const response = await plaidClient.institutionsGet(request);
        const institutions = response.data.institutions;

        // console.log(response)
        // console.log(institutions)
        res.json({ institutions });
    } catch (error) {
        console.error(error.message)

        if (error.response) {
            console.error(`GET Response Status: ${error.response.status}`);
            console.error(`GET Response Data:`, error.response.data);
        }
        // res.status(500).json( error.message);

        res.status(500).json({ error: 'An error occurred while fetching institutions' });
    }
})

router.post('/search', async (req, res) => {
    const { query } = req.body

    const request = {
        query: query,
        products: ['transactions'],
        country_codes: ["US"],
    }
    try {
        const response = await plaidClient.institutionsSearch(request)
        const institutions = response.data.institutions

        res.json({ institutions })
    } catch (err) {
        if (err.response) {
            console.error(`Search Response Status: ${err.response.status}`);
            console.error(`Search Response Data:`, err.response.data);
        }

        console.error("Error while searching for institutions:", err);
        res.status(500).json({ error: 'An error occurred while searching for institutions' });
    }
})

module.exports = router;
