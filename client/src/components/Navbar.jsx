import { Link } from 'react-router-dom'

export const Navbar = () => {
    const style = {
        diplay:'flex',
        margin:'2px',
        backgroundColor:'red'
    }
    return (
        <nav style={{style}}>
            <Link>Dashboard</Link>
            <Link>Goals</Link>
            <Link>Profile</Link>
            <Link>Logout</Link>
        </nav>
    )
}