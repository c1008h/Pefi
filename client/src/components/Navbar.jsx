import { Link } from 'react-router-dom'
import { authService } from '../utils/auth';

export default function Navbar () {
    const logout = (event) => {
        event.preventDefault();
        authService.logout();
    }

    const style = {
        diplay:'flex',
        height: '2.5rem',
        margin:'2px',
        backgroundColor:'gray',
        backgroundSize: 'cover',
        padding: '5% 0',
        width: '100%',
        justifyContent: 'space-between', 
    }
    const linkStyle = {
        padding: '0 10px', // Adjust the padding as needed for spacing between links
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
    };
    return (
        <nav style={style}>
            {authService.loggedIn() ? (
            <>
                <Link to='/dashboard' style={linkStyle}>Dashboard</Link>
                <Link to='/details' style={linkStyle}>Details</Link>
                <Link to='/goals' style={linkStyle}>Goals</Link>
                <Link to='finance' style={linkStyle}>Finance</Link>
                <Link to='/profile' style={linkStyle}>Profile</Link>
                <Link to='/welcome' style={linkStyle} onClick={ logout }>Logout</Link>  

            </>
            ) : (
            <>
                <Link style={linkStyle}>Personal Finance</Link>
                <Link to='/signup' style={linkStyle}>Signup</Link>
                <Link to='/login' style={linkStyle}>Login</Link>
            </>
            )}
        </nav>
    )
}