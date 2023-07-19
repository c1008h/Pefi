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
                <Link><span>Dashboard</span></Link>
                <Link><span>Goals</span></Link>
                <Link><span>Profile</span></Link>
                <Link onClick={ logout }><span>Logout</span></Link>  

            </>
            ) : (
            <>
                <Link><span>Personal Finance</span></Link>
                <Link><span>Signup</span></Link>
                <Link><span>Login</span></Link>
            </>
            )}
        </nav>
    )
}