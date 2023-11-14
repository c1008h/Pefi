import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import  {authService } from '../utils/auth'
import { Dashboard } from './index';
import '../style/index.css'
import { useDispatch, useSelector } from 'react-redux';
import {isAuthenticated, user } from '../features/auth/authSlice'
import { ContainerTemplate, CardTemplate } from '../components/Landing/index'
import { benefitData, featureData, testimonialData } from '../constants/landingData';

export default function Welcome() {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    return (
        <div>
            {/* {authService.loggedIn() ? ( */}
            {isAuthenticated ? (
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

                    <ContainerTemplate title="Benefits: ">
                        {benefitData.map((item, index) => (
                            <CardTemplate key={index} row={true} header={item.header} body={item.description} />
                        ))}
                    </ContainerTemplate>
                    <ContainerTemplate title="Features" >
                        {featureData.map((item, index) => (
                            <CardTemplate key={index} body={item.description} row={true} />
                        ))}
                    </ContainerTemplate>
                    <ContainerTemplate title="Testimonials">
                        {testimonialData.map((item, index) => (
                            <CardTemplate key={index} body={` "${item.description}" `} row={true}/>
                        ))}
                    </ContainerTemplate>

                    <ContainerTemplate title="Start Your Financial Journey Today!" style='bottomContainer'>
                    <Link to='/signup'>
                            <button style={{marginTop:'2%'}}>Get Started</button>
                        </Link>
                    </ContainerTemplate>
  

                    {/* <Container className='content-containers' fluid='true' style={{justifyContent:'center', textAlign:'center'}}>
                        <h3>Start Your Financial Journey Today!</h3>
                        <Link to='/signup'>
                            <button style={{marginTop:'2%'}}>Get Started</button>
                        </Link>
                    </Container> */}
                </div>
            )}
        </div>
    )
}