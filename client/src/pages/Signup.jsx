import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { authService } from '../utils/auth';
import { Alert, ProgressBar } from 'react-bootstrap'

import { SignupForm } from '../components/Signup/SignupForm';
import Step2 from '../components/Signup/2-Name'
import { FirstGoal, SecondGoal, ThirdGoal, FourthGoal, FifthGoal } from '../components/Signup/3-Goal'
import Financial from '../components/Signup/4-Financial';

import '../style/signup.css'

export default function Signup() {
  const [step, setStep] = useState(1);
  const [addUser, { error }] = useMutation(ADD_USER);
  const [now, setNow] = useState(1)
  const [navigationFailed, setNavigationFailed] = useState(false); 
  const navigate = useNavigate();

  const handleNextStep = () => {
    // console.log('Entering handleNextStep. Step:', step);

    if (step === 7) {
      // console.log('Condition met. Navigating to /dashboard. Step:', step);
      try {
        navigate('/dashboard')
      } catch (error) {
        console.log('Error:', error)
        setNavigationFailed(true)
      }
    }
    setStep(step + 1);
    setNow((step * 13) + 10)
  };
  
  const handleSkip = () => {
    if (step > 6) {
      try {
        navigate('/dashboard')
      } catch (error) {
        console.log('Error:', error)
        setNavigationFailed(true)
      }
    }
    setStep(step + 1);
    setNow((step * 13) + 10)
  };

  console.log('now:', now)
  console.log('step:', step)

  const handleFormSubmit = async (email, password) => {
    if(!email || !password){
      alert('Failed to submit! Please fill all requested fields.');
      document.location.replace('/');
      return;
    }

    try {
      const { data } = await addUser({
        variables: {
          email: email.trim(),
          password: password.trim()
        }
      })
  
      authService.signup(data.addUser.token)
    } catch (e) {
      console.log('unable to add user')
      console.log(e)
    }
  }
  
  return (
    <>
     {authService.loggedIn() ? (
      <>
      {/* <p>
        Success! You may now head{' '}
        <Link to='/dashboard'>Back to the homepage.</Link>
      </p> */}
        {step === 1 && (
          <Step2 
            handleNextStep={handleNextStep}
            step={step}
            handleSkip={handleSkip}
          />
        )}
        {step === 2 && (
          <FirstGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 3 && (
          <SecondGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 4 && (
          <ThirdGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 5 && (
          <FourthGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 6 && (
          <FifthGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 7 && (
          <Financial 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 7 && navigationFailed && (
          <p>
            Success! You may now head{' '}
            <Link to="/dashboard">Back to the homepage.</Link>
          </p>
        )}

        <ProgressBar now={now} label={`${now}%`} visuallyHidden />
      </>
    ) : ( 
     <SignupForm onSubmit={handleFormSubmit}/>
    )}

    {error && (
      <div>
          <Alert severity='error'>
            {error.message}
          </Alert>
      </div>
    )} 
    </>
  );
}
