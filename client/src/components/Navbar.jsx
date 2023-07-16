import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav>
            <Link>Dashboard</Link>
            <Link>Goals</Link>
            <Link>Profile</Link>
        </nav>
    )
}