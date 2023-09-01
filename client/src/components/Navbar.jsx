import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authService } from '../utils/auth';
import '../style/navbar.css'

export default function Navbar () {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);

    const logout = (event) => {
        event.preventDefault();
        authService.logout();
    }
    
    return (
        <nav>
            {authService.loggedIn() ? (
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