import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { CREATE_INCOME, UPDATE_FINANCE } from '../../utils/mutations';
import Select from 'react-select'
import { frequencyOptions, incomeOptions, moneyType } from '../../constants/genres'
import PropTypes from 'prop-types'; // Import PropTypes

export const IncomeBtn = ({ showIncomeForm, value }) => {
    const [showPrompt, setShowPrompt] = useState(false);

    const [amount, setAmount] = useState()
    const [frequency, setFrequency] = useState()
    const [category, setCategory] = useState()
    const [type, setType] = useState()
    const [date, setDate] = useState(value.format('MM/DD/YYYY'))
    const [note, setNote] = useState('');

    const [isRecurring, setIsRecurring] = useState(false);
    const [createIncome] = useMutation(CREATE_INCOME)
    const [updateFinance] = useMutation(UPDATE_FINANCE)
    const handleAddIncome = () => {
      setShowPrompt(true);
    };
  
    const handleSaveIncome = async (amount, frequency, category, type, date, note) => {
      console.log('Inputting income:',  amount, frequency, category, type, date, note );

      setShowPrompt(false);

      try {
        await createIncome({
          variables: { input: { 
            amount: parseFloat(amount.trim()),
            frequency: frequency,
            category: category,
            type: type,
            date: date,
            note: note.trim()
          }} 
        })

        if(createIncome.error) { throw new Error('Something went wrong.')}
        await updateFinance({
          variables: {
            input: {
              cash: type === 'cash' ? parseFloat(amount) : 0,
              digital: type === 'digital' ? parseFloat(amount) : 0,
              invested: type === 'invested' ? parseFloat(amount) : 0,
              saved: type === 'saved' ? parseFloat(amount) : 0,
            }
          }
        })
        if (updateFinance.error) { throw new Error('Something went wrong with updating Finance')}
      } catch (error) {
        console.log("Error:", error)
      }
    };
    const handlePromptClose = () => {
        setShowPrompt(false);
      };
    return (
      <>
        {showIncomeForm && (
          <div style={{display:'flex', flexDirection:'column'}}>
            <h3>Add Income Details</h3>
            <Form 
              style={{display:'flex', flexDirection:'column'}}
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveIncome(amount, frequency, category, type, date, note)
              }} 
            >
              <Form.Group>
                <Form.Label>Amount:</Form.Label>
                <Form.Control 
                  type='number'
                  name='amount'
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category:</Form.Label>
                <Select
                  options={incomeOptions}
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
             
            
                {/* Recurring:
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                />
              </label> */}
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
              <Form.Group>
                <Form.Label>Note: </Form.Label>
                <Form.Control
                  type='text'
                  name='note'
                  onChange={e => setNote(e.target.value)}
                />
              </Form.Group>
              {/* <label>
                Payer:
                <input
                  type="text"
                  value={payer}
                />
              </label> */}
              <Button type="submit">Submit</Button>
              <Button onClick={handlePromptClose}>Cancel</Button>
            </Form>
          </div>
        )}
      </>
    );
}

IncomeBtn.propTypes = {
  value: PropTypes.object.isRequired,
  showIncomeForm: PropTypes.bool.isRequired
}