import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { authService } from '../utils/auth';

import { Alert } from 'react-bootstrap'
import { SignupForm } from '../components/Signup/SignupForm';
import Step2 from '../components/Signup/2-Name'
import { FirstGoal, SecondGoal, ThirdGoal, FourthGoal, FifthGoal } from '../components/Signup/3-Goal'

export default function Signup() {
  const [step, setStep] = useState(1);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handleSkip = () => {
    setStep(step + 1)
  };

  const handleFormSubmit = async (email, password) => {
    if(!email || !password){
      alert('Failed to submit! Please fill all requested fields.');
      document.location.replace('/');
      // return;
    }

    try {
      const { data } = await addUser({
        variables: {
          email: email.trim(),
          password: password.trim()
        }
      })
  
      authService.login(data.addUser.token)
    } catch (e) {
      console.log('unable to add user')
      console.log(e)
    }
  }
  
  return (
    <>
     {/* {authService.loggedIn() ? (
      <p>
        Success! You may now head{' '}
        <Link to='/dashboard'>Back to the homepage.</Link>
      </p>
    ) : ( */}
      {/* // <SignupForm onSubmit={handleFormSubmit}/> */}
      {step === 1 && (
        <Step2 
          handleNextStep={handleNextStep}
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
    
    {/* )}  */}

    {/* {error && (
      <div>
          <Alert severity='error'>
            {error.message}
          </Alert>
      </div>
    )} */}
    </>
  );
}
