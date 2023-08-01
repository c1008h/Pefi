import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { CREATE_INCOME } from '../../utils/mutations';
import Select from 'react-select'
import { frequencyOptions, incomeOptions } from '../../constants/genres'
import PropTypes from 'prop-types'; // Import PropTypes

export const IncomeBtn = ({ showIncomeForm, value }) => {
    const [showPrompt, setShowPrompt] = useState(false);

    const [amount, setAmount] = useState()
    const [frequency, setFrequency] = useState()
    const [category, setCategory] = useState()
    const [date, setDate] = useState(value.format('MM/DD/YYYY'))
    const [note, setNote] = useState('');

    const [isRecurring, setIsRecurring] = useState(false);
    const [createIncome] = useMutation(CREATE_INCOME)

    const handleAddIncome = () => {
      setShowPrompt(true);
    };
  
    const handleSaveIncome = async (amount, frequency, category, date, note) => {
      console.log('Inputting income:',  amount, frequency, category, date, note );

      setShowPrompt(false);

      try {
        await createIncome({
          variables: { input: { 
            amount: amount.trim(),
            frequency: frequency,
            category: category,
            date: date,
            note: note.trim()
          }} 
        })

        if(createIncome.error) { throw new Error('Something went wrong.')}

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
                handleSaveIncome(amount, frequency, category, date, note)
              }} 
            >
              <Form.Group>
                <Form.Label>Amount:</Form.Label>
                <Form.Control 
                  type='text'
                  name='amount'
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Income Type:</Form.Label>
                <Select
                  options={incomeOptions}
                  onChange={(selectedOption) => setCategory(selectedOption.value)}
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