const router = require('express').Router();
const {
    getExpenses,
    getSingleExpense,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../../controllers/expense-controller');

// /api/expense
router.route('/').get(getExpenses).post(createExpense);

// /api/thoughts/:expenseId
router.route('/:expenseId').get(getSingleExpense).put(updateExpense).delete(deleteExpense);

module.exports = router;