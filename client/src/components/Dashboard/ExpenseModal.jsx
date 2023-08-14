import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { CREATE_EXPENSE } from '../../utils/mutations';

import { useDispatch } from 'react-redux';
import { addExpense } from '../../store/reducers/expensesReducer';
import PropTypes from 'prop-types'; // Import PropTypes
import Select from 'react-select'
import {genreList, frequencyOptions, moneyType} from '../../constants/genres'


export function ExpenseModal({ openExpenseForm, closeExpenseForm, value }) {
  const [amount, setAmount] = useState()
  const [frequency, setFrequency] = useState()
  const [category, setCategory] = useState()
  const [date, setDate] = useState(value.format('MM/DD/YYYY'))
  const [type, setType] = useState()
  // const [showPrompt, setShowPrompt] = useState(false);
  const [reoccuring, setReoccuring] = useState(false)
  const [createExpense] = useMutation(CREATE_EXPENSE)
  const dispatch = useDispatch();

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
          amount: parseFloat(amount.trim()),
          frequency: frequency,
          category: category,
          type: type,
          date: date,
        }}
      })
      // await dispatch(addExpense({amount, frequency, category, type, date}));

      if(createExpense.error) { throw new Error('Something went wrong with creating expense.')}
      window.location.reload();

    } catch (error) {
      console.log("Error:", error)
    }
  }
  return (
    <div>
      <Modal show={openExpenseForm} onHide={closeExpenseForm}>
          <div style={{display:'flex', flexDirection:'column'}}>
              <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Save</Button>
                <Button onClick={closeExpenseForm}>Cancel</Button>
              </Modal.Footer>
            </div>
        </Modal>
    </div>

  );
}

ExpenseModal.propTypes = {
  value: PropTypes.object.isRequired,
  openExpenseForm: PropTypes.func.isRequired,
  closeExpenseForm: PropTypes.func.isRequired
}