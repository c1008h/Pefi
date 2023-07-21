import { Container, Card, Form, Button } from 'react-bootstrap'
// import PropTypes from 'prop-types'; // Import PropTypes

export default function ProfileForm() {
  return (
    <Container>
      <h2>Profile</h2>
      <Card>
        <Form>
            <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control></Form.Control>
            </Form.Group>
            <Button tyoe='submit'>Save</Button>
        </Form>
      </Card>
    </Container>
  )
}

// ProfileForm.PropTypes = {
//     userData: PropTypes.array.isRequired
// }