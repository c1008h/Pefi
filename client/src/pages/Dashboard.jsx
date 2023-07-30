import { useState, useEffect } from 'react';
import { ExpenseBtn } from '../components/Dashboard/ExpenseBtn.jsx'
import { IncomeBtn } from '../components/Dashboard/IncomeBtn.jsx';
import { CalendarEl } from '../components/Dashboard/Calendar.jsx'
import FinanceDisplay from '../components/Dashboard/FinanceDisplay.jsx'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';

export const Dashboard = () => {
    const [userData, setUserData] = useState({})
    const [showForm, setShowForm] = useState(false);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);
    const [loading, setLoading] = useState(true)
    const { data } = useQuery(QUERY_ME)

    useEffect(() => {
        if (data) {
          setUserData(data.me)
          setLoading(false)
        }
    }, [data])

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
                    <CalendarEl 
                        userData={userData}
                    />
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
                />}            
                {showIncomeForm && 
                <IncomeBtn 

                />}
            </div>     
                      
        </div>
    )
}
