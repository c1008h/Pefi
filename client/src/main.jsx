import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Welcome } from './pages/Welcome.jsx'
import { InputInfo } from './pages/InputInfo.jsx';
import { Dashboard } from './pages/Dashboard.jsx'
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx'
import 'react-calendar/dist/Calendar.css';
import './style/calendar.css'
import './style/index.css';
import App from './App.jsx';

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
        path: '/info',
        element:<InputInfo/>
      },
      {
        path: '/dashboard',
        element:<Dashboard/>
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
