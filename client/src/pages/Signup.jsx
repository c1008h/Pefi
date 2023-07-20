import { useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const [isChecked, setIsChecked] = useState(false);

  const isFormFilled = email !== '' && password !== '' && confirmPassword !== '';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
  };
  return (
    <Container style={{justifyContent:'center', justifyItems:'center', alignContent:'center'}}>
      <Card style={{padding:'2%', width:'50%'}}>
      {/* <Card.Title>Signup!</Card.Title> */}
        <Form onSubmit={handleSubmit}>
        <h1>Signup!</h1>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="confirmpassword" placeholder="Confirm Password" value={confirmPassword} onChange={handleEmailChange}/>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isFormFilled}>
          Submit
        </Button>
      </Form>
    </Card>
    </Container>
  )
}
