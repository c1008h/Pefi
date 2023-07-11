import React, { useState } from 'react';

export function ExpenseBtn(showExpenseForm) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [reoccuring, setReoccuring] = useState(false)

  const handleButtonClick = () => {
    setShowPrompt(true);
  };

  const handlePromptClose = () => {
    setShowPrompt(false);
  };

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      {showExpenseForm && (
        <div className="prompt" >
          <h3>Add Expense Details</h3>
          <form style={{display:'flex', flexDirection:'column'}}> 
            <label>
              Expense Amount:
              <input type="number" />
            </label>
            <label>
              Expense Type:
              <input type="text" />
            </label>
            <label>
              Is it a Reoccurring Expense?
              <input type="checkbox" />
            </label>
            {reoccuring && (
              <div>
                <label>
                  Start Date:
                  <input type="date" />
                </label>
                <label>
                  End Date:
                  <input type="date" />
                </label>
              </div>
            )}
            <button type="submit">Add Expense</button>
            <button onClick={handlePromptClose}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
