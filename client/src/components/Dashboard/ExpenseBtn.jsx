import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { CREATE_EXPENSE } from '../../utils/mutations';
import PropTypes from 'prop-types'; // Import PropTypes
import Select from 'react-select'
import {genreList, frequencyOptions, moneyType} from '../../constants/genres'
export function ExpenseBtn({ onDateChange, showExpenseForm, value }) {
  const [amount, setAmount] = useState()
  const [frequency, setFrequency] = useState()
  const [category, setCategory] = useState()
  const [date, setDate] = useState(value.format('MM/DD/YYYY'))
  const [type, setType] = useState()
  // const [showPrompt, setShowPrompt] = useState(false);
  const [reoccuring, setReoccuring] = useState(false)
  const [createExpense] = useMutation(CREATE_EXPENSE)

  console.log(date)
  // const handleDateChange = (newValue) => {
  //   setDate(newValue);
  //   onDateChange(newValue); // Call the callback function to update the date in Dashboard
  // };

  const handlePromptClose = () => {
    setShowPrompt(false);
  };
  const handleSaveExpense = async (amount, frequency, category, type, date) => {
    console.log('Inputting expense:', amount, frequency, category, type, date)

    try {
      await createExpense({
        variables: { input: {
          amount: parseFloat(amount.trim()),
          frequency: frequency,
          category: category,
          type: type,
          date: date,
        }}
      })

      if(createExpense.error) { throw new Error('Something went wrong with creating expense.')}
      window.location.reload();

    } catch (error) {
      console.log("Error:", error)
    }
  }
  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      {showExpenseForm && (
        <div className="prompt" >
          <h3>Add Expense Details</h3>
          <Form 
            style={{display:'flex', flexDirection:'column'}} 
            onSubmit={(e) => {
              e.preventDefault()
              handleSaveExpense(amount, frequency, category, type, date)
            }}
          > 
          <Form.Group>
            <Form.Label>Expense Amount:</Form.Label>
            <Form.Control 
              type="number"
              name="amount"
              onChange={e => setAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category:</Form.Label>
            <Select 
              options={genreList} 
              onChange={(selectedOption) => setCategory(selectedOption.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type:</Form.Label>
            <Select 
              options={moneyType}
              onChange={(selectedOption) => setType(selectedOption.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Frequency:</Form.Label>
            {frequencyOptions.map((option) => (
              <Form.Check 
                type='radio'
                key={option.value}
                label={option.label}
                name='frequency'
                value={option.value}
                onChange={(e) => setFrequency(e.target.value)}
                required
              />
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control 
              type='text'
              name='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </Form.Group>
            <Button type="submit">Add Expense</Button>
            <Button onClick={handlePromptClose}>Cancel</Button>
          </Form>
        </div>
      )}
    </div>
  );
}

ExpenseBtn.propTypes = {
  value: PropTypes.object.isRequired,
  showExpenseForm: PropTypes.bool.isRequired,
  onDateChange: PropTypes.func.isRequired
}