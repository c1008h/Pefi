"use client"

import Link from 'next/link'
import { Container, Card, Row, Col } from 'react-bootstrap'

export default function Home() {
  return (
   <>
    <Container fluid='true' style={{justifyContent:'center', textAlign:'center', padding: '5%', margin: '5%'}}>
        <h1>Empower Your Financial Journey</h1>
        <p>Track Expenses, Set Goals, Visualize Income</p>
        <Link href='/signup'>
            <button>Get Started</button>
        </Link>
    </Container>

    <Container className='content-containers' fluid='true'>
        <h2>Benefits:</h2>
        <Row>
            <Col>
                <Card >
                    <Card.Header>Track Expenses and Incomes</Card.Header>
                    <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header>Set Financial Goals</Card.Header>
                    <Card.Body>Define your financial objectives and track your
                        progress toward achieving them.</Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header>Visualize Your Income</Card.Header>
                    <Card.Body>Get a clear picture of your income sources and
                        better manage your finances.</Card.Body>
                </Card>
            </Col>
        </Row>

    </Container>
    <Container fluid='true' className='content-containers'>
        <h2>Features</h2>
        <Row>
            <Col>
                <Card>
                    <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>                                        
                        Set and manage your financial goals with ease.
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>              
                        Visualize your income sources through graphs and charts.
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>

    <Container fluid='true' className='content-containers'>
        <h2>Testimonials</h2>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                    &quot;This app has been a game-changer for my
                        finances. I can finally see where my money is
                        going and set realistic goals.&quot;
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        &quot;I love how easy it is to track my expenses and income. The visualizations are fantastic.&quot;
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        &quot;Financial planning has never been this straightforward. Highly recommend!&quot;                                  
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    <Container className='content-containers' fluid='true' style={{justifyContent:'center', textAlign:'center'}}>
        <h3>Start Your Financial Journey Today!</h3>
        <Link href='/signup'>
            <button style={{marginTop:'2%'}}>Get Started</button>
        </Link>
    </Container>
   </>
  )
}
