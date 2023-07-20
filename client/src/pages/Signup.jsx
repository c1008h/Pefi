// import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { authService } from '../utils/auth';

import { Alert } from 'react-bootstrap'
import { SignupForm } from '../components/Signup/SignupForm'

export default function Signup() {
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (email, password) => {
    if(!email || !password){
      alert('Failed to submit! Please fill all requested fields.');
      // document.location.replace('/');
      return;
    }

    try {
      const { data } = await addUser({
        variables: {
          // firstName: firstName.trim(),
          // lastName: lastName.trim(),
          email: email.trim(),
          password: password.trim()
        }
      })
  
      authService.login(data.addUser.token)
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <>
     {authService.loggedIn() ? (
      <p>
        Success! You may now head{' '}
        <Link to='/'>Back to the homepage.</Link>
      </p>
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
