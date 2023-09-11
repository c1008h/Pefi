const router = require('express').Router();

const institutionsRoutes = require('./institute')
const linkRoutes = require('./link')
const plaidRoutes = require('./plaid')

router.use('/institutions', institutionsRoutes)
router.use('/link', linkRoutes)
router.use('/plaid', plaidRoutes)

module.exports = router;