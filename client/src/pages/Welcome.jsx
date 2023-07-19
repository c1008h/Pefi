import { Link } from 'react-router-dom'

export const Welcome = () => {
    return (
        <>
            <h1>Welcome to your Personal Finance App that will help you reach your $$ goals.</h1>
            
            <Link to='/signup'>
                <button>Click Here to Begin</button>
            </Link>
        </>
    )
}