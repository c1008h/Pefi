import { useState } from 'react';
import { ExpenseBtn } from '../components/Dashboard/ExpenseBtn.jsx'
import { IncomeBtn } from '../components/Dashboard/IncomeBtn.jsx';
import { CalendarEl } from '../components/Dashboard/Calendar.jsx'
import FinanceDisplay from '../components/Dashboard/FinanceDisplay.jsx'

export const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showIncomeForm, setShowIncomeForm] = useState(false);
  
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

    return (
        <div className='container' style={{flexDirection:'row'}}>
            <h2>Dashboard</h2>
            <div >
                <div style={{display:'flex'}}>
                    <CalendarEl />
                    <FinanceDisplay />
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
                {showExpenseForm && <ExpenseBtn />}            
                {showIncomeForm && <IncomeBtn />}
            </div>     
                      
        </div>
    )
}