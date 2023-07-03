const router = require('express').Router();
const {
    getGoals,
    getSingleGoal,
    createGoal,
    updateGoal,
    deleteGoal
} = require('../../controllers/goal-controller');

// /api/expense
router.route('/').get(getGoals).post(createGoal);

// /api/thoughts/:goalId
router.route('/:goalId').get(getSingleGoal).put(updateGoal).delete(deleteGoal);

module.exports = router;