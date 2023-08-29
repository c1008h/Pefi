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

export default function PreviousDisplay({ userData, years}) {
  const [goalsGroup, setGoalsGroup] = useState(userData?.goalsGroup || null)
  const [finance, setFinance] = useState(userData?.financeGroup || null)

  useEffect(() => {
    setGoalsGroup(userData?.goalsGroup || null);
    setFinance(userData?.financeGroup || null);
  }, [userData])

  return (
    <div>
      This is previous
    </div>
  )
}

PreviousDisplay.propTypes = {
  userData: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
}