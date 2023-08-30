import { useState } from 'react'
import { useMutation } from '@apollo/client';
import {Container, Button, Form, Col, Row, Card} from 'react-bootstrap'
import PropTypes from 'prop-types'; 
import { CREATE_NETWORTH, UPDATE_USER, CREATE_FINANCE } from '../../utils/mutations';

export default function Financial({handleSkip, handleNextStep}) {
  const [currentDigital, setCurrentDigital] = useState()
  const [currentCash, setCurrentCash] = useState()
  const [currentSaved, setCurrentSaved] = useState()
  const [currentInvested, setCurrentInvested] = useState()
  const [incomeLevel, setIncomeLevel] = useState()
  const [ createNetworth ] = useMutation(CREATE_NETWORTH)
  const [ createFinance ] = useMutation(CREATE_FINANCE)
  const [ updateUser ] = useMutation(UPDATE_USER)
  
  const handleSubmit = async (currentDigital, currentCash, currentInvested, currentSaved, incomeLevel) => {
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
          <h1>Financial info</h1>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
      <Row>
        <div className='btn-container'>
          <Button 
            className='skip-btn'
            onClick={() => handleSkip()}>Skip</Button>
          <Button 
            className='continue-btn'
            onClick={() => handleSubmit( currentDigital, currentCash, currentInvested, currentSaved, incomeLevel)}
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