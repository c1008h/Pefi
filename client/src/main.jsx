import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Welcome } from './pages/Welcome.jsx'
import { InputInfo } from './pages/InputInfo.jsx';
import { Dashboard } from './pages/Dashboard.jsx'
import 'react-calendar/dist/Calendar.css';
import './style/calendar.css'
// import './index.css';
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
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
