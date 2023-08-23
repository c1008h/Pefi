import { useState } from 'react';
import  { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; 
import Select from 'react-select'
import { genderList } from '../../constants/genders'

import SkipBtn from './SkipBtn';
import ContinueBtn from './ContinueBtn';

import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';

export default function Step2({handleSkip, handleNextStep, step}) {
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [location, setLocation] = useState('')
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [other, setOther] = useState(false)
// console.log(step)
    const handleGenderSelect = (selectedOption) => {
        const selectedGender = selectedOption.value;
    
        if (selectedGender === 'other (specify)') {
          setGender(''); 
          setOther(true)
        } else {
          setGender(selectedGender); 
          setOther(false)
        }
    };

    const [ updateUser ] = useMutation(UPDATE_USER)

    const handleSubmit = async (firstName, lastName, birthday, gender, location) => {
        console.log('handle update user')
        if (!firstName || !lastName) {
            console.error('Error: Required fields are empty');
            setFirstNameError("Please enter your first name.");
            setLastNameError("Please enter your last name.");
            return;
        }

        try {
            await updateUser({
                variables: {
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    birthday: birthday,
                    gender: gender.trim(),
                    location: location.trim()
                }
            })
            handleNextStep()
            console.log('successful')
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
                                handleSubmit(firstName, lastName, birthday, gender, location)
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
                            <Form.Group>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control 
                                    type='date' 
                                    name='birthday'
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gender:</Form.Label>
                                <Select 
                                    options={genderList}
                                    onChange={handleGenderSelect}
                                />
                            </Form.Group>
                            {other && (
                                <Form.Group>
                                <Form.Label>Custom Gender:</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='gender'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                </Form.Group>
                            )}
                            <Form.Group>
                                <Form.Label>Location:</Form.Label>
                                <Form.Control 
                                    type='text' 
                                    name='location'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="City, State, Country (e.g., Seattle, WA, USA)"
                                />
                            </Form.Group>
                        </Form>
                        {firstNameError && <p>{firstNameError}</p>}
                        {lastNameError && <p>{lastNameError}</p>}

                    </Card>
                </Col>
            </Row>
            <Row style={{paddingBottom:'2%'}}>
                <Col>
                    <h2>Financial Fun Fact</h2>
                    <p>Did you know that making small changes in your daily spending habits can lead to significant savings over time? We&rsquo;re here to help you make those positive changes!</p>
                </Col>
            </Row>
            <Row>
                <div className='btn-container'>
                    <Button 
                        className='skip-btn'
                        onClick={() => handleSkip()}>Skip</Button>
                    <Button 
                        className='continue-btn'
                        onClick={() => handleSubmit(firstName, lastName, birthday, gender, location)}>Continue</Button>
                </div>
            </Row>
        </Container>
    )
}

Step2.propTypes = {
    handleSkip: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired
};