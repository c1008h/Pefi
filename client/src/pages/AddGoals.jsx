import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice'
import { ADD_USER } from '../utils/mutations';
import { authService } from '../utils/auth';
import { Alert, ProgressBar } from 'react-bootstrap'
// import { LoginForm } from '../components/Signup/First/SignupForm';
import { FirstGoal, SecondGoal, ThirdGoal, FourthGoal, FifthGoal } from '../components/Signup/3-Goal'
import '../style/signup.css'

export default function Signup() {
  const [step, setStep] = useState(1);
  const [addUser, { error }] = useMutation(ADD_USER);
  const [now, setNow] = useState(1)
  const [navigationFailed, setNavigationFailed] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNextStep = () => {
    if (step === 5) {
      try {
        navigate('/dashboard')
      } catch (error) {
        console.log('Error:', error)
        setNavigationFailed(true)
      }
    }
    setStep(step + 1);
    setNow((step * 20) + 2)
  };
  
  const handleSkip = () => {
    if (step > 4) {
      try {
        navigate('/dashboard')
      } catch (error) {
        console.log('Error:', error)
        setNavigationFailed(true)
      }
    }
    setStep(step + 1);
    setNow((step * 20) + 2)
  };

//   console.log('now:', now)
//   console.log('step:', step)

  return (
    <>
     {authService.loggedIn() ? (
      <>
        {step === 1 && (
          <FirstGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 2 && (
          <SecondGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 3 && (
          <ThirdGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 4 && (
          <FourthGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 5 && (
          <FifthGoal 
            handleNextStep={handleNextStep}
            handleSkip={handleSkip}
          />
        )}
        {step === 6 && navigationFailed && (
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
