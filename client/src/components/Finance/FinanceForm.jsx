import { Form, Button } from 'react-bootstrap'

export default function FinanceForm() {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Total Digital Money:</Form.Label>
        <Form.Control />
      </Form.Group>

      <Form.Group>
        <Form.Label>Total Cash:</Form.Label>
        <Form.Control />
      </Form.Group>

      <Form.Group>
      <Form.Label>Total Invested:</Form.Label>
      <Form.Control />
      </Form.Group>

      <Form.Group>
      <Form.Label>Total Saved:</Form.Label>
      <Form.Control />
      </Form.Group>
        <Button>Save</Button>
    </Form>
  )
}
