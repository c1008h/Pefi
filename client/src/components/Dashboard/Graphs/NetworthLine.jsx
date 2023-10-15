import {useState, useEffect} from 'react'
import { Line } from "react-chartjs-2";
import {     
    Chart as ChartJS,
    LineController, 
    CategoryScale, 
    LinearScale, 
    Title,
    PointElement,
    LineElement
} from 'chart.js';
import PropTypes from 'prop-types'; 
import { allMonths } from '../../../constants/date_data'
import dayjs from 'dayjs';

export default function NetworthLine({ userData }) {
    const [currentYearNet, setCurrentYearNet] = useState([])
    const [monthlyNetworth, setMonthlyNetworth] = useState(Array(12).fill(0));
    // console.log(userData)
    
    useEffect(() => {
        const currentDate = dayjs();
        const currentMonth = currentDate.format('M'); 
        const currentYear = currentDate.format('YYYY')

        console.log(currentMonth)
        console.log(currentYear)

        if (userData) {    
            const incomeGroups = userData.incomesGroup || [];
            const expenseGroups = userData.expensesGroup || [];

            const networthByMonth = Array(12).fill(0);

            incomeGroups.forEach(incomeEntry => {
                const [month, day, year] = incomeEntry.date.split('-');
                networthByMonth[Number(month) - 1] += incomeEntry.amount;
            })
            expenseGroups.forEach(expenseEntry => {
                const [month, day, year] = expenseEntry.date.split('-');
                networthByMonth[Number(month) - 1] -= expenseEntry.amount;
            });

            setMonthlyNetworth(networthByMonth)
        }
    }, [userData.incomesGroup, userData.expensesGroup]);

    ChartJS.register(
        LineElement,
        LineController, 
        CategoryScale, 
        LinearScale,   
        Title,
        PointElement,
    );
    const data = {
        labels: allMonths,
        datasets: [
            {
                label: 'Net Worth',
                data: monthlyNetworth,
                fill: false,
                borderColor: '#FF4500'
            }
        ]
    }

    return (
        <div style={{paddingBottom:'10%'}}>
            <Line data={data} />
        </div>
    )
}

NetworthLine.propTypes = {
    userData: PropTypes.object.isRequired
}