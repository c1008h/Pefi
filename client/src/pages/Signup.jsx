import { useState, createContext, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { authService } from '../utils/auth';
import { Alert, Button } from 'react-bootstrap'

import { SignupForm } from '../components/Signup/SignupForm';
import Step2 from '../components/Signup/2-Name'
import { FirstGoal, SecondGoal, ThirdGoal, FourthGoal, FifthGoal } from '../components/Signup/3-Goal'

const ButtonContext = createContext();

export function useButton() {
  return useContext(ButtonContext);
}

export default function Signup({ children }) {
  const [step, setStep] = useState(1);
  const [addUser, { error }] = useMutation(ADD_USER);
  const [buttonState, setButtonState] = useState(false);
  const toggleButtonState = () => {
    setButtonState(!buttonState);
  };
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
      <ButtonContext.Provider value={{ buttonState, toggleButtonState }}>
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

        <div style={{padding:'5%'}}>
          <Button
            onClick={() => handleSkip()}
            style={{float:'left'}}
          >Skip</Button>
          <Button
            onClick={() => handleNextStep()}
            style={{float:'right'}}
          >Next</Button>
        </div>
      </ButtonContext.Provider>
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
