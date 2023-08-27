import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Welcome } from './pages/Welcome.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx'
import Goals from './pages/Goals.jsx'
import Finance from './pages/Finance.jsx';
import Profile from './pages/Profile.jsx'
import AccountHistory from './pages/AccountHistory.jsx';
import 'react-calendar/dist/Calendar.css';
import './style/calendar.css'
import './style/index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    // error: <NoMatch />,
    children: [
      {
        index: true,
        element: <Welcome />
      }, 
      {
        path: '/dashboard',
        element:<Dashboard/>
      },
      {
        path: '/details',
        element:<AccountHistory/>
      },
      {
        path: '/goals',
        element:<Goals/>
      },
      {
        path: '/finance',
        element:<Finance/>
      },
      {
        path: '/profile',
        element:<Profile/>
      },
      {
        path: '/signup',
        element:<Signup/>
      },
      {
        path: '/login',
        element:<Login/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
