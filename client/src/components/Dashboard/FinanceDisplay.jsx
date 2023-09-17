import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'; 
import dayjs from 'dayjs'

export default function FinanceDisplay({userData}) {
  const [networth, setNetworth] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [monthlyExpense, setMonthlyExpense] = useState(0)
  const currentMonth = dayjs().month() + 1;
  const currentYear = dayjs().year();

  console.log(userData.expensesGroup)

  const calculateMonthlyExpense = useCallback((expensesGroup) => {
    let totalExpense = 0;

    for(let i = 0; i < expensesGroup.length; i++) {
      let dateStr = expensesGroup[i].date
      // console.log('expense date', dateStr)
      if (dateStr){
        const [month, day, year] = dateStr.split(' ')
        console.log('Parsed date:', month, day, year); // Add this line for debugging

        if (Number(month) === currentMonth && Number(year) === currentYear) {
          // console.log('add to expense')
          console.log("Expense amount:", expensesGroup[i].amount);
          totalExpense += expensesGroup[i].amount;
        }
      }
    }
    return totalExpense
  }, [currentMonth, currentYear])

  const calculateMonthlyIncome = useCallback((incomesGroup) => {
    let totalIncome = 0;

    for (let i =0; i < incomesGroup.length; i++) {
      let dateStr = incomesGroup[i].date
      // console.log('income date:', dateStr)
      if(dateStr) {
        const [month, day, year] = dateStr.split('-')

        if (Number(month) === currentMonth && Number(year) === currentYear) {
          // console.log('add to income')
          totalIncome += incomesGroup[i].amount;
        }
      }
    }
    return totalIncome
  }, [currentMonth, currentYear])

  useEffect(() => {
    if (userData?.financeGroup) {

      let digital = parseFloat(userData.financeGroup.digital || 0)
      let cash = parseFloat(userData.financeGroup.cash || 0)
      let saved = parseFloat(userData.financeGroup.saved || 0)
      let invested = parseFloat(userData.financeGroup.invested || 0)
      const incomeGroups = userData.incomesGroup || [];
      const expenseGroups = userData.expensesGroup || [];

      const monthlyIncome = calculateMonthlyIncome(incomeGroups)
      const monthlyExpense = calculateMonthlyExpense(expenseGroups);

      setNetworth((digital + cash + saved + invested).toLocaleString())
      setMonthlyIncome(monthlyIncome)
      setMonthlyExpense(monthlyExpense);
    }

  }, [calculateMonthlyExpense, calculateMonthlyIncome, userData?.financeGroup?.digital, userData?.financeGroup?.cash, userData?.financeGroup?.saved, userData?.financeGroup?.invested, userData?.incomesGroup, userData?.expensesGroup])

  console.log(monthlyExpense)
  
  return (
    <div>
      <h3 style={{fontWeight:'bold'}}>{dayjs().format('MMM')} {dayjs().format('YYYY')}</h3>
      <h5>Net Worth: ${networth}</h5>
      <h5>Monthly Income: ${monthlyIncome}</h5>
      <h5>Monthly Expense: ${monthlyExpense}</h5>
    </div>
  )
}

FinanceDisplay.propTypes = {
  userData: PropTypes.object.isRequired
}