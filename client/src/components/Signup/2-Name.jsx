import { useState } from 'react';
import  { Container, Row, Col, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes

export default function Step2({handleSkip, handleNextStep}) {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()


    return (
        <Container fluid='true'>
            <Container>
                <Row style={{textAlign:'center'}}>
                    <h1>Enter Your Name</h1>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='firstName' 
                                    value={firstname}
                                    required
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='lastName'
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />

                            </Form.Group>
                            <Button onClick={handleNextStep}>Next</Button>
                            <Button onClick={handleSkip}>Skip for Now</Button>
                        </Form>
                        {/* {firstNameError && <p>Please enter your first name.</p>}
                        {lastNameError && <p>Please enter your last name.</p>} */}

                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

Step2.propTypes = {
    handleSkip: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
};