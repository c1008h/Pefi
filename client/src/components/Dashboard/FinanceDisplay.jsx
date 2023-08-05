import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import dayjs from 'dayjs'
export default function FinanceDisplay({userData}) {
  const [networth, setNetworth] = useState()
  const [monthlyIncome, setMonthlyIncome] = useState()
  const [monthlyExpense, setMonthlyExpense] = useState(0)
  const currentMonth = dayjs().month() + 1;
  const currentYear = dayjs().year();

console.log(userData)

  useEffect(() => {
    let digital = parseFloat(userData.financeGroup[0].digital)
    let cash = parseFloat(userData.financeGroup[0].cash)
    let saved = parseFloat(userData.financeGroup[0].saved)
    let invested = parseFloat(userData.financeGroup[0].invested)
    const incomeGroups = userData.incomesGroup || [];
    const expenseGroups = userData.expensesGroup || [];

    const monthlyIncome = calculateMonthlyIncome(incomeGroups)
    const monthlyExpense = calculateMonthlyExpense(expenseGroups);

    setNetworth((digital + cash + saved + invested).toLocaleString())
    setMonthlyIncome(monthlyIncome)
    setMonthlyExpense(monthlyExpense);
  }, [userData])

  // console.log(userData.financeGroup[0])
  function calculateMonthlyExpense(expensesGroup) {
    let totalExpense = 0;

    for(let i = 0; i < expensesGroup.length; i++) {
      let dateStr = expensesGroup[i].date
      const [month, day, year] = dateStr.split('/')

      if (Number(month) === currentMonth && Number(year) === currentYear) {
        console.log('add to expense')
        totalExpense += parseFloat(expensesGroup[i].amount);
      }
    }
    return totalExpense
  }

  function calculateMonthlyIncome(incomesGroup) {
    let totalIncome = 0;

    for (let i =0; i < incomesGroup.length; i++) {
      let dateStr = incomesGroup[i].date
      const [month, day, year] = dateStr.split('/')

      if (Number(month) === currentMonth && Number(year) === currentYear) {
        console.log('add to income')
        totalIncome += parseFloat(incomesGroup[i].amount);
      }
    }
    return totalIncome
  }
  return (
    <div>
        <h5>Net Worth: ${networth}</h5>
        <h5>Monthly Income: ${monthlyIncome}</h5>
        <h5>Monthly Expense: ${monthlyExpense}</h5>

    </div>
  )
}

FinanceDisplay.propTypes = {
  userData: PropTypes.object.isRequired
}