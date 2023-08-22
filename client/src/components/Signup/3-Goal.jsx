import { useState, useEffect } from 'react';
import  { Container, Row, Col, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes
import dayjs from 'dayjs';

import { useMutation } from '@apollo/client';
import { CREATE_GOALS } from '../../utils/mutations'

export function FirstGoal({handleSkip, handleNextStep}) {
  const [thisYear, setThisYear] = useState()
  const [nextYear, setNextYear] = useState()
  const [digital, setDigital] = useState(0)
  const [cash, setCash] = useState(0)
  const [invested, setInvested] = useState(0)
  const [saved, setSaved] = useState(0)
  const [ createGoals ] = useMutation(CREATE_GOALS)

  useEffect(() => {
    const currentYear = dayjs().year();
    const nextYear = currentYear + 1;

    setThisYear(currentYear)
    // setThisYear(`${currentYear} - ${nextYear}`);
    setNextYear(nextYear)
  }, [])
  // console.log(thisYear)
  console.log(thisYear)
  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }
    try {
      const year = parseInt(thisYear);

      if (isNaN(year)) {
        console.error('Invalid year:', thisYear);
        return; // Don't proceed if "thisYear" cannot be parsed as an integer
      }

      await createGoals({
        variables: {
          input: {
            year: parseInt(thisYear),
            digital: parseFloat(digital),
            cash: parseFloat(cash),
            invested: parseFloat(invested),
            saved: parseFloat(saved)
          }
        }
      })
      handleNextStep()
      console.log('successfully added goal')
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <Container fluid='true'>
      <Container style={{paddingTop:'5%'}}>
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
                <h2>Vision for the Upcoming Year:</h2>
                <p>In the form below, please share your financial goals for the next year. Remember to keep them specific and realistic. Don't worry about setting too many goals; even one or two well-defined goals can make a big impact.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>What are your financial goals for {nextYear}?</h3>
                <Form onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit( thisYear, saved, invested, cash, digital)
                }}>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control 
                      onChange={(e) => setDigital(e.target.value)}
                      value={digital}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setCash(e.target.value)}
                      value={cash}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setSaved(e.target.value)}
                      value={saved}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setInvested(e.target.value)}
                      value={invested}
                    />
                  </Form.Group>
                  {/* <Button onClick={() => handleNextStep()}>Next</Button>
                  <Button onClick={() => handleSkip()}>Skip for Now</Button> */}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'>
            <Button 
                style={{float:'left'}}
                onClick={() => handleSkip()}>Skip</Button>
            <Button 
                style={{float:'right'}}
                onClick={() => handleSubmit( thisYear, saved, invested, cash, digital)
              }>Continue</Button>
            </div>
        </Row>
      </Container>
    </Container>
  )
}

export function SecondGoal({handleSkip, handleNextStep}) {
  const [thisYear, setThisYear] = useState()
  const [nextYear, setNextYear] = useState()
  const [digital, setDigital] = useState()
  const [cash, setCash] = useState()
  const [invested, setInvested] = useState()
  const [saved, setSaved] = useState()
  const [ createGoals ] = useMutation(CREATE_GOALS)

  useEffect(() => {
    const currentYear = dayjs().year() + 1;
    const nextYear = currentYear + 1;

    setThisYear(currentYear)
    // setThisYear(`${currentYear} - ${nextYear}`);
    setNextYear(nextYear)
  }, [])
  // console.log(thisYear)
  
  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }
    try {
      await createGoals({
        variables: {
          year: thisYear,
          digital: digital,
          cash: cash,
          invested: invested,
          saved: saved
        }
      })
      handleNextStep()
      console.log('successfully added goal')
    } catch (err) {
      console.error('Error:', err);
    }
  }
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
              <Form onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit( thisYear, saved, invested, cash, digital)
                }}>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control 
                      onChange={(e) => setDigital(e.target.value)}
                      value={digital}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setCash(e.target.value)}
                      value={cash}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setSaved(e.target.value)}
                      value={saved}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setInvested(e.target.value)}
                      value={invested}
                    />
                  </Form.Group>
                  {/* <Button onClick={() => handleNextStep()}>Next</Button>
                  <Button onClick={() => handleSkip()}>Skip for Now</Button> */}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'> 
            <Button 
                style={{float:'left'}}
                onClick={() => handleSkip()}>Skip</Button>
            <Button 
                style={{float:'right'}}
                onClick={() => handleSubmit( thisYear, saved, invested, cash, digital)
              }>Continue</Button>
            </div>
        </Row>
      </Container>
    </Container>
  )
}

