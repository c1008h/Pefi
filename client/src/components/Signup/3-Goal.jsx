import { useState, useEffect } from 'react';
import  { Container, Row, Col, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes
import dayjs from 'dayjs';

export function FirstGoal({handleSkip, handleNextStep}) {
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
            <h2>Set Your Financial Goals</h2>
            <h4>Introduction:</h4>
            <p style={{font:'black'}}>Welcome to the goal-setting section! Taking the time to set clear and specific financial goals can make a significant difference in achieving your dreams. Remember, being intentional about your goals increases your chances of success. Let&rsquo;s get started on setting your financial goals for the upcoming year.</p>
            <h5>Guidelines for Setting Effective Goals:</h5>
            <ol>
              <li>Be Specific: Goals should be detailed and specific. Instead of general statements, define what you want to achieve in clear terms.</li>
              <li>Be Realistic: Choose goals that are challenging yet achievable based on your current financial situation.</li>
              <li>Consider Your Priorities: Align your goals with your financial priorities. What matters most to you?</li>
              <li>Break It Down: Break larger goals into smaller, manageable steps. This makes the process less overwhelming.</li>
              <li>Measure Progress: Set measurable goals so you can track your progress and celebrate achievements.</li>
              <li>Stay Flexible: Life changes, and so can your goals. Be open to adjustments if needed.</li>
            </ol>
          </Col>
          <Col>
            <Row>
              <Col>
                <h2>Your Financial Goals for the Upcoming Year:</h2>
                <p>In the form below, please share your financial goals for the next year. Remember to keep them specific and realistic. Don't worry about setting too many goals; even one or two well-defined goals can make a big impact.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>What are your financial goals for {nextYear}?</h3>
                <Form>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Button onClick={handleNextStep}>Next</Button>
                  <Button onClick={handleSkip}>Skip for Now</Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export function SecondGoal({handleSkip, handleNextStep}) {
  return (
    <Container fluid='true'>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Row>
                <Col>
                </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control 
                      
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Button onClick={handleNextStep}>Next</Button>
                  <Button onClick={handleSkip}>Skip for Now</Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export function ThirdGoal({handleSkip, handleNextStep}) {
  return (
    <Container fluid='true'>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Row>
              <Col>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Button onClick={handleNextStep}>Next</Button>
                  <Button onClick={handleSkip}>Skip for Now</Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export function FourthGoal({handleSkip, handleNextStep}) {
  return (
    <Container fluid='true'>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Row>
              <Col>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Button onClick={handleNextStep}>Next</Button>
                  <Button onClick={handleSkip}>Skip for Now</Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export function FifthGoal({handleSkip, handleNextStep}) {
  return (
    <Container fluid='true'>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Row>
              <Col>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Button onClick={handleNextStep}>Next</Button>
                  <Button onClick={handleSkip}>Skip for Now</Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

FirstGoal.propTypes = {
  handleSkip: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
SecondGoal.propTypes = {
  handleSkip: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
ThirdGoal.propTypes = {
  handleSkip: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
FourthGoal.propTypes = {
  handleSkip: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};
FifthGoal.propTypes = {
  handleSkip: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
};