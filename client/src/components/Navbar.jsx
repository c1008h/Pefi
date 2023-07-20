import { Link } from 'react-router-dom'
import { authService } from '../utils/auth';

export default function Navbar () {
    const logout = (event) => {
        event.preventDefault();
        authService.logout();
    }

    const style = {
        diplay:'flex',
        height: '20%',
        margin:'2px',
        backgroundColor:'red',
        justifyContent: 'space-between', 
    }

    return (
        <nav style={style}>
            {authService.loggedIn() ? (
            <>
                <Link to='/dashboard'><span>Dashboard</span></Link>
                <Link to='/goals'><span>Goals</span></Link>
                <Link to='/profile'><span>Profile</span></Link>
                <Link to='/welcome' onClick={ logout }><span>Logout</span></Link>  

            </>
            ) : (
            <>
                <Link><span>Personal Finance</span></Link>
                <Link to='/signup'><span>Signup</span></Link>
                <Link to='/login'><span>Login</span></Link>
            </>
            )}
        </nav>
    )
}