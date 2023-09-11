import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { Container, Button, Form, Col, Row, Card } from 'react-bootstrap'
import { updateNetworth, updateCash, updateDigital, updateInvested, updateSaved } from '../../../store/slices/financeSlice';
import { CREATE_NETWORTH, UPDATE_USER, CREATE_FINANCE } from '../../../utils/mutations';
import PropTypes from 'prop-types'; 

export default function ManualInput({ thisYear }) {
    const [currentDigital, setCurrentDigital] = useState(null)
    const [currentCash, setCurrentCash] = useState(null)
    const [currentSaved, setCurrentSaved] = useState(null)
    const [currentInvested, setCurrentInvested] = useState(null)
    const [incomeLevel, setIncomeLevel] = useState(null)

    const [ createNetworth ] = useMutation(CREATE_NETWORTH)
    const [ createFinance ] = useMutation(CREATE_FINANCE)
    const [ updateUser ] = useMutation(UPDATE_USER)

    const handleSubmit = async (thisYear, currentDigital, currentCash, currentInvested, currentSaved, incomeLevel) => {
        try {
    
          await updateUser({
            variables: {
              incomeLevel: incomeLevel
            }
          })
          await createFinance({
            variables: { input: {
              digital: parseFloat(currentDigital),
              cash: parseFloat(currentCash),
              invested: parseFloat(currentInvested),
              saved: parseFloat(currentSaved)
            }}
          })
          await createNetworth({
            variables: {
              year: parseFloat(thisYear),
              digital: parseFloat(currentDigital),
              cash: parseFloat(currentCash),
              invested: parseFloat(currentInvested),
              saved: parseFloat(currentSaved)
            }
          })
    
          dispatch(updateCash(currentCash))
          dispatch(updateDigital(currentDigital))
          dispatch(updateInvested(currentInvested))
          dispatch(updateSaved(currentSaved))
          dispatch(updateNetworth());
    
          await handleNextStep()
          console.log('successful')
        } catch (error) {
          console.log('Error:', error)
        }
    }

    return (
        <Card className='form-card'>
            <Form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit( thisYear, currentDigital, currentCash, currentInvested, currentSaved, incomeLevel)
            }}>
                <Form.Group>
                <Form.Label>
                    Annual Income:
                </Form.Label>
                <Form.Control 
                    onChange={(e) => setIncomeLevel(e.target.value)}
                    type='number' name='incomeLevel' required
                />
                </Form.Group>

                <Form.Group>
                <Form.Label>
                    Digital:
                </Form.Label>
                <Form.Control 
                    onChange={(e) => setCurrentDigital(e.target.value)}
                    type='number' name='currentDigital' required
                />
                </Form.Group>

                <Form.Group>
                <Form.Label>
                    Cash:
                </Form.Label>
                <Form.Control 
                    onChange={(e) => setCurrentCash(e.target.value)}
                    type='number' name='currentCash' required
                />
                </Form.Group>

                <Form.Group>
                <Form.Label>
                    Invested:
                </Form.Label>
                <Form.Control 
                    onChange={(e) => setCurrentInvested(e.target.value)}
                    type='number' name='currentInvested' required
                />
                </Form.Group>

                <Form.Group>
                <Form.Label>
                    Saved:
                </Form.Label>
                <Form.Control 
                    onChange={(e) => setCurrentSaved(e.target.value)}
                    type='number' name='currentSaved' required
                />
                </Form.Group>
            </Form>
        </Card>
    )
}

ManualInput.propTypes = {
    thisYear: PropTypes.number.isRequired,
};