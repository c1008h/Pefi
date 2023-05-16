import React, { useState } from 'react';
import Calendar from 'react-calendar'
import { ExpenseBtn } from '../components/ExpenseBtn'
import { IncomeBtn } from '../components/IncomeBtn';
export const Dashboard = () => {
    const [date, setDate] = useState(new Date());
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

    const onDateChange = (date) => {
        setDate(date);
      };
    
      const onTileClick = (date) => {
        setDate(date);
        setShowForm(true);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: handle form submission
        setShowForm(false);
      };
    return (
        <div className='container' style={{flexDirection:'row'}}>
            <h2>Dashboard</h2>
            <div >
                <Calendar
                    onChange={onDateChange}
                    value={date}
                    onClickDay={onTileClick}
                />
                <button
                    onClick={openExpenseForm}
                    showExpenseForm={showExpenseForm} >
                        Add Expense
                </button>
                <button 
                    onClick={openIncomeForm}
                    showIncomeForm={showIncomeForm}>
                        Add Income
                </button>  
            </div>

            <div style={{}}>
                {showExpenseForm && <ExpenseBtn />}            
                {showIncomeForm && <IncomeBtn />}
            </div>     
            
            <h5>Net Worth</h5>
          
        </div>
    )
}