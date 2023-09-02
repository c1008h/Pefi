import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from '@apollo/client';
import { authService } from "../utils/auth";
import LoginForm from '../components/Login/LoginForm'
import { Alert } from 'react-bootstrap'
import { LOGIN_USER } from '../utils/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/slices/authSlice'

export default function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
        ...formState,
        [name]: value,
    });
};
const user = useSelector((state) => state.auth.user);
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

// submit form
const handleFormSubmit = async (e) => {
  e.preventDefault();
  console.log(formState);

  if (!formState.email || !formState.password) {
    alert('Failed to submit form! Please fill all requested fields.');
    document.location.replace('/');
  }

  try {
    const { data } = await login({
      variables: { ...formState },
    });

    dispatch(setUser(data.login.user))

// console.log('data', data.login.user)
// console.log('user', user)
// console.log('first', isAuthenticated)

    authService.login(data.login.token)
  } catch (e) {
    console.log(e);
  }

  // clear form values
  setFormState({
    email: '',
    password: '',
  });
};
  return (
    <div>
      {authService.loggedIn() ? (
      <p>
        Success! You may now head{' '}
        <Link to="/">back to the homepage.</Link>
      </p>
      ) : (
        <LoginForm 
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
        formState={formState}
        />
      )}

      {error && (
        <Alert severity='error'>
          {error.message}
        </Alert>       
      )}
    </div>
  )
}
