import { useState, useEffect } from 'react';
import { ExpenseModal } from '../components/Dashboard/ExpenseModal.jsx'
import { IncomeModal } from '../components/Dashboard/IncomeModal.jsx';
// import { CalendarEl } from '../components/Dashboard/Calendar.jsx'
import FinanceDisplay from '../components/Dashboard/FinanceDisplay.jsx'
import Yearly from '../components/Dashboard/Graphs/Yearly.jsx';
import Monthly from '../components/Dashboard/Graphs/Monthly.jsx'
import Weekly from '../components/Dashboard/Graphs/Weekly.jsx'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export const Dashboard = () => {
    const [userData, setUserData] = useState({})
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);
    const [loading, setLoading] = useState(true)
    const { data } = useQuery(QUERY_ME)
    const [value, setValue] = useState(dayjs());

    const [weekButton, setWeekButton] = useState(false)
    const [monthButton, setMonthButton] = useState(true)
    const [yearButton, setYearButton] = useState(false)

    const expenses = useSelector(state => state.expenses);
    console.log('redux:', expenses)
    useEffect(() => {
        if (data) {
          setUserData(data.me)
          setLoading(false)
        }
    }, [data])
    function handleDateChange(newValue) {
        setValue(newValue)
        console.log(dayjs(value.$d).format('MM/DD/YYYY'))
    }
    function handleMonthChange(date) {
        setValue(date);
    }

    const openExpenseForm = () => {
      setShowExpenseForm(true);
    };
    const closeExpenseForm = () => {
        setShowExpenseForm(false)
    }
  
    const openIncomeForm = () => {
      setShowIncomeForm(true);
    };
    const closeIncomeForm = () => {
        setShowIncomeForm(false);
    }

    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   setShowForm(false);
    // };

    const token = authService.loggedIn() ? authService.getToken() : null;
    if(!token) {
        return <h2>Please login first</h2>
    }
    if(loading) {
        return <h2>LOADING...</h2>
    }
    return (
        <div className='container' style={{flexDirection:'row'}}>
            <h2>Dashboard</h2>
            <div >
                <div style={{display:'flex'}}>
                    <div style={{flexDirection:'column'}} components={['DateCalendar', 'DateCalendar']} label={'"year", "month" and "day"'}>
                        <DateCalendar
                            value={value} 
                            onChange={handleDateChange}
                            onMonthChange={handleMonthChange}
                            views={['year', 'month', 'day']}
                        />
                        <h2>{dayjs(value.$d).format('MM/DD/YYYY')}</h2>
                    </div>
                    <FinanceDisplay 
                        userData={userData}
                    />
                    <div>
                        <Button
                            onClick={() => {
                                setMonthButton(false)
                                setYearButton(false)
                                setWeekButton(true)
                            }}
                        >Week</Button>
                        <Button
                            onClick= {() => {
                                setMonthButton(true)
                                setYearButton(false)
                                setWeekButton(false)
                            }}
                        >Month</Button>
                        <Button
                            onClick= {() => {
                                setMonthButton(false)
                                setYearButton(true)
                                setWeekButton(false)
                            }}
                        >Year</Button>

                    </div>
                    {monthButton && <Monthly userData={userData} />}
                    {yearButton && <Yearly userData={userData} />}
                    {weekButton && <Weekly userData={userData} />}                    
                </div>
                <button onClick={openExpenseForm}>Add Expense</button>
                <button onClick={openIncomeForm}>Add Income</button>  
            </div>

            <div style={{width:'60%'}}>
                {showExpenseForm && 
                <ExpenseModal 
                    openExpenseForm={openExpenseForm}
                    closeExpenseForm={closeExpenseForm}
                    onDateChange={handleDateChange}
                    value={value}
                />}            
                {showIncomeForm && 
                <IncomeModal 
                    openIncomeForm={openIncomeForm}
                    closeIncomeForm={closeIncomeForm}
                    onDateChange={handleDateChange}
                    value={value}
                />}
            </div>              
        </div>
    )
}
