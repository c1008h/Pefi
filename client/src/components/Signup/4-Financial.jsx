import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import {Container, Button, Form, Col, Row, Card} from 'react-bootstrap'
import PropTypes from 'prop-types'; 
import dayjs from 'dayjs';
import { CREATE_NETWORTH, UPDATE_USER, CREATE_FINANCE } from '../../utils/mutations';

export default function Financial({handleSkip, handleNextStep}) {
  const [currentDigital, setCurrentDigital] = useState(null)
  const [currentCash, setCurrentCash] = useState(null)
  const [currentSaved, setCurrentSaved] = useState(null)
  const [currentInvested, setCurrentInvested] = useState(null)
  const [incomeLevel, setIncomeLevel] = useState(null)
  const [ createNetworth ] = useMutation(CREATE_NETWORTH)
  const [ createFinance ] = useMutation(CREATE_FINANCE)
  const [ updateUser ] = useMutation(UPDATE_USER)
  const [thisYear, setThisYear] = useState()

  useEffect(() => {
    const currentYear = dayjs().year();
    setThisYear(currentYear)
  }, [])

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
      await handleNextStep()
      console.log('successful')
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Financial Information</h1>
        </Col>
  
      </Row>
      <Row className='finance-container'>
        <Col>
          <h3>Why We Need Your Financial Information</h3>
          <p>
           To provide you with the best financial advice and tools, we need some information about your current financial situation. Rest assured, your data is kept secure and confidential. Here&apos;s why we need this information:
          </p>
          <ul>
            <li>
              <strong>Income Level:</strong> Your income level helps us understand your financial capacity and plan accordingly.
            </li>
            <li>
              <strong>Cash in Bank:</strong> Information about your cash in the bank helps us assess your available liquidity and budgeting options.
            </li>
            <li>
              <strong>Invested Assets:</strong> Details about your invested assets allow us to provide insights into your investment portfolio and strategies.
            </li>
            <li>
              <strong>Savings Accounts:</strong> Knowing about your savings accounts assists us in managing your savings goals and optimizing your returns.
            </li>
            <li>
              <strong>Cash on Hand:</strong> Your literal cash holdings are important for budgeting and financial planning, including day-to-day expenses.
            </li>
          </ul>
        </Col>
        <Col>
          <Row>
            <Col>
              <h3>Current Finances</h3>
              <p>
                Providing this information will enable us to offer personalized financial guidance tailored to your unique situation. Your financial data is encrypted and secure, and we are committed to protecting your privacy.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className='form-card'>
                <Form onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit( thisYear, incomeLevel, currentDigital, currentCash, currentInvested, currentSaved )
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
            </Col>
          </Row>
          
        </Col>
      </Row>
      <Row style={{marginTop:'2%'}}>
        <Col>
          {incomeLevel === null || currentDigital === null || currentCash === null || currentInvested === null || currentSaved === null ? (
            <p className="text-danger">
              Please fill out all the form fields before you can continue.
            </p>
          ) : null}
        </Col>
      </Row>
      <Row>
        <div className='btn-container'>
          {/* <Button 
            className='skip-btn'
            onClick={() => handleSkip()} disabled>Skip</Button> */}
            
          <Button 
            className='continue-btn'
            disabled={incomeLevel === null || currentDigital === null || currentCash === null || currentInvested === null || currentSaved === null}            
            onClick={() => handleSubmit( thisYear, incomeLevel, currentDigital, currentCash, currentInvested, currentSaved )}
          >Continue</Button>
        </div>
      </Row>
    </Container>
  )
}

Financial.propTypes = {
    handleSkip: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
};