import { useCallback } from 'react';
import dayjs from 'dayjs'

const currentMonth = dayjs().month() + 1;
const currentYear = dayjs().year();

export const calculateMonthlyExpense = useCallback((expensesGroup) => {
    let totalExpense = 0;

    for(let i = 0; i < expensesGroup.length; i++) {
      let dateStr = expensesGroup[i].date
      // console.log('expense date', dateStr)
      if (dateStr){
        const [month, day, year] = dateStr.split('/')

        if (Number(month) === currentMonth && Number(year) === currentYear) {
          // console.log('add to expense')
          totalExpense += expensesGroup[i].amount;
        }
      }
    }
    return totalExpense
  }, [currentMonth, currentYear])

export const calculateMonthlyIncome = useCallback((incomesGroup) => {
    let totalIncome = 0;

    for (let i =0; i < incomesGroup.length; i++) {
        let dateStr = incomesGroup[i].date
        // console.log('income date:', dateStr)
        if(dateStr) {
        const [month, day, year] = dateStr.split('/')

        if (Number(month) === currentMonth && Number(year) === currentYear) {
            // console.log('add to income')
            totalIncome += incomesGroup[i].amount;
        }
        }
    }
    return totalIncome
}, [currentMonth, currentYear])