import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from '@apollo/client';
import { authService } from "../utils/auth";
import { Alert } from 'react-bootstrap'
import { LOGIN_A_USER } from "../utils/mutations";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice'
import { Container } from 'react-bootstrap'
import { FormLayout, FormTemplate, AuthFormTemplate, ButtonTemplate } from "../components";

export default function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { email, password } = formState;

  const [login, { error }] = useMutation(LOGIN_A_USER);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("Is authenticated:", isAuthenticated)

  const handleChange = (updatedFormState) =>{ 
    setFormState(updatedFormState)
    setIsButtonDisabled(!(updatedFormState.email && updatedFormState.password))
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    if (!email || !password) {
      alert('Failed to submit form! Please fill all requested fields.');
      document.location.replace('/');
    }

    try {
      const { data } = await login({ variables: { email, password } });

      dispatch(loginUser(data.login.user))
      // console.log('data', data.login.user)
      // console.log('user', user)
      // console.log('first', isAuthenticated)
      authService.login(data.login.token)
    } catch (e) {
      console.log(e);
    }

    setFormState({ email: '', password: '' });
  };

  const fields = [
    {
      label: 'Email', name: 'email', type: 'email', value: formState.email, placeholder:"Enter email",
      onChange: handleChange, isInvalid:!formState.email, validationFeedback: "Email is required!"
    },
    {
      label: 'Password', name: 'password', type: 'password', value: formState.password, placeholder:"Enter password",
      onChange: handleChange, isInvalid:!formState.password, validationFeedback: "Password is required!"
    },
  ]

  return (
    <div>
      {authService.loggedIn() ? (
      <p>
        Success! You may now head{' '}
        <Link to="/">back to the homepage.</Link>
      </p>
      ) : (
        <Container fluid='true' style={styles.container}>
          {/* <Row style={containerStyle}> */}
            {/* <Col style={{padding:'0', margin: '0'}}>
              <img src='/earth.jpg' alt='earth' style={imageStyles}/>
            </Col> */}
            {/* <Col> */}
          <FormLayout 
            title='Log in to Pefi' 
            styles={styles}
          >
            <AuthFormTemplate 
              fields={fields}
              onSubmit={handleFormSubmit}
              onChange={handleChange}
              disabled={isButtonDisabled}  
            >
              <ButtonTemplate 
                title="Log in" 
                type="submit" 
                btnStyle="round" 
                onClick={handleFormSubmit}
                disabled={isButtonDisabled}
              />
            </AuthFormTemplate>
            <div>
              <h5 style={{textAlign:'center', margin:'2.5rem', fontWeight:'bold'}}>
                 OR
              </h5>
              <h5>Not on Pefi? <Link to='/signup'>Create an account</Link></h5>
            </div>
          </FormLayout>
        </Container>
      )}

      {error && (
        <Alert severity='error'>
          {error.message}
        </Alert>       
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh', 
    background: `url('/earth.jpg') no-repeat center center fixed`,
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