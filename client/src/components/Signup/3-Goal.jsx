import { useState, useEffect } from 'react';
import  { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'; 
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

  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }
    try {
      const year = parseInt(thisYear);

      if (isNaN(year)) {
        console.error('Invalid year:', thisYear);
        return; 
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
                <Card className='form-card'>
                  <Form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit( digital, cash, invested, saved, thisYear )
                  }}>
                    <Form.Group>
                      <Form.Label>Total Digital::</Form.Label>
                        <Form.Control 
                          onChange={(e) => setDigital(e.target.value)}
                          type='number' name='digital'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Cash:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setCash(e.target.value)}
                          type='number' name='cash'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Saved:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setSaved(e.target.value)}
                          type='number' name='saved'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Invested:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setInvested(e.target.value)} type='number' name='invested'
                        />
                    </Form.Group>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'>
            <Button 
              className='skip-btn'
              onClick={() => handleSkip()}>Skip</Button>
            <Button 
              className='continue-btn'
              onClick={() => handleSubmit( digital, cash, invested, saved, thisYear)}
            >Continue</Button>
            </div>
        </Row>
      </Container>
    </Container>
  )
}

export function SecondGoal({handleSkip, handleNextStep}) {
  const [thisYear, setThisYear] = useState()
  const [nextYear, setNextYear] = useState()
  const [digital, setDigital] = useState(0)
  const [cash, setCash] = useState(0)
  const [invested, setInvested] = useState(0)
  const [saved, setSaved] = useState(0)
  const [ createGoals ] = useMutation(CREATE_GOALS)

  useEffect(() => {
    const currentYear = dayjs().year() + 1;
    const nextYear = currentYear + 1;

    setThisYear(currentYear)
    // setThisYear(`${currentYear} - ${nextYear}`);
    setNextYear(nextYear)
  }, [])
  
  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }
    try {
      const year = parseInt(thisYear);

      if (isNaN(year)) {
        console.error('Invalid year:', thisYear);
        return; 
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
      <Container>
        <Row>
          <Col>
            <h2>Your Financial Goals for {nextYear}:</h2>
            <p>
              Now, let&rsquo;s focus on your financial goals for the upcoming year, {nextYear}.
              These goals should be aligned with your long-term vision and the goals you&rsquo;ve
              set for {thisYear}. Think about specific financial achievements you&rsquo;d like to
              reach in the next year.
            </p>
            <h5>Setting Effective Financial Goals:</h5>
            <ul style={{textAlign:'left'}}>
              <li>
                Be Specific: Clearly define what you want to achieve with your finances in {nextYear}. The more specific, the better.
              </li>
              <li>
                Prioritize: Consider what matters most to you financially. Are you
                prioritizing savings, investments, or paying off debt?
              </li>
              <li>
                Realistic Goals: Ensure your goals are challenging but achievable based on
                your current financial situation.
              </li>
              <li>
                Break It Down: Break larger goals into smaller, manageable steps. This
                makes the process less overwhelming.
              </li>
              <li>
                Measurable Goals: Set goals that you can measure, so you can track your
                progress.
              </li>
            </ul>
          </Col>
          <Col>
            <Row>
                <Col>
                  <h2>Your Financial Goals for {nextYear}:</h2>
                  <p>
                    Now, let&rsquo;s focus on your financial goals for the upcoming year,
                    {nextYear}. These goals should be aligned with your long-term
                    vision and the goals you&rsquo;ve set for {thisYear}. Think about
                    specific financial achievements you&rsquo;d like to reach in the next
                    year.
                  </p>
                </Col>
            </Row>
            <Row>
              <Col>
                <Card className='form-card'>
                  <Form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit( digital, cash, invested, saved, thisYear )
                  }}>
                    <Form.Group>
                      <Form.Label>Total Digital::</Form.Label>
                        <Form.Control 
                          onChange={(e) => setDigital(e.target.value)}
                          type='number' name='digital'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Cash:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setCash(e.target.value)} type='number' name='cash'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Saved:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setSaved(e.target.value)} type='number' name='saved'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Invested:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setInvested(e.target.value)} type='number' name='invested'
                        />
                    </Form.Group>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'> 
            <Button 
              className='skip-btn'
              onClick={() => handleSkip()}>Skip</Button>
            <Button 
              className='continue-btn'
              onClick={() => handleSubmit( digital, cash, invested, saved, thisYear)
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
  
  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }

    try {
      const year = parseInt(thisYear);

      if (isNaN(year)) {
        console.error('Invalid year:', thisYear);
        return; 
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
      <Container>
        <Row>
          <Col>
            <h2>Your Financial Goals for {nextYear}:</h2>
            <p>
              Let&rsquo;s continue planning for the future. What are your financial goals for
              {nextYear}? These goals can be both short-term and long-term. Be specific
              about what you want to achieve.
            </p>
            <h5>Tips for Setting Yearly Financial Goals:</h5>
            <ul>
              <li>
                Review Your Progress: Reflect on the financial goals you&rsquo;ve set for the
                current year. What did you achieve? What can you improve next year?
              </li>
              <li>
                New Opportunities: Think about any new financial opportunities or
                challenges you anticipate in {nextYear}.
              </li>
              <li>
                Emergency Fund: Consider allocating a portion of your financial goals to
                building or replenishing your emergency fund.
              </li>
              <li>
                Diversify Goals: Don&rsquo;t put all your financial goals into one basket. Diversify
                your goals across savings, investments, and debt reduction.
              </li>
            </ul>
          </Col>
          <Col>
            <Row>
              <Col>
                <h2>Your Financial Goals for {nextYear}:</h2>
                <p>
                  Let&rsquo;s continue planning for the future. What are your financial
                  goals for {nextYear}? These goals can be both short-term and
                  long-term. Be specific about what you want to achieve.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className='form-card'>
                  <Form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit( digital, cash, invested, saved, thisYear )
                  }}>
                    <Form.Group>
                      <Form.Label>Total Digital::</Form.Label>
                        <Form.Control 
                          onChange={(e) => setDigital(e.target.value)} type='number' name='digital'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Cash:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setCash(e.target.value)} type='number' name='cash'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Saved:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setSaved(e.target.value)} type='number' name='saved'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Invested:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setInvested(e.target.value)} type='number' name='invested'
                        />
                    </Form.Group>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'>
            <Button 
              className='skip-btn'
              onClick={() => handleSkip()}>Skip</Button>
            <Button 
              className='continue-btn'
              onClick={() => handleSubmit( digital, cash, invested, saved, thisYear)
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
  
  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }

    try {
      const year = parseInt(thisYear);

      if (isNaN(year)) {
        console.error('Invalid year:', thisYear);
        return; 
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
      <Container>
        <Row>
          <Col>
            <h2>Your Financial Goals for {nextYear}:</h2>
            <p>
              What do you envision for your finances in {nextYear + 1}? This is an
              opportunity to set ambitious goals. Consider what you can achieve over the
              next few years.
            </p>
            <h5>Planning for Longer-Term Financial Success:</h5>
            <ul>
              <li>
                Long-Term Goals: In addition to {nextYear}, think about your financial
                goals for the next few years. Where do you want to be financially?
              </li>
              <li>
                Retirement Planning: If you haven&rsquo;t already, consider setting long-term
                retirement savings goals.
              </li>
              <li>
                Budget Adjustments: Are there any adjustments you need to make to your
                budget to achieve your longer-term goals?
              </li>
              <li>
                Professional Advice: If necessary, consult with a financial advisor to
                help you plan for the long term.
              </li>
            </ul>
          </Col>
          <Col>
            <Row>
              <Col>
                <h2>Your Financial Goals for {nextYear}:</h2>
                <p>
                  What do you envision for your finances in {nextYear + 1}? This
                  is an opportunity to set ambitious goals. Consider what you can
                  achieve over the next few years.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className='form-card'>
                  <Form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit( digital, cash, invested, saved, thisYear )
                  }}>
                    <Form.Group>
                      <Form.Label>Total Digital::</Form.Label>
                        <Form.Control 
                          onChange={(e) => setDigital(e.target.value)}
                          type='number' name='digital'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Cash:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setCash(e.target.value)} type='number' name='cash'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Saved:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setSaved(e.target.value)} type='number' name='saved'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Invested:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setInvested(e.target.value)} type='number' name='invested'
                        />
                    </Form.Group>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'>
            <Button 
              className='skip-btn'
              onClick={() => handleSkip()}>Skip</Button>
            <Button 
              className='continue-btn'
              onClick={() => handleSubmit( digital, cash, invested, saved, thisYear )}
            >Continue</Button>
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
  // const navigate = useNavigate();

  const handleSubmit = async (digital, cash, invested, saved, thisYear) => {
    console.log('handle add goal')
    if(!thisYear || !digital || !cash || !invested || !saved) {
      console.log('need to fill out form')
    }

    try {
      const year = parseInt(thisYear);

      if (isNaN(year)) {
        console.error('Invalid year:', thisYear);
        return; 
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
      console.log('successfully added goal')
      handleNextStep()
    } catch (err) {
      console.error('Error:', err);
    }
  }
  return (
    <Container fluid='true'>
      <Container>
        <Row>
          <Col>
            <h2>Your Financial Goals for {nextYear}:</h2>
            <p>
              As we look even further ahead, what are your financial dreams for {nextYear
              + 1}? This is your chance to set long-term goals and plan for the future.
            </p>
            <h5>Setting Long-Term Financial Goals:</h5>
            <ul>
              <li>
                Life Milestones: Think about major life milestones you anticipate in the
                coming years, such as buying a home, starting a family, or pursuing
                advanced education.
              </li>
              <li>
                Investment Strategies: Consider long-term investment strategies that align
                with your goals.
              </li>
              <li>
                Emergency Preparedness: Continue building your emergency fund to provide
                financial security for unexpected events.
              </li>
              <li>
                Estate Planning: If applicable, start thinking about estate planning and
                how your financial goals fit into your overall legacy.
              </li>
            </ul>
          </Col>
          <Col>
            <Row>
              <Col>
                <h2>Your Financial Goals for {nextYear}:</h2>
                <p>
                  As we look even further ahead, what are your financial dreams
                  for {nextYear + 1}? This is your chance to set long-term goals
                  and plan for the future.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className='form-card'>
                  <Form onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit( digital, cash, invested, saved, thisYear )
                  }}>
                    <Form.Group>
                      <Form.Label>Total Digital::</Form.Label>
                        <Form.Control 
                          onChange={(e) => setDigital(e.target.value)}
                          type='number' name='digital'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Cash:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setCash(e.target.value)} type='number' name='cash'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Saved:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setSaved(e.target.value)} type='number' name='saved'
                        />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Total Invested:</Form.Label>
                        <Form.Control 
                          onChange={(e) => setInvested(e.target.value)} type='number' name='invested'
                        />
                    </Form.Group>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className='btn-container'>
            <Button 
              className='skip-btn'
              onClick={() => {
                // e.preventDefault()
                handleSkip()}}
              >Skip</Button>
            <Button 
              className='continue-btn'
              onClick={(e) => {
                e.preventDefault()
                handleSubmit(digital, cash, invested, saved, thisYear)
              }}
            >Continue</Button>
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