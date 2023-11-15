import { Link, NavLink } from 'react-router-dom'
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
                <NavLink to='/dashboard' className='nav-item'>Dashboard</NavLink>
                <NavLink to='/details' className='nav-item'>Details</NavLink>
                <NavLink to='/goals' className='nav-item'>Goals</NavLink>
                <NavLink to='/finance' className='nav-item'>Finance</NavLink>
                <NavLink to='/profile' className='nav-item'>Profile</NavLink>
                <Link to='/welcome' className='nav-item' onClick={ logout }>Logout</Link>  

            </div>
            ) : (
            <div className='container'>
                <NavLink className='nav-item'>Pefi</NavLink>
                <NavLink to='/signup' className='nav-item'>Signup</NavLink>
                <NavLink to='/login' className='nav-item'>Login</NavLink>
            </div>
            )}
        </nav>
    )
}