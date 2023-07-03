const router = require('express').Router();
const {
    getIncomes,
    getSingleIncome,
    createIncome,
    updateIncome,
    deleteIncome
} = require('../../controllers/income-controller');

// /api/incomes
router.route('/').get(getIncomes).post(createIncome);

// /api/thoughts/:incomeId
router.route('/:incomeId').get(getSingleIncome).put(updateIncome).delete(deleteIncome);

module.exports = router;