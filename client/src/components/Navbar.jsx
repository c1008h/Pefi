import { Link } from 'react-router-dom'
import { authService } from '../utils/auth';

export default function Navbar () {
    const logout = (event) => {
        event.preventDefault();
        authService.logout();
    }

    const style = {
        diplay:'fixed',
        height: '2.5rem',
        margin:'2px',
        backgroundColor:'#003366',
        backgroundSize: 'cover',
        padding: '5% 0',
        top: '0',
        width: '100%',
        justifyContent: 'space-between', 
    }
    const linkStyle = {
        padding: '0 10px', // Adjust the padding as needed for spacing between links
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
    };

    const containerStyle = {
        justifyContent:'center',
        textAlign:'center',
    }

    return (
        <nav style={style}>
            {authService.loggedIn() ? (
            <div style={containerStyle}>
                <Link to='/dashboard' style={linkStyle}>Dashboard</Link>
                <Link to='/details' style={linkStyle}>Details</Link>
                <Link to='/goals' style={linkStyle}>Goals</Link>
                <Link to='finance' style={linkStyle}>Finance</Link>
                <Link to='/profile' style={linkStyle}>Profile</Link>
                <Link to='/welcome' style={linkStyle} onClick={ logout }>Logout</Link>  

            </div>
            ) : (
            <div style={containerStyle}>
                <Link style={linkStyle}>Pefi</Link>
                <Link to='/signup' style={linkStyle}>Signup</Link>
                <Link to='/login' style={linkStyle}>Login</Link>
            </div>
            )}
        </nav>
    )
}