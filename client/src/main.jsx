import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Welcome, Error, Dashboard, Signup, OnBoarding, Login, Goals, Finance, Profile, AccountHistory } from './pages/index'
import { Footer, Navbar } from './components/'
import 'react-calendar/dist/Calendar.css';
import './style/calendar.css'
import './style/index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <><Navbar/><Welcome /><Footer/></>
      }, 
      {
        path: '/dashboard',
        element:<><Navbar/><Dashboard/><Footer/></>
      },
      {
        path: '/details',
        element:<><Navbar/><AccountHistory/><Footer/></>
      },
      {
        path: '/goals',
        element:<><Navbar/><Goals/><Footer/></>
      },
      // {
      //   path: '/addgoals',
      //   element:<><Navbar/><AddGoals/><Footer/></>
      // },
      {
        path: '/finance',
        element:<><Navbar/><Finance/><Footer/></>
      },
      {
        path: '/profile',
        element:<><Navbar/><Profile/><Footer/></>
      },
      {
        path: '/signup',
        element:<Signup/>
      },
      {
        path: '/signup/*',
        element:<OnBoarding/>
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
