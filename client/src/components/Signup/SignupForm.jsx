import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes
import galaxyImage from '/galaxy.jpg'

import AccountAgreementModal from './AccountAgreementModal'
import PrivacyPolicyModal from './PrivacyPolicyModal'

export const SignupForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPrivacyModal, setShowPrivacyModal] = useState(false); // Privacy Policy modal
    const [showUserAgreementModal, setShowUserAgreementModal] = useState(false); // User Agreement modal
    const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
    const [agreedToUserAgreement, setAgreedToUserAgreement] = useState(false);

    const handleAgreePrivacy = () => {
      setAgreedToPrivacy(!agreedToPrivacy);
    };
  
    const handleAgreeUserAgreement = () => {
      setAgreedToUserAgreement(!agreedToUserAgreement);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(confirmPassword === password) {

        onSubmit(email, password);
        setEmail('')
        setPassword('')
      } else {
        alert('Confirm password is not the same as password!')
        setPassword('')
        setConfirmPassword('')
      }
    };
    const leftStyle = {
      backgroundImage: `url(${galaxyImage})`, 
      padding:'5%',
      margin:'0',
      backgroundSize:'cover'
    }
    return (
      <Container fluid='true' >
        <Row>
          <Col style={leftStyle}>
            <h1 style={{color:'white'}}>Create your login</h1>
            <h5 style={{color:'white'}}>We&apos;ll need your email address, and a unique password. You&apos;ll use this to login to access Personal Finance next time.</h5>
          </Col>
          <Col style={{margin:'0', padding:'0', backgroundColor:'#295d90'}}>
              <Form onSubmit={handleSubmit} style={{padding:'15%', justifyContent:'center'}}>
                <h2 style={{textAlign:'center'}}>Signup for PeFi</h2>
                <Form.Group>
                  <Form.Label htmlFor='email'>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Your email address'
                    name='email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>
          
                <Form.Group>
                  <Form.Label htmlFor='password'>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Your password'
                    name='password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor='password2'>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    name='confirmPassword'
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>Confirm your password!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="userAgreementCheckbox">
                <Form.Check
                  type="checkbox"
                  label="I agree to the USER ACCOUNT AGREEMENT"
                  checked={agreedToUserAgreement}
                  onChange={() => setShowUserAgreementModal(true)}
                  required
                />
                  <Button onClick={() => handleViewUserAgreement()}>View Agreement</Button>
                </Form.Group>

                <Form.Group controlId="privacyCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree to the PRIVACY POLICY"
                    checked={agreedToPrivacy}
                    onChange={handleAgreePrivacy}
                    required
                  />
                  <Button onClick={() => setShowPrivacyModal(true)}>View Privacy Policy</Button>
                </Form.Group>
                {/* {showUserAgreementModal &&  */}
                  <AccountAgreementModal 
                    show={showUserAgreementModal} 
                    onHide={() => setShowUserAgreementModal(false)} 
                  />
                {/* // } */}
                {/* {showPrivacyModal &&  */}
                  <PrivacyPolicyModal 
                    show={showPrivacyModal} 
                    onHide={() => setShowPrivacyModal(false)} />
                {/* } */}
                  <h5 style={{font:'black', marginTop:'1.5rem'}}>Already started?</h5>
                  <Link to='/login'>Login to complete your application</Link>

                  <h5 style={{font:'black', marginTop:'3.5'}}>By continuing, you agree to the USER ACCOUNT AGREEMENT and PRIVACY POLICY</h5>
                  <Button style={{margin:'5%', marginBottom:'2.5rem', justifyContent:'center', textAlign:'center', float:'right'}}
                    disabled={!(email && password && confirmPassword && agreedToUserAgreement && agreedToPrivacy)}
                    type='submit'
                    variant='secondary'>
                    Continue
                </Button>
              </Form>
          </Col>
        </Row>
      </Container>
    )
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};