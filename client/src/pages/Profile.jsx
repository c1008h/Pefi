import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../utils/reducers/userReducer'; // Import the setUser action
import ProfileForm from '../components/Profile/ProfileForm';
import PleaseLogin from '../components/PleaseLogin';

export default function Profile() {
  // const user = useSelector((state) => state.user.user)
  // console.log(user)
  // const dispatch = useDispatch();
  // const [newEmail, setNewEmail] = useState('');

  // const handleUpdateEmail = () => {
  //   // Perform your API call to update the user's email
  //   // Once the API call is successful, update the user data in the Redux store
  //   dispatch(setUser({ ...user, email: newEmail }));
  // };
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const { data } = useQuery(QUERY_ME)
  useEffect(() => {
    if (data) {
      setUserData(data.me)
      setLoading(false)
    }
  }, [data])
  console.log(userData)

  const token = authService.loggedIn() ? authService.getToken() : null;
  if(!token) {
      return <PleaseLogin />
  }
  if(loading) {
      return <h2>LOADING...</h2>
  }

  return (
    <ProfileForm 
      userData={userData}
    />
  )
}
