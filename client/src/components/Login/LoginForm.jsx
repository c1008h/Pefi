import { useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const isFormFilled = email !== '' && password !== '' && confirmPassword !== '';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    if (password !== confirmPassword) {
      setPasswordsMatch(false)
      setPassword('')
      setConfirmPassword('')
      alert('Passwords do not match. Please try again.')
    } else {
      setPasswordsMatch(true)
      if (isFormFilled) {
        console.log('Form submitted successfully!')
      }
    }


  };
  return (
    // <Container style={{justifyContent:'center', justifyItems:'center', alignContent:'center'}}>
    <Card style={{padding:'2%', width:'50%'}}>
    {/* <Card.Title>Signup!</Card.Title> */}

    <Form onSubmit={handleSubmit}>
        <h1>Signup!</h1>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/>

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
        </Form.Group>
        <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
        </Form.Text>
        <div>
          <Button variant="primary" type="submit" disabled={!isFormFilled}>
          Submit
          </Button>
          <Link>Login</Link>
        </div>

      </Form>
      </Card>
  // </Container>
  )
}
