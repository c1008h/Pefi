import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../utils/reducers/userReducer'; // Import the setUser action
// import ProfileForm from '../components/Profile/ProfileForm';
import { Loading, PleaseLogin, FormTemplate, FormLayout, ModalTemplate } from '../components/index';
import { UPDATE_USER } from '../utils/mutations';
import PasswordModal from '../components/Profile/PasswordModal';
import DeleteAccountModal from '../components/Profile/DeleteAccountModal';
import '../style/profile.css'

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

  const [firstName, setFirstName] = useState(userData.firstName || '')
  const [lastName, setLastName] = useState(userData.lastName || '')
  const [email, setEmail] = useState(userData.email || '')
  const [password, setPassword] = useState()

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [isEditMode, setIsEditMode] = useState(false);
  const [ updateUser ] = useMutation(UPDATE_USER)

  const fields = [
    {
      label: 'First Name',
      name: 'firstName',
      type: 'text',
      value: firstName,
      editable: isEditMode,
      onChange: e => setFirstName(e.target.value)
    },
    {
      label: 'Last Name',
      name: 'lastName',
      type: 'text',
      value: lastName,
      editable: isEditMode,
      onChange: e => setLastName(e.target.value)
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: email,
      editable: isEditMode,
      onChange: e => setEmail(e.target.value)
    },
  ];

  useEffect(() => {
    if (data) {
      setUserData(data.me)
        setFirstName(data.me.firstName || '');
        setLastName(data.me.lastName || '');
        setEmail(data.me.email || '');
        setLoading(false);
    }
  }, [data])
  console.log(userData)

  const handleSubmit = async (firstName, lastName, email) => {
    setIsEditMode(false); 
    if (!firstName || !lastName || !email) {
        console.error('Error: Required fields are empty');
        return;
    }

    try {
      await updateUser({
        variables: {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
      })
    } catch (error) {
      console.error('Error:', error)
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    console.log("Before cancel click:", userData, firstName, lastName, email);

    if (isEditMode) {
      setFirstName(userData?.firstName || '');
      setLastName(userData?.lastName || '');
      setEmail(userData?.email || '');
      setPassword(''); 
    }
    console.log("After cancel click:", userData, firstName, lastName, email);

    setIsEditMode(false);
  };

  const handleOpenPasswordModal = () => setShowPasswordModal(true);
    
  const handleClosePasswordModal = () => setShowPasswordModal(false);
  
  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  

  const token = authService.loggedIn() ? authService.getToken() : null;
  if(!token) {
      return <PleaseLogin />
  }
  if(loading) {
      return <Loading />
  }

  return (
    <FormLayout title="Profile" styles={profileForm} >
      <FormTemplate 
        fields={fields}
        onSubmit={(formData) => {
          handleSubmit(formData.firstName, formData.lastName, formData.email)
        }}
        onCancel={handleCancelClick}
      />
      <div id='text-btn-container'>
        <h4 className='text-btn' onClick={handleOpenPasswordModal}>Change Password</h4>
        {showPasswordModal ? (
          <PasswordModal 
            show={showPasswordModal}
            handleClose={handleClosePasswordModal}
            userData={userData}
          />
        ) : null}
        <h4 className='text-btn' onClick={handleOpenDeleteModal}>Delete Account</h4>
        {showDeleteModal ? (
          <DeleteAccountModal
            show={showDeleteModal}
            handleClose={handleCloseDeleteModal}
            userData={userData}
          />
          // <ModalTemplate
          //   title={"Delete Account"}
          //   change={"Delete"}
          //   show={show}
          //   handleClose={handleClose}
          //   handleChange={handleDelete}
          //   primaryButtonDisabled={!isPasswordCorrect || !isAgreed}
          // >
          //   <FormTemplate 
          //     // fields={}
              
          //   />
          // </ModalTemplate>
        ) : null}
      </div>
    </FormLayout>
  )
}

const profileForm = {
  
  formContainer: {
    paddingTop:'3%',
    marginBottom:'5%'
  },
  title: {

  },
  card: {
    padding:'3% 5% 3% 5%',
    margin: '3% 15%',
  }
  
}