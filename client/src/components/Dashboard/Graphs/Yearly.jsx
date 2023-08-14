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
import {faker} from '@faker-js/faker';
import { Bar, Line } from "react-chartjs-2";
import PropTypes from 'prop-types'; 
import { allMonths } from '../../../constants/date_data'

export default function Yearly({ userData }) {
    const [monthlyIncome, setMonthlyIncome] = useState([])
    const [monthlyExpense, setMonthlyExpense] = useState([])
    const [monthlyNet, setMonthlyNet] = useState([])

    // const currentMonth = dayjs().month() + 1;
    const currentYear = dayjs().year();
  
    useEffect(() => {
        const incomeGroups = userData.incomesGroup || [];
        const expenseGroups = userData.expensesGroup || [];

        const monthlyIncomeArray = Array.from({ length: 12 }, () => 0);
        const monthlyExpenseArray = Array.from({ length: 12 }, () => 0);
    
        incomeGroups.forEach(incomeEntry => {
            // Extract year and month from date string
            const [month, day, year] = incomeEntry.date.split('/');
            
            if (Number(year) === currentYear) {
                monthlyIncomeArray[Number(month) - 1] += incomeEntry.amount;
            }
        });
    
        expenseGroups.forEach(expenseEntry => {
            // Extract year and month from date string
            const [month, day, year] = expenseEntry.date.split('/');
            
            if (Number(year) === currentYear) {
                monthlyExpenseArray[Number(month) - 1] += expenseEntry.amount;
            }
        });
        // const subtractedArray = monthlyIncomeArray.map((income, index) => income - monthlyExpenseArray[index]);

        setMonthlyIncome(monthlyIncomeArray);
        setMonthlyExpense(monthlyExpenseArray);
        // setMonthlyNet(subtractedArray)
    }, [ currentYear, userData.incomesGroup, userData.expensesGroup ])
    console.log('monthly expenses array:', monthlyExpense)
    console.log('monthly incomes array:', monthlyIncome)

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
                display: true, text:'monthly'
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
        labels: allMonths,
        datasets: [
            {
                label:'Income', 
                // data: allMonths.map(() => faker.datatype({ min: -1000, max: 1000 })),
                data: monthlyIncome,
                backgroundColor:'blue',
                stack: 'stackGroup1'
                // stack: monthlyIncome
            },
            {
                label:'Expense',
                // data: allMonths.map(() => faker.datatype({  min: -1000, max: 1000})),
                data: monthlyExpense,
                backgroundColor:'red',
                stack: 'stackGroup1'
            }
        ]
    }
    return (
        <div>
            <h1>Yearly Graph</h1>
            {/* <h2>{monthlyIncome}</h2> */}
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

Yearly.propTypes = {
    userData: PropTypes.object.isRequired
}