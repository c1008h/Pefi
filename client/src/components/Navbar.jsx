import { Link } from 'react-router-dom'

export default function Navbar () {
    const style = {
        diplay:'flex',
        margin:'2px',
        backgroundColor:'red',
        height: '20%'

    }
    return (
        <nav style={style}>
            <Link>Dashboard</Link>
            <Link>Goals</Link>
            <Link>Profile</Link>
            <Link>Logout</Link>
        </nav>
    )
}