import { Link } from 'react-router-dom'

export default function Navbar () {
    const style = {
        diplay:'flex',
        height: '20%',
        margin:'2px',
        backgroundColor:'red',
        justifyContent: 'space-between', 
    }
    
    return (
        <nav style={style}>
            <Link><span>Dashboard</span></Link>
            <Link><span>Goals</span></Link>
            <Link><span>Profile</span></Link>
        </nav>
    )
}