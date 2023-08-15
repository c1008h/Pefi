import { Link } from 'react-router-dom'
import {Container, Card, Row, Col} from 'react-bootstrap'
import  {authService } from '../utils/auth'
import { Dashboard } from './Dashboard';
import '../style/index.css'

export const Welcome = () => {
    return (
        <div style={{margin:'5px', padding: '5px'}}>
            {authService.loggedIn() ? (
                <Dashboard/>
                ) : (
                <div>
                    <Container fluid='true' style={{justifyContent:'center', textAlign:'center', padding: '5%', margin: '5%'}}>
                        <h1>Empower Your Financial Journey</h1>
                        <p>Track Expenses, Set Goals, Visualize Income</p>
                        <Link to='/signup'>
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
                                    <Card.Header>Track Expenses and Incomes</Card.Header>
                                    <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Header>Track Expenses and Incomes</Card.Header>
                                    <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
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
                                <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
                                </Card>
                            </Col>
                            <Col>
                            <Card>
                                <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid='true' className='content-containers'>
                        <h2>Testimonials</h2>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
                                </Card>
                            </Col>
                            <Col>
                            <Card>
                                <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
                                </Card>
                            </Col>
                            <Col>
                            <Card>
                                <Card.Body>Effortlessly input your expenses and income, gaining insights into your spending habits.</Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Container className='content-containers' fluid='true' style={{justifyContent:'center', textAlign:'center'}}>
                        <h3>Start Your Financial Journey Today!</h3>
                        <Link to='/signup'>
                            <button>Get Started</button>
                        </Link>
                    </Container>
                </div>
            )}
        </div>
    )
}