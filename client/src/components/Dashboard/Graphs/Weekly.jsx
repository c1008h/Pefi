import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";
import PropTypes from 'prop-types'; 
import { daysWeek } from '../../../constants/date_data'
export default function Weekly({ userData }) {
  const [dailyIncome, setDailyIncome] = useState([])
  const [dailyExpense, setDailyExpense] = useState([])
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const currentDate = dayjs();
    const currentWeekStart = currentDate.startOf('week'); 
    const currentWeekEnd = currentDate.endOf('week'); 
    const weekDates = [];
    const incomesByDay = Array(7).fill(0);
    const expensesByDay = Array(7).fill(0);

    // for (let i = currentWeekStart.date(); i <= currentWeekEnd.date(); i++) {
    //   weekDates.push(currentWeekStart.date(i).toDate());
    // }
    for (let i = 0; i < 7; i++) {
      const day = currentWeekStart.add(i, 'day');
      // weekDates.push(day.format('ddd MMM D YYYY'));
      weekDates.push(day.format('ddd, D'));

    }

    userData.incomesGroup.forEach((income) => {
      const incomeDate = dayjs(income.date, 'MM/DD/YYYY');
      const dayIndex = incomeDate.diff(currentWeekStart, 'day');
      if (dayIndex >= 0 && dayIndex < 7) {
        incomesByDay[dayIndex] += income.amount;
      }
    });

    userData.expensesGroup.forEach((expense) => {
      const expenseDate = dayjs(expense.date, 'MM/DD/YYYY');
      const dayIndex = expenseDate.diff(currentWeekStart, 'day');
      if (dayIndex >= 0 && dayIndex < 7) {
        expensesByDay[dayIndex] += expense.amount;
      }
    });
    console.log(weekDates)
    // const dateString = weekDates
    // const [day, date] = dateString.split('.');
    // console.log('date,', date)
    setWeekDates(weekDates);
    setDailyIncome(incomesByDay);
    setDailyExpense(expensesByDay);

  }, [userData])

// console.log(weekDates)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
        title: {
            display: true, text: 'daily'
        },
        legend: {
            display: false
        }
    },
    interaction: {
        mode: 'index',
        intersect: false
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    }
  }
  const data = {
    labels: weekDates,
    datasets: [
        {
            label:'Income', 
            data: dailyIncome,
            backgroundColor:'blue',
            stack: 'stackGroup1'
        },
        {
            label:'Expense',
            data: dailyExpense,
            backgroundColor:'red',
            stack: 'stackGroup2'
        }
    ]
  }

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  )
}

Weekly.propTypes = {
  userData: PropTypes.object.isRequired
}