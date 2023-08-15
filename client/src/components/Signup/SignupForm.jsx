import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types'; // Import PropTypes

export const SignupForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

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
    return (
      <Container fluid='true' >
        <Row>
          <Col style={{padding:'5%'}}>
            <h1>Create your login</h1>
            <h5>We&apos;ll need your email address, and a unique password. You&apos;ll use this to login to access Personal Finance next time.</h5>
          </Col>
          <Col>
            <Card>
              <Form onSubmit={handleSubmit} style={{padding:'15%', justifyContent:'center'}}>
                <h2 style={{textAlign:'center'}}>Signup</h2>
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
                <Container>

                    <p style={{font:'black'}}>Already started?</p>
                    <Link to='/login'>Login to complete your application</Link>
 
                    <p style={{font:'black'}}>By continuing, you agree to the USER ACCOUNT AGREEMENT and PRIVACY POLICY</p>
                    <Button style={{margin:'5%', justifyContent:'center', textAlign:'center'}}
                      disabled={!(email && password && confirmPassword)}
                      type='submit'
                      variant='success'>
                      Submit
                  </Button>
                </Container>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    )
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};