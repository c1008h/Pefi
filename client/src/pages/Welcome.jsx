import { Link } from 'react-router-dom'
import  {authService } from '../utils/auth'
import { Dashboard } from './index';
import '../style/index.css'
import { useDispatch, useSelector } from 'react-redux';
import {isAuthenticated, user } from '../features/auth/authSlice'
import { ContainerTemplate, CardTemplate, ButtonTemplate } from '../components'
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
                    <ContainerTemplate style="topContainerStyle">
                        <h1>Empower Your Financial Journey</h1>
                        <p>Track Expenses, Set Goals, Visualize Income</p>
                        <ButtonTemplate location='signup' title='Get Started' btnStyle='navyBtns' />
                    </ContainerTemplate>

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

                    <ContainerTemplate style='bottomContainer'>
                        <h3>Start Your Financial Journey Today!</h3>
                        <ButtonTemplate location='signup' title='Get Started' btnStyle='navyBtns' />
                    </ContainerTemplate>
                </div>
            )}
        </div>
    )
}