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
import { useSelector, useDispatch } from 'react-redux';

// import {}
import { Button } from 'react-bootstrap';
import NetworthLine from '../components/Dashboard/Graphs/NetworthLine.jsx';
import { Loading, PleaseLogin } from '../components/index';
import ButtonTemplate from '../components/Landing/ButtonTemplate.jsx';

export default function Dashboard() {
    const [userData, setUserData] = useState({})
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);
    const [loading, setLoading] = useState(true)
    const { data } = useQuery(QUERY_ME)
    const [value, setValue] = useState(dayjs());

    const [weekButton, setWeekButton] = useState(false)
    const [monthButton, setMonthButton] = useState(true)
    const [yearButton, setYearButton] = useState(false)

    const dispatch = useDispatch(); 

    // const expenses = useSelector((state) => state.finance.expenses);
    // const incomes = useSelector((state) => state.finance.incomes)
console.log(data?.me)
    useEffect(() => {
        if (data) {
          setUserData(data.me)
          setLoading(false)
        //   dispatch(setExpenses(data.me.expenseGroup))
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

    const token = authService.loggedIn() ? authService.getToken() : null;
    if(!token) {
        return <PleaseLogin />
    }
    if(loading) {
        return <Loading />
    }
    return (
        <div className='container' style={{flexDirection:'row'}}>
            {/* <h2>Dashboard</h2> */}
            <div className='row'>
                <div style={{display:'flex', marginTop:'4%'}}>
                    <div style={{flexDirection:'column'}} components={['DateCalendar', 'DateCalendar']} label={'"year", "month" and "day"'}>
                        <FinanceDisplay 
                            userData={userData}
                        />
                        <div>
                            <ButtonTemplate 
                                title="Week"
                                onClick={() => {
                                    setMonthButton(false)
                                    setYearButton(false)
                                    setWeekButton(true)
                                }}
                            />

                            <ButtonTemplate
                                title='Month'
                                onClick= {() => {
                                    setMonthButton(true)
                                    setYearButton(false)
                                    setWeekButton(false)
                                }}
                            />
                            <ButtonTemplate
                                title='Year'
                                onClick= {() => {
                                    setMonthButton(false)
                                    setYearButton(true)
                                    setWeekButton(false)
                                }}
                            />
                        </div>
                        <DateCalendar
                            value={value} 
                            onChange={handleDateChange}
                            onMonthChange={handleMonthChange}
                            views={['year', 'month', 'day']}
                        />
                        {/* <h2>{dayjs(value.$d).format('MM/DD/YYYY')}</h2> */}
                        <div>
                            <ButtonTemplate title='- Expense' onClick={openExpenseForm} btnStyle='navyBtns'/>
                            <ButtonTemplate title='+ Income' onClick={openIncomeForm} btnStyle='navyBtns'/>
                        </div>
                    </div>

                    <div className='row'>


                        <div>
                            {monthButton && <Monthly userData={userData} />}
                            {yearButton && <Yearly userData={userData} />}
                            {weekButton && <Weekly userData={userData} />}   
                        </div>
                        <div>
                            <NetworthLine 
                                userData={userData}
                            />
                        </div>
                    </div>
                </div>
            </div>
           
            <div style={{width:'60%'}}>
                {showExpenseForm && 
                <ExpenseModal 
                    openExpenseForm={openExpenseForm}
                    closeExpenseForm={closeExpenseForm}
                    onDateChange={handleDateChange}
                    onSaveExpense={() => dispatch(setExpenses())}
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
