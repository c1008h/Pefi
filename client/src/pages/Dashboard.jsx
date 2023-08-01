import { useState, useEffect } from 'react';
import { ExpenseBtn } from '../components/Dashboard/ExpenseBtn.jsx'
import { IncomeBtn } from '../components/Dashboard/IncomeBtn.jsx';
// import { CalendarEl } from '../components/Dashboard/Calendar.jsx'
import FinanceDisplay from '../components/Dashboard/FinanceDisplay.jsx'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';
import dayjs from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers';

export const Dashboard = () => {
    const [userData, setUserData] = useState({})
    const [showForm, setShowForm] = useState(false);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);
    const [loading, setLoading] = useState(true)
    const { data } = useQuery(QUERY_ME)
    const [value, setValue] = useState(dayjs());
//    console.log(value.format('MM/DD/YYYY'))
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
    // console.log(userData)

    const openExpenseForm = () => {
      setShowExpenseForm(true);
      setShowIncomeForm(false);
    };
  
    const openIncomeForm = () => {
      setShowIncomeForm(true);
      setShowExpenseForm(false);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      setShowForm(false);
    };

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
                </div>
                <button
                    onClick={openExpenseForm}
                    // showExpenseForm={showExpenseForm} 
                    >
                        Add Expense
                </button>
                <button 
                    onClick={openIncomeForm}
                    // showIncomeForm={showIncomeForm}
                    >
                        Add Income
                </button>  
            </div>

            <div style={{width:'60%'}}>
                {showExpenseForm && 
                <ExpenseBtn 
                    showExpenseForm={showExpenseForm}
                    onDateChange={handleDateChange}
                    value={value}
                />}            
                {showIncomeForm && 
                <IncomeBtn 
                    showIncomeForm={showIncomeForm}
                    onDateChange={handleDateChange}
                    value={value}
                />}
            </div>     
                      
        </div>
    )
}
