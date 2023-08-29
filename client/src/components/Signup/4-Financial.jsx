import { useState } from 'react'
import {Container, Form, Col, Row, Card} from 'react-bootstrap'
import PropTypes from 'prop-types'; 

export default function Financial({handleSkip, handleNextStep}) {
  return (
    <Container>
      Financial info
    </Container>
  )
}
Financial.propTypes = {
    handleSkip: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
};