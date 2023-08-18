import { useState } from 'react';
import  { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';

export default function Step2({handleSkip, handleNextStep}) {
    const [firstName, setFirstname] = useState()
    const [lastName, setLastname] = useState()

    const [ updateUser ] = useMutation(UPDATE_USER)
    const handleSubmit = async (firstName, lastName) => {
        if (!firstName || !lastName) {
            console.error('Error: Required fields are empty');
            return;
        }

        try {
            await updateUser({
                variables: {
                    firstName: firstName,
                    lastName: lastName,
                }
            })
        } catch (error) {
            console.error('Error:', error)
        }
    };

    return (
        <Container fluid='true' style={{padding:'5%'}}>
            <Row style={{paddingBottom:'2%'}}>
                <Col>
                    <h1>Welcome to Pefi!</h1>
                    <p>You&rsquo;re one step closer to achieving your financial goals.</p>
                    <p>Let&rsquo;s start by personalizing your account.</p>
                </Col>
            </Row>
            <Row style={{paddingBottom:'2%'}}>
                <Col>
                    <h2>Upload Profile Picture</h2>
                    <img src="[Profile Picture Placeholder]" alt="Profile" />
                    <Button variant="secondary">Upload Profile Picture</Button>
                </Col>
            </Row>
            <Row style={{paddingBottom:'2%'}}>
                <Col>
                    <h2>Personalize Your Account</h2>
                    <p>Your first and last name will help us address you personally and make your experience more tailored to you.</p>
                    <p>Rest assured, your personal information is safe with us. We value your privacy and won&rsquo;t share your data with anyone.</p>
                </Col>
            </Row>
            <Row style={{paddingBottom:'2%'}}>
                <Col>
                    <Card style={{padding: '5%'}}>
                                <h3>Enter Your Information</h3>

                        <Form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit(firstName, lastName)
                            }}
                        >
                            <Form.Group>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='firstName' 
                                    value={firstName}
                                    required
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='lastName'
                                    value={lastName}
                                    onChange={(e) => setLastname(e.target.value)}
                                    required
                                />

                            </Form.Group>
                            {/* <Button onClick={handleNextStep}>Next</Button>
                            <Button onClick={handleSkip}>Skip for Now</Button> */}
                        </Form>
                        {/* {firstNameError && <p>Please enter your first name.</p>}
                        {lastNameError && <p>Please enter your last name.</p>} */}

                    </Card>
                </Col>
            </Row>
            <Row style={{paddingBottom:'2%'}}>
                <Col>
                    <h2>Financial Fun Fact</h2>
                    <p>Did you know that making small changes in your daily spending habits can lead to significant savings over time? We&rsquo;re here to help you make those positive changes!</p>
                </Col>
            </Row>
        </Container>
    )
}

Step2.propTypes = {
    handleSkip: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
};