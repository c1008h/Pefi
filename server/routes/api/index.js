const router = require('express').Router
const userRoutes = require('./user-routes')
const goalRoutes = require('./goal-routes')
const incomeRoutes = require('./income-routes')
const expenseRoutes = require('./expense-routes')

router.use('/users', userRoutes)
router.use('/goals', goalRoutes)
router.use('/income', incomeRoutes)
router.use('/expense', expenseRoutes)

module.exports = router;