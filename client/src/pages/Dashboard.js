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
        <>
            <h2>Dashboard</h2>
            <Calendar
                onChange={onDateChange}
                value={date}
                onClickDay={onTileClick}
            />
            <ExpenseBtn 
                onClick={openExpenseForm}
                showExpenseForm={showExpenseForm}
            />
            <IncomeBtn 
                onClick={openIncomeForm}
                showIncomeForm={showIncomeForm}
            />
            {/* {showExpenseForm && <ExpenseForm />}
      {showIncomeForm && <IncomeForm />} */}
            {/* {showForm && (
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" />
                    <button type="submit">Add</button>
                </form>
            </div> */}
        {/* )} */}
        </>
    )
}