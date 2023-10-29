import { Link } from 'react-router-dom'
import { authService } from '../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import '../style/navbar.css'
import { loginUser, logoutUser } from '../features/auth/authSlice';

export default function Navbar () {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    // if (authService.loggedIn()) {
    //     dispatch(loginUser())
    // }

    const logout = (event) => {
        event.preventDefault();
        authService.logout();
    }
    
    return (
        <nav>
            { authService.loggedIn() ? (
            // {/* {!isAuthenticated ? ( */}
            <div className='container'>
                <Link to='/dashboard' className='nav-item'>Dashboard</Link>
                <Link to='/details' className='nav-item'>Details</Link>
                <Link to='/goals' className='nav-item'>Goals</Link>
                <Link to='finance' className='nav-item'>Finance</Link>
                <Link to='/profile' className='nav-item'>Profile</Link>
                <Link to='/welcome' className='nav-item' onClick={ logout }>Logout</Link>  

            </div>
            ) : (
            <div className='container'>
                <Link className='nav-item'>Pefi</Link>
                <Link to='/signup' className='nav-item'>Signup</Link>
                <Link to='/login' className='nav-item'>Login</Link>
            </div>
            )}
        </nav>
    )
}