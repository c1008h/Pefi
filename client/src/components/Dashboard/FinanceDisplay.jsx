import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

export default function FinanceDisplay({userData}) {
  const [networth, setNetworth] = useState()
  const [monthlyIncome, setMonthlyIncome] = useState()
  const [monthlyExpense, setMonthlyExpense] = useState()
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Note: getMonth() returns 0-based index, so add 1


  // console.log('income:', userData.incomesGroup)
  // console.log('expense:', userData.expensesGroup)
  let incomeGroups = userData.incomesGroup
  let expenseGroups = userData.expensesGroup
console.log(expenseGroups)
  useEffect(() => {
    let digital = parseFloat(userData.financeGroup[0].digital)
    let cash = parseFloat(userData.financeGroup[0].cash)
    let saved = parseFloat(userData.financeGroup[0].saved)
    let invested = parseFloat(userData.financeGroup[0].invested)
    const incomeGroups = userData.incomesGroup || [];
    const expenseGroups = userData.expensesGroup || [];

    const monthlyExpense = calculateMonthlyExpense(expenseGroups);

    setNetworth((digital + cash + saved + invested).toLocaleString())
    setMonthlyExpense(monthlyExpense);
  }, [userData])

  // console.log(userData.financeGroup[0])
  function calculateMonthlyExpense(expenseGroups) {
    let totalMonthlyExpense = 0;

    expenseGroups.forEach((expense) => {
      if (!expenseGroups || !Array.isArray(expenseGroups)) {
        return 0;
      }
      const [month, day, year] = expense.date.split('/');
      const expenseYear = parseInt(year, 10);
      const expenseMonth = parseInt(month, 10);

        if (expenseYear === currentYear && expenseMonth === currentMonth) {
          if (expense.frequency === 'monthly') {
            const amount = parseFloat(expense.amount);
            if (!isNaN(amount)) {
              totalMonthlyExpense += amount;
            }
          }
        }
    });

    // setMonthlyExpense(totalMonthlyExpense)
    return totalMonthlyExpense
  }

  function calculateMonthlyIncome() {

  }
  return (
    <div>
        <h5>Net Worth: ${networth}</h5>
        <h5>Monthly Income:</h5>
        <h5>Monthly Expense: ${monthlyExpense}</h5>

    </div>
  )
}

FinanceDisplay.propTypes = {
  userData: PropTypes.object.isRequired
}