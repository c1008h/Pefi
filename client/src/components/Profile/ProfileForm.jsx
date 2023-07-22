import { Container, Card, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';

export default function ProfileForm({userData}) {
    const [firstName, setFirstName] = useState(userData.firstName || '')
    const [lastName, setLastName] = useState(userData.lastName || '')
    const [email, setEmail] = useState(userData.email)
    const [password, setPassword] = useState()

    // console.log(userData.email)
    console.log(email)
    function saveFirst(e) {
        setFirstName(e.target.value)
    }
    function saveLast(e) {
        setLastName(e.target.value)
    }
    function saveEmail(e) {
        setEmail(e.target.value)
    }
    function savePassword(e){
        setPassword(e.target.value)
    }

    return (
        <Container>
        <h2>Profile</h2>
        <Card style={{padding:'5%'}}>
            <Form>
                <Form.Group>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}

                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control             
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}

                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control></Form.Control>
                </Form.Group>
                <Button tyoe='submit'>Save</Button>
                <Button>Cancel</Button>
            </Form>
        </Card>
        </Container>
    )
}

ProfileForm.propTypes = {
    userData: PropTypes.object.isRequired
}