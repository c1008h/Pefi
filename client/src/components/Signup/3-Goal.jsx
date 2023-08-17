import { useState, useEffect } from 'react';
import  { Container, Row, Col, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes
import dayjs from 'dayjs';

export function FirstGoal() {
  const [thisYear, setThisYear] = useState()
  const [nextYear, setNextYear] = useState()

  useEffect(() => {
    const currentYear = dayjs().year();
    const nextYear = currentYear + 1;

    setThisYear(`${currentYear} - ${nextYear}`);
    setNextYear(nextYear)
  }, [])
  // console.log(thisYear)

  return (
    <Container fluid='true'>
      <Container>
        <Row>
            <Col>
              <h2>What are your financial goals for {nextYear}?</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Label>Digital::</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cash:</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Saved:</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Invested:</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
      </Container>
    </Container>
  )
}

export function SecondGoal() {
  return (
    <Container fluid='true'>
      <Container>
        <Row>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
      </Container>
    </Container>
  )
}

export function ThirdGoal() {
  return (
    <Container fluid='true'>
      <Container>
        <Row>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
      </Container>
    </Container>
  )
}

export function FourthGoal() {
  return (
    <Container fluid='true'>
      <Container>
        <Row>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
      </Container>
    </Container>
  )
}

export function FifthGoal() {
  return (
    <Container fluid='true'>
      <Container>
        <Row>
            <Col>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form>
            </Col>
        </Row>
      </Container>
    </Container>
  )
}

