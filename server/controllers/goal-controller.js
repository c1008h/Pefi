const { Goal, User } = require('../models')

const goalController = {
    async getGoals(req, res) {
        try {
            const dbFinanceData = await Goal.find()
            .sort({ created: -1 })

            res.json(dbFinanceData)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    async getSingleGoal(req, res) {
        try {
            const dbFinanceData = await Goal.findOne({ _id: req.params._id})

            if (!dbFinanceData) {
                return res.status(404).json({ message: 'No goal found with this ID!'})
            }

            res.json(dbFinanceData)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    async createGoal(req, res) {
        try {
            const dbFinanceData = await Goal.create(req.body)

            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $push: { goals: dbFinanceData._id }},
                { new: true }
            )

            if (!dbUserData) {
                return res.status(404).json({ message: 'Goal created but no user with this id!'})
            }

            res.json({ message: 'goal successfully created!' })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async updateGoal(req, res) {
        const dbFinanceData = await Goal.findOneAndUpdate({ _id: req.params.goalId }, { $set: req.body }, { runValidators: true, new: true })

        if (!dbFinanceData) {
            return res.status(404).json({ message: 'No goal with this id!'})
        }

        res.json(dbFinanceData)

        console.log(err);
        res.status(500).json(err);
    },
    async deleteGoal(req, res) {
        try {
            const dbFinanceData = await Goal.findOneAndRemove({ _id: req.params.goalId })

            if (!dbFinanceData) {
                return res.status(404).json({ message: 'No goal found with this id!'})
            }

            const dbUserData = User.findOneAndUpdate(
                { goals: req.params.goalId},
                { $pull: { goals: req.params.goalId } },
                { new: true }
            )

            if (!dbUserData) {
                return res.status(404).json({ message: 'Goal removed but no user ID'})
            }
            res.json({ message: 'Goal successfully deleted!'})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = goalController