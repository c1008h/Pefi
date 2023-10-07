import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Welcome, Dashboard, Signup, Login, Goals, Finance, Profile, AccountHistory, AddGoals} from './pages/index'
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
        path: '/addgoals',
        element:<AddGoals/>
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
