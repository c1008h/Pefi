import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container, Col, Button, ProgressBar } from 'react-bootstrap';
import { RowTemplate, FormLayout, AuthFormTemplate } from '../components';
import { ButtonTemplate } from '../components/Landing';
import { useMutation } from '@apollo/client';
import { CREATE_GOALS, UPDATE_USER, CREATE_NETWORTH, ADD_USER, CREATE_FINANCE } from '../utils/mutations';
import dayjs from 'dayjs';
import { onboardingScreenData, currentFinancialInfo, userInformation, goalInformation, financialScreenData } from '../constants/onboardingData'

export default function OnBoarding({ children }) {
    const [userDataState, setUserDataState] = useState({ firstName: '', lastName: '', birthday: '', gender: '', location:''})
    const [formState, setFormState] = useState({ digital: 0, cash: 0, invested: 0, saved: 0 })
    const [userFinancial, setUserFinancial] = useState({ incomeLevel: 0, currentDigital:0, currentCash: 0, currentSaved:0, currentInvested: 0 })
    const [thisYear, setThisYear] = useState(dayjs().year());
    const [nextYear, setNextYear] = useState()
    
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");

    const [step, setStep] = useState(0);
    const [now, setNow] = useState(1)
    const [navigationFailed, setNavigationFailed] = useState(false); 

    const [ createGoals ] = useMutation(CREATE_GOALS)
    const [ updateUser ] = useMutation(UPDATE_USER)
    const [ createNetworth ] = useMutation(CREATE_NETWORTH)
    const [ createFinance ] = useMutation(CREATE_FINANCE)
      const [addUser, { error }] = useMutation(ADD_USER);
    const onboardingScreenDatas = onboardingScreenData(thisYear);

    const navigate = useNavigate();

    useEffect(() => {
      const currentYear = dayjs().year();
      const nextYear = currentYear + 1;
  
      setThisYear(currentYear)
      setNextYear(nextYear)
    }, [])

    const handleNextStep = () => {
        if (step === onboardingScreenDatas.length - 1) {
          try {
            navigate('/dashboard')
          } catch (error) {
            console.log('Error:', error)
            setNavigationFailed(true)
          }
        }
        setStep(step + 1);
        setNow((step * 25) + 10)
        setThisYear((year) => year + 1); 
    };
      
    const handleSkip = () => {
        if (step >= onboardingScreenDatas.length - 1) {
            try {
                navigate('/dashboard')
            } catch (error) {
                console.log('Error:', error)
                setNavigationFailed(true)
            }
        } else {
            setStep(step + 1);
            setNow((step * 25) + 10)
            setThisYear((year) => year + 1); 
        }
    };

    const handleSubmitInfo = async (userDataState) => {
        console.log(userDataState)
    
        if (!userDataState.firstName || !userDataState.lastName) {
            console.error('Error: Required fields are empty');
            setFirstNameError("Please enter your first name.");
            setLastNameError("Please enter your last name.");
            return;
        }
        try {
            await updateUser({
                variables: {
                    firstName: userDataState.firstName.trim(),
                    lastName: userDataState.lastName.trim(),
                    birthday: userDataState.birthday,
                    gender: userDataState.gender.trim(),
                    location: userDataState.location.trim()
                }
            })
            handleNextStep()
            console.log('successfully saved user information!')
        } catch (error) {
            console.error('Error:', error)
        }
    };
    const handleChangeUserInfo = (updatedUserDataState) => {
        setUserDataState((prevUserDataState) => ({
          ...prevUserDataState,
          ...updatedUserDataState,
        }));
    };    
    const handleSubmitGoal = async (formState, thisYear) => {
        if(!thisYear || !formState.digital || !formState.cash || !formState.invested || !formState.saved) {
            // console.log('need to fill out form')
            return
        }
        try {
            const year = parseInt(thisYear);
            if (isNaN(year)) {
                console.error('Invalid year:', year);
                return; 
            }
  
        await createGoals({
          variables: { 
            input: {
              year: parseInt(year),
              digital: parseFloat(formState.digital),
              cash: parseFloat(formState.cash),
              invested: parseFloat(formState.invested),
              saved: parseFloat(formState.saved)
            }
          }
        })
        handleNextStep()
        console.log('successfully added goal')
      } catch (err) {
        console.error('Error:', err);
      }
    }
    const handleChangeUserGoal = (updatedUserGoalState) => {
        setFormState((prevUserGoalState) => ({
            ...prevUserGoalState,
            ...updatedUserGoalState
        }))
    }

    const handleSubmitFinance = async (thisYear, userFinancial) => {
        try {
          await updateUser({
            variables: {
              incomeLevel: userFinancial.incomeLevel
            }
          })
          await createFinance({
            variables: { input: {
              digital: parseFloat(userFinancial.currentDigital),
              cash: parseFloat(userFinancial.currentCash),
              invested: parseFloat(userFinancial.currentInvested),
              saved: parseFloat(userFinancial.currentSaved)
            }}
          })
          await createNetworth({
            variables: {
              year: parseFloat(thisYear),
              digital: parseFloat(currentDigital),
              cash: parseFloat(currentCash),
              invested: parseFloat(currentInvested),
              saved: parseFloat(currentSaved)
            }
          })
    
          // dispatch(updateCash(currentCash))
          // dispatch(updateDigital(currentDigital))
          // dispatch(updateInvested(currentInvested))
          // dispatch(updateSaved(currentSaved))
          // dispatch(updateNetworth());
    
          await handleNextStep()
          console.log('successful')
        } catch (error) {
          console.log('Error:', error)
        }
    }

    const handleChangeUserFinances = (updatedUserFinanceState) => {
        setUserFinancial((prevUserFinanceState) => ({
            ...prevUserFinanceState,
            ...updatedUserFinanceState
        }))
    }

    const handleButtonClick = () => {
        if (step === 0) {
          handleSubmitInfo(userDataState);
        } else if (step > 0 && step < 7) {
          handleSubmitGoal(formState, thisYear);
        } else if (step === 7) {
          handleChangeUserFinances(userFinancial, thisYear)
        }
      };
    const leftContent = onboardingScreenDatas[step].leftContent || [];
    const rightContent = onboardingScreenDatas[step].rightContent || [];

    return (
        <Container fluid='true' className='upper-container'>
           {step === 0 && (
                <>
                <RowTemplate templateContent={firstRow[0]}/>
                <RowTemplate templateContent={secondRow[0]}>
                  <img src="[Profile Picture Placeholder]" alt="Profile" />
                  <Button variant="secondary">Upload Profile Picture</Button>
                </RowTemplate>
                <RowTemplate templateContent={thirdRow[0]}/>
                    <FormLayout
                        styles={nameStyles}
                        title={null}
                        innerTitle="Enter Your Information"
                    >
                        <AuthFormTemplate fields={userInformation(userDataState)} onSubmit={handleSubmitInfo} onChange={(updatedUserDataState) => handleChangeUserInfo(updatedUserDataState)} />
                    </FormLayout>
                <RowTemplate templateContent={fourthRow}/>
                </>
            )}
            {step > 0 && step < 7 && (
                <div style={{flexDirection:'row', display:'flex'}}>
                    <Col>
                        <RowTemplate 
                            templateContent={leftContent}
                        />
                    </Col>

                    <Col style={{flexDirection:'column'}}>
                        <RowTemplate 
                            templateContent={rightContent}
                        />
                        <FormLayout title={`What are your financial goals for ${thisYear}`} styles={formStyle}>
                            <AuthFormTemplate 
                                fields={goalInformation(formState)}
                                onSubmit={handleSubmitGoal}
                                onChange={(updatedUserGoalState => handleChangeUserGoal(updatedUserGoalState))}
                            />
                        </FormLayout>
                    </Col>
                </div>
            )} 
            {step === 7 && (
                <>
                    <h1>Financial Information</h1>
                    <div style={{display:'flex', justifyContent: 'space-evenly'}}>
                        <Col>
                            <RowTemplate templateContent={financialScreenData[0].leftContent}/>
                        </Col>
                        <Col style={{flexDirection:'column'}}>
                            <RowTemplate templateContent={financialScreenData[0].rightContent} />
                            <FormLayout styles={formStyle} title=' '>
                                <AuthFormTemplate 
                                    // onSubmit={handleSubmitGoal}
                                    fields={currentFinancialInfo}
                                />
                            </FormLayout>
                        </Col>
                    </div>
                </>
            )}
            {step === 7 && navigationFailed && (
                <p>
                    Success! You may now head{' '}
                    <Link to="/dashboard">Back to the homepage.</Link>
                </p>
            )} 

            <div className='btn-container' style={{display:'flex', flexDirection:'row', justifyContent: 'space-evenly'}}>
                <ButtonTemplate onClick={() => handleSkip()} title="Skip" btnStyle="round" />              
                <ButtonTemplate onClick={() => handleButtonClick()} title="Continue" btnStyle="round"/>
            </div>
            <ProgressBar now={now} label={`${now}%`} visuallyHidden />

        </Container>
    )
}
const firstRow = [{ h1:"Welcome to Pefi!", description: ["You're one step closer to achieving your financial goals.", 'Let\'s start by personalizing your account.'] }]
const secondRow = [ { h2: "Upload Profile Picture" } ]
const thirdRow = [{ h2:"Personalize Your Account", description: ["Your first and last name will help us address you personally and make your experience more tailored to you.", 'Rest assured, your personal information is safe with us. We value your privacy and won&rsquo;t share your data with anyone.'] }]
const fourthRow = [{ h2:"Financial Fun Fact", description: ["Did you know that making small changes in your daily spending habits can lead to significant savings over time? We&rsquo;re here to help you make those positive changes!"]}]
  
const formStyle = {
    formContainer: {
        display:'flex',
        flexDirection:'column'
    },
    title: {
      fontWeight:'bold'
    },
    card: {
      textAlign:'left',
      padding: '3% 5% 3% 5%'
    }
}

const nameStyles = {
    formContainer: {
  
  
    },
    title: {
      fontWeight:'bold'
    },
    card: {
      textAlign:'left',
      padding: '3% 5% 3% 5%'
    }
}

