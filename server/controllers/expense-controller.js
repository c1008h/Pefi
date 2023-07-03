const { Expense, User } = require('../models')

const expenseController = {
    async getExpenses(req, res) {
        try {
            const dbFinanceData = await Expense.find()
            .sort({ created: -1 })

            res.json(dbFinanceData)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    async getSingleExpense(req, res) {
        try {
            const dbFinanceData = await Expense.findOne({ _id: req.params._id})

            if (!dbFinanceData) {
                return res.status(404).json({ message: 'No expense found with this ID!'})
            }

            res.json(dbFinanceData)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    async createExpense(req, res) {
        try {
            const dbFinanceData = await Expense.create(req.body)

            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $push: { expenses: dbFinanceData._id }},
                { new: true }
            )

            if (!dbUserData) {
                return res.status(404).json({ message: 'Expense created but no user with this id!'})
            }

            res.json({ message: 'Expense successfully created!' })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async updateExpense(req, res) {
        const dbFinanceData = await Expense.findOneAndUpdate({ _id: req.params.expenseId }, { $set: req.body }, { runValidators: true, new: true })

        if (!dbFinanceData) {
            return res.status(404).json({ message: 'No expense with this id!'})
        }

        res.json(dbFinanceData)

        console.log(err);
        res.status(500).json(err);
    },
    async deleteExpense(req, res) {
        try {
            const dbFinanceData = await Expense.findOneAndRemove({ _id: req.params.expenseId })

            if (!dbFinanceData) {
                return res.status(404).json({ message: 'No expense found with this id!'})
            }

            const dbUserData = User.findOneAndUpdate(
                { expenses: req.params.expenseId},
                { $pull: { expenses: req.params.expenseId } },
                { new: true }
            )

            if (!dbUserData) {
                return res.status(404).json({ message: 'Expense removed but no user ID'})
            }
            res.json({ message: 'Expense successfully deleted!'})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = expenseController