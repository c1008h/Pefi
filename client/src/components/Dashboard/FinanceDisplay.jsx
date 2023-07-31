import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

export default function FinanceDisplay({userData}) {
  const [networth, setNetworth] = useState()
  const [monthlyIncome, setMonthlyIncome] = useState()
  const [monthlyExpense, setMonthlyExpense] = useState()

  useEffect(() => {
    let digital = parseFloat(userData.financeGroup[0].digital)
    let cash = parseFloat(userData.financeGroup[0].cash)
    let saved = parseFloat(userData.financeGroup[0].saved)
    let invested = parseFloat(userData.financeGroup[0].invested)

    setNetworth((digital + cash + saved + invested).toLocaleString())
  }, [userData])

  // console.log(userData.financeGroup[0])

  return (
    <div>
        <h5>Net Worth: ${networth}</h5>
        <h5>Monthly Income:</h5>
        <h5>Monthly Expense:</h5>

    </div>
  )
}

FinanceDisplay.propTypes = {
  userData: PropTypes.object.isRequired
}