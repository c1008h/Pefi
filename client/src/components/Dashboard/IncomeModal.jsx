import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { CREATE_INCOME } from '../../utils/mutations';
import Select from 'react-select'
import { frequencyOptions, incomeOptions, moneyType } from '../../constants/genres'
import PropTypes from 'prop-types'; // Import PropTypes

export const IncomeModal = ({ closeIncomeForm, openIncomeForm, value }) => {
    const [showPrompt, setShowPrompt] = useState(false);

    const [amount, setAmount] = useState()
    const [frequency, setFrequency] = useState()
    const [category, setCategory] = useState()
    const [type, setType] = useState()
    const [date, setDate] = useState(value.format('MM/DD/YYYY'))
    const [note, setNote] = useState('');

    const [isRecurring, setIsRecurring] = useState(false);
    const [createIncome] = useMutation(CREATE_INCOME)
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
       
        window.location.reload();
      } catch (error) {
        console.log("Error:", error)
      }
    };
    // const handlePromptClose = () => {
    //     setShowPrompt(false);
    //   };
    return (
      <div>
          <Modal show={openIncomeForm} onHide={closeIncomeForm}>
            <div style={{display:'flex', flexDirection:'column'}}>
              <Modal.Header closeButton>
                <Modal.Title>Add Income</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                  <Form.Group>
                    <Form.Label>Note: </Form.Label>
                    <Form.Control
                      type='text'
                      name='note'
                      onChange={e => setNote(e.target.value)}
                    />
                  </Form.Group>
                  <div>
                    <Button type="submit">Save</Button>
                    <Button onClick={closeIncomeForm}>Cancel</Button>
                  </div>
                </Form>
              </Modal.Body>           
            </div>
          </Modal>
      </div>
    );
}

IncomeModal.propTypes = {
  value: PropTypes.object.isRequired,
  openIncomeForm: PropTypes.func.isRequired,
  closeIncomeForm: PropTypes.func.isRequired
}