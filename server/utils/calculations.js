const { Incomes, Expenses, Networth } = require('../models/index')

const calculateNetWorthForUser = async (userId) => {
    const income = await queryIncomeForUser(userId);
    const expenses = await queryExpensesForUser(userId);
  
    // Calculate the net worth
    const digital = calculateDigitalNetWorth(income, expenses);
    const cash = calculateCashNetWorth(income, expenses);
    const invested = calculateInvestedNetWorth(income, expenses);
    const saved = calculateSavedNetWorth(income, expenses);
  
    return { digital, cash, invested, saved };
}

const queryIncomeForUser = async (userId) => {
    const incomeData = await Incomes.find({ userId: userId });
    return incomeData;
};
  
const queryExpensesForUser = async (userId) => {
    const expenseData = await Expenses.find({ userId: userId });
    return expenseData;  
};

const queryNetworthForUser = async (userId) => {
    const networthData = await Networth.find({ userId: userId });
    return networthData;
}

const calculateNetworth = async (networthData) => {
    
}

module.exports = {
    calculateNetWorthForUser,
};