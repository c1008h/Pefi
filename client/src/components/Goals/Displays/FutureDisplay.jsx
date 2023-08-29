import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'; 
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

export default function FutureDisplay({ userData, years }) {
  const [goalsGroup, setGoalsGroup] = useState(userData?.goalsGroup || null)
  const [finance, setFinance] = useState(userData?.financeGroup || null)


  useEffect(() => {
    setGoalsGroup(userData?.goalsGroup || null);
    setFinance(userData?.financeGroup || null);
  }, [userData])
  const digitalGoals = goalsGroup?.map((yearData) => yearData.digital) || [];
  const cashGoals = goalsGroup?.map((yearData) => yearData.cash) || [];
  const investedGoals = goalsGroup?.map((yearData) => yearData.invested) || [];
  const savedGoals = goalsGroup?.map((yearData) => yearData.saved) || [];

  // console.log('user data:', userData.goalsGroup)
  // console.log('goal', goalsGroup)
  // console.log('finance', finance.digital)
  console.log("digitalGoals:", digitalGoals)
  console.log('cashGoals:', cashGoals)
  console.log('investedGoals', investedGoals)
  console.log('savedGoals:', savedGoals)
  ChartJS.register(
    LineElement,
    LineController, 
    CategoryScale, 
    LinearScale,   
    Title,
    PointElement,
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels: years,
    datasets: [
        {
            label: 'Digital Goal',
            data: digitalGoals,
            fill: false,
            borderColor: '#FF4500'
        },
        {
          label: 'Digital Reality',
          data: finance.digital,
          fill: false,
          borderColor: 'blue'
      },

    ]
}

  return (
    <div>
      This is future
      <Line data={data} options={options}/>

    </div>
  )
}

FutureDisplay.propTypes = {
  userData: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
}