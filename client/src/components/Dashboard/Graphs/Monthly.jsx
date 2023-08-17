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

export default function Monthly({ userData }) {
    const [weeklyIncome, setWeeklyIncome] = useState([])
    const [weeklyExpense, setWeeklyExpense] = useState([])
    const currentYear = dayjs().year();
    const currentMonth = dayjs().format('MMMM')

    useEffect(() => {
        const incomeGroups = userData.incomesGroup || [];
        const expenseGroups = userData.expensesGroup || [];

        const startOfMonth = dayjs().startOf('month');
        const endOfMonth = dayjs().endOf('month');

        const weeksInMonth = Math.ceil(endOfMonth.diff(startOfMonth, 'week', true));
        const weeklyIncomeArray = Array.from({ length: weeksInMonth }, () => 0);
        const weeklyExpenseArray = Array.from({ length: weeksInMonth }, () => 0);

        incomeGroups.forEach(incomeEntry => {
            const entryDate = dayjs(incomeEntry.date, 'MM/DD/YYYY'); 
            if (entryDate.isBetween(startOfMonth, endOfMonth, null, '[]')) {
                const weekNumber = entryDate.week() - startOfMonth.week() + 1;
                weeklyIncomeArray[weekNumber - 1] += incomeEntry.amount;
            }
        });

        expenseGroups.forEach(expenseEntry => {
            const entryDate = dayjs(expenseEntry.date, 'MM/DD/YYYY');
            if (entryDate.isBetween(startOfMonth, endOfMonth, null, '[]')) {
                const weekNumber = entryDate.week() - startOfMonth.week() + 1;
                weeklyExpenseArray[weekNumber - 1] += expenseEntry.amount;
            }
        });

        setWeeklyIncome(weeklyIncomeArray);
        setWeeklyExpense(weeklyExpenseArray);
    }, [currentYear, userData.incomesGroup, userData.expensesGroup]);

    const weekDateRanges = [];
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');

    let startOfWeek = startOfMonth;
    while (startOfWeek.isBefore(endOfMonth)) {
        const endOfWeek = startOfWeek.add(6, 'day').isBefore(endOfMonth)
            ? startOfWeek.add(6, 'day')
            : endOfMonth;
        weekDateRanges.push(`${startOfWeek.format('D')}-${endOfWeek.format('D')}`);
        startOfWeek = startOfWeek.add(7, 'day');
    }
    // const filteredWeeklyIncome = weeklyIncome.slice(0, weekDateRanges.length);
    // const filteredWeeklyExpense = weeklyExpense.slice(0, weekDateRanges.length);
    // console.log('weekly expenses array:', weeklyExpense)
    // console.log('weekly incomes array:', weeklyIncome)
    
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
                display: true, text: currentMonth
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
        labels: weekDateRanges,
        datasets: [
            {
                label:'Income', 
                data: weeklyIncome,
                backgroundColor:'rgba(0, 51, 102, 0.6)',
                stack: 'stackGroup1'
            },
            {
                label:'Expense',
                data: weeklyExpense,
                backgroundColor:'rgba(255, 165, 0, 0.6)',
                stack: 'stackGroup2'
            }
        ]
    }
    return (
        <div>
            <Bar options={options} data={data} />
            {/* <Line 
                data={monthlyNet}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Networth Growth'
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            /> */}
        </div>
    )
}

Monthly.propTypes = {
    userData: PropTypes.object.isRequired
}