import { useState } from 'react';
import { Form } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { CREATE_EXPENSE } from '../../utils/mutations';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'; // Import PropTypes
import Select from 'react-select'
import { genreList, frequencyOptions, moneyType } from '../../constants/genres'
import ModalTemplate from '../ModalTemplate';

export function ExpenseModal({ openExpenseForm, closeExpenseForm, onDateChange, onSaveExpense, value }) {
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

  const handleSaveExpense = async (amount, frequency, category, type, date) => {
    console.log('Inputting expense:', amount, frequency, category, type, date)
    
    try {
      await createExpense({
        variables: { input: {
          amount: parseFloat(amount),
          frequency: frequency,
          category: category,
          type: type,
          date: date,
        }}
      })

      // await dispatch(addExpense({amount, frequency, category, type, date}));
      onSaveExpense({amount, frequency, category, type, date})
      if(createExpense.error) { throw new Error('Something went wrong with creating expense.')}
      window.location.reload();

    } catch (error) {
      console.log("Error:", error)
    }
  }

  return (
    <div>
      <ModalTemplate 
        title={"Add Expense"}
        change={"Save"}
        show={openExpenseForm} 
        handleClose={closeExpenseForm} 
        handleChange={() => handleSaveExpense(amount, frequency, category, type, date)}
      >
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
              type='date'
              name='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </ModalTemplate>
    </div>

  );
}

ExpenseModal.propTypes = {
  value: PropTypes.object.isRequired,
  openExpenseForm: PropTypes.func.isRequired,
  closeExpenseForm: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onSaveExpense: PropTypes.func.isRequired
}