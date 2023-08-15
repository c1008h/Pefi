import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'; // Import PropTypes

export default function LoginForm({ handleFormSubmit, handleChange, formState }) {
    return (
      <Container fluid='true'>
        <Row>
          <Col>
          </Col>
          <Col>
            <Card>
              <Form onSubmit={handleFormSubmit} style={{padding:'15%', justifyContent:'center'}}>
                <h1>Log in to Pefi</h1>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name='email'
                    value={formState.email} 
                    onChange={handleChange}
                    required
                    isInvalid={!formState.email}
                  />
                  <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={formState.password}
                    name='password' 
                    onChange={handleChange}
                    required
                    isInvalid={!formState.password} 

                  />
                </Form.Group>

                <div>

                  <Button 
                    variant="success" 
                    type="submit" 
                    disabled={!(formState.email && formState.password)}
                  >Log in</Button>




                  <h5>Not a member? <Link>Create an account</Link></h5>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    )
}


LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired
};