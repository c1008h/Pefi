import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
// import { setUser } from '../store/slices/authSlice'
import { ADD_USER } from '../utils/mutations';
import { authService } from '../utils/auth';

import { Alert, Container, Row, Col, ProgressBar } from 'react-bootstrap'

import { SignupForm } from '../components/Signup/First/SignupForm';
import Step2 from '../components/Signup/2-Name'
import { FirstGoal, SecondGoal, ThirdGoal, FourthGoal, FifthGoal } from '../components/Signup/3-Goal'
import Financial from '../components/Signup/Fourth/4-Financial';

import '../style/signup.css'
import AuthFormTemplate from '../components/Signup/AuthFormTemplate';
import { ButtonTemplate } from '../components/Landing';
import { FormLayout } from "../components";

import AccountAgreementModal from '../components/Signup/First/AccountAgreementModal';
import PrivacyPolicyModal from '../components/Signup/First/PrivacyPolicyModal';

export default function Signup() {
  const [formState, setFormState] = useState({ email: '', password: '', confirmPass: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false); 
  const [showUserAgreementModal, setShowUserAgreementModal] = useState(false); 

  const [step, setStep] = useState(1);
  const [addUser, { error }] = useMutation(ADD_USER);
  const [now, setNow] = useState(1)
  const [navigationFailed, setNavigationFailed] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleChange = (updatedFormState) =>{ 
    setFormState(updatedFormState)
    setIsButtonDisabled(!(updatedFormState.email && updatedFormState.password && updatedFormState.confirmPass))
  };

  const handleFormSubmit = async (formState) => {
    if(!formState.email || !formState.password || !formState.confirmPass){
      alert('Failed to submit! Please fill all requested fields.');
      document.location.replace('/');
      return;
    }

    try {
      const { data } = await addUser({
        variables: {
          email: formState.email.trim(),
          password: formState.password.trim()
        }
      })

      // dispatch(setUser(data.addUser.user))

      authService.signup(data.addUser.token)
    } catch (e) {
      console.log('unable to add user')
      console.log(e)
    }
  }
  const fields = [
    {
      label: 'Email', name: 'email', type: 'email', value: formState.email, placeholder:"Enter email",
      isInvalid:!formState.email, validationFeedback: "Email is required!"
    },
    {
      label: 'Password', name: 'password', type: 'password', value: formState.password, placeholder:"Enter password",
      isInvalid:!formState.password, validationFeedback: "Password is required!"
    },
    {
      label: 'Confirm Password', name: 'confirmPass', type: 'password', value: formState.confirmPass, placeholder:"Confirm password",
      isInvalid:!formState.confirmPass, validationFeedback: "Password is required!"
    },
  ]
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
      <Container fluid='true' style={styles.container}>
        <Row>
          <Col style={{marginLeft:'5%'}}>
            <h1 style={{color:'white'}}>Create your login</h1>
            <h5 style={{color:'white'}}>We&apos;ll need your email address, and a unique password. You&apos;ll use this to login to access Personal Finance next time.</h5>
          </Col>

          <FormLayout
            title='Signup for PeFi'
            styles={styles}
          >
            <AuthFormTemplate
              fields={fields}
              onSubmit={handleFormSubmit}
              onChange={handleChange}
              disabled={isButtonDisabled}
            >
              <ButtonTemplate 
                title="Continue"
                type='submit'
                btnStyle='round'
                onClick={handleFormSubmit}
                disabled={isButtonDisabled}
              />
            </AuthFormTemplate>


            <AccountAgreementModal 
              show={showUserAgreementModal} 
              onHide={() => setShowUserAgreementModal(false)} 
            />
            <PrivacyPolicyModal 
              show={showPrivacyModal} 
              onHide={() => setShowPrivacyModal(false)} 
            />
            <h5 style={{font:'black', marginTop:'1.5rem'}}>Already started?</h5>
            <Link to='/login'>Login to complete your application</Link>

            <h5 style={{font:'black', marginTop:'3.5'}}>
              By signing up, you agree to the Pefi&apos;s <a onClick={() => setShowUserAgreementModal(true)} style={{textDecoration:'underline'}}>Terms of Use</a> and <a onClick={() => setShowPrivacyModal(true)} style={{textDecoration:'underline'}}>Privacy Policy</a>
            </h5>
          </FormLayout>
        </Row>

      </Container>

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

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh', 
    background: `url('/galaxy.jpg') no-repeat center center fixed`,
    backgroundSize: 'cover',
    justifyContent:'center',
    alignItems: 'center', 
  },
  formContainer: {
    height:'50%',
    width:'70%'
  },
  title: {
    color:'white',
    fontWeight:'bold'
  },
  card: {
    padding:'3% 5% 3% 5%',
    margin: '3% 15%'
  }

}

const formStyle = {
  form: {
    padding:'15%', justifyContent:'center'
  },
}