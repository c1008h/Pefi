import { Link } from 'react-router-dom'
import  {authService } from '../utils/auth'
import { Dashboard } from './Dashboard';

export const Welcome = () => {
    return (
        <div style={{margin:'5px', padding: '5px'}}>
            {authService.loggedIn() ? (
                <Dashboard/>
                ) : (
                <div>
                    <h1>Welcome to your Personal Finance App that will help you reach your $$ goals.</h1>
                
                    <Link to='/signup'>
                        <button>Click Here to Begin</button>
                    </Link>
                </div>
            )}
        </div>
    )
}