export function ThirdGoal({handleSkip, handleNextStep}) {
  const [thisYear, setThisYear] = useState()
  const [nextYear, setNextYear] = useState()
  const [digital, setDigital] = useState()
  const [cash, setCash] = useState()
  const [invested, setInvested] = useState()
  const [saved, setSaved] = useState()
  const [ createGoals ] = useMutation(CREATE_GOALS)

  useEffect(() => {
    const currentYear = dayjs().year() + 2;
    const nextYear = currentYear + 1;

    // setThisYear(`${currentYear} - ${nextYear}`);
    setThisYear(currentYear)
    setNextYear(nextYear)
  }, [])
  // console.log(thisYear)
  
  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }
    try {
      await createGoals({
        variables: {
          year: thisYear,
          digital: digital,
          cash: cash,
          invested: invested,
          saved: saved
        }
      })
      handleNextStep()
      console.log('successfully added goal')
    } catch (err) {
      console.error('Error:', err);
    }
  }
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
              <Form onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit( thisYear, saved, invested, cash, digital)
                }}>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control 
                      onChange={(e) => setDigital(e.target.value)}
                      value={digital}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setCash(e.target.value)}
                      value={cash}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setSaved(e.target.value)}
                      value={saved}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setInvested(e.target.value)}
                      value={invested}
                    />
                  </Form.Group>
                  {/* <Button onClick={() => handleNextStep()}>Next</Button>
                  <Button onClick={() => handleSkip()}>Skip for Now</Button> */}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'>
            <Button 
                style={{float:'left'}}
                onClick={() => handleSkip()}>Skip</Button>
            <Button 
                style={{float:'right'}}
                onClick={() => handleSubmit( thisYear, saved, invested, cash, digital)
              }>Continue</Button>
            </div>
        </Row>
      </Container>
    </Container>
  )
}

export function FourthGoal({handleSkip, handleNextStep}) {
  const [thisYear, setThisYear] = useState()
  const [nextYear, setNextYear] = useState()
  const [digital, setDigital] = useState()
  const [cash, setCash] = useState()
  const [invested, setInvested] = useState()
  const [saved, setSaved] = useState()
  const [ createGoals ] = useMutation(CREATE_GOALS)

  useEffect(() => {
    const currentYear = dayjs().year() + 3;
    const nextYear = currentYear + 1;

    // setThisYear(`${currentYear} - ${nextYear}`);
    setThisYear(currentYear)
    setNextYear(nextYear)
  }, [])
  // console.log(thisYear)
  
  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }
    try {
      await createGoals({
        variables: {
          year: thisYear,
          digital: digital,
          cash: cash,
          invested: invested,
          saved: saved
        }
      })
      handleNextStep()
      console.log('successfully added goal')
    } catch (err) {
      console.error('Error:', err);
    }
  }
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
              <Form onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit( thisYear, saved, invested, cash, digital)
                }}>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control 
                      onChange={(e) => setDigital(e.target.value)}
                      value={digital}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setCash(e.target.value)}
                      value={cash}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setSaved(e.target.value)}
                      value={saved}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setInvested(e.target.value)}
                      value={invested}
                    />
                  </Form.Group>
                  {/* <Button onClick={() => handleNextStep()}>Next</Button>
                  <Button onClick={() => handleSkip()}>Skip for Now</Button> */}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'>
            <Button 
                style={{float:'left'}}
                onClick={() => handleSkip()}>Skip</Button>
            <Button 
                style={{float:'right'}}
                onClick={() => handleSubmit( thisYear, saved, invested, cash, digital)
              }>Continue</Button>
            </div>
        </Row>
      </Container>
    </Container>
  )
}

export function FifthGoal({handleSkip, handleNextStep}) {
  const [thisYear, setThisYear] = useState()
  const [nextYear, setNextYear] = useState()
  const [digital, setDigital] = useState()
  const [cash, setCash] = useState()
  const [invested, setInvested] = useState()
  const [saved, setSaved] = useState()
  const [ createGoals ] = useMutation(CREATE_GOALS)

  useEffect(() => {
    const currentYear = dayjs().year() + 4;
    const nextYear = currentYear + 1;

    // setThisYear(`${currentYear} - ${nextYear}`);
    setThisYear(currentYear)
    setNextYear(nextYear)
  }, [])
  // console.log(thisYear)
  
  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }
    try {
      await createGoals({
        variables: {
          year: thisYear,
          digital: digital,
          cash: cash,
          invested: invested,
          saved: saved
        }
      })
      handleNextStep()
      console.log('successfully added goal')
    } catch (err) {
      console.error('Error:', err);
    }
  }
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
              <Form onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit( thisYear, saved, invested, cash, digital)
                }}>
                  <Form.Group>
                    <Form.Label>Total Digital::</Form.Label>
                    <Form.Control 
                      onChange={(e) => setDigital(e.target.value)}
                      value={digital}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setCash(e.target.value)}
                      value={cash}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Saved:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setSaved(e.target.value)}
                      value={saved}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Total Invested:</Form.Label>
                    <Form.Control 
                      onChange={(e) => setInvested(e.target.value)}
                      value={invested}
                    />
                  </Form.Group>
                  {/* <Button onClick={() => handleNextStep()}>Next</Button>
                  <Button onClick={() => handleSkip()}>Skip for Now</Button> */}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'>
            <Button 
                style={{float:'left'}}
                onClick={() => handleSkip()}>Skip</Button>
            <Button 
                style={{float:'right'}}
                onClick={() => handleSubmit( thisYear, saved, invested, cash, digital)
              }>Continue</Button>
            </div>
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