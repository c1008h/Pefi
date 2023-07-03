const { Income, User } = require('../models')

const incomeController = {
    async getIncomes(req, res) {
        try {
            const dbFinanceData = await Income.find()
            .sort({ created: -1 })

            res.json(dbFinanceData)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    async getSingleIncome(req, res) {
        try {
            const dbFinanceData = await Income.findOne({ _id: req.params._id})

            if (!dbFinanceData) {
                return res.status(404).json({ message: 'No income found with this ID!'})
            }

            res.json(dbFinanceData)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
    async createIncome(req, res) {
        try {
            const dbFinanceData = await Income.create(req.body)

            const dbUserData = await User.findOneAndUpdate(
                { _id: req.body.userId},
                { $push: { incomes: dbFinanceData._id }},
                { new: true }
            )

            if (!dbUserData) {
                return res.status(404).json({ message: 'Income created but no user with this id!'})
            }

            res.json({ message: 'Income successfully created!' })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async updateIncome(req, res) {
        const dbFinanceData = await Income.findOneAndUpdate({ _id: req.params.incomeId }, { $set: req.body }, { runValidators: true, new: true })

        if (!dbFinanceData) {
            return res.status(404).json({ message: 'No income with this id!'})
        }

        res.json(dbFinanceData)

        console.log(err);
        res.status(500).json(err);
    },
    async deleteIncome(req, res) {
        try {
            const dbFinanceData = await Income.findOneAndRemove({ _id: req.params.incomeId })

            if (!dbFinanceData) {
                return res.status(404).json({ message: 'No income found with this id!'})
            }

            const dbUserData = User.findOneAndUpdate(
                { incomes: req.params.incomeId},
                { $pull: { incomes: req.params.incomeId } },
                { new: true }
            )

            if (!dbUserData) {
                return res.status(404).json({ message: 'Income removed but no user ID'})
            }
            res.json({ message: 'Income successfully deleted!'})
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = incomeController