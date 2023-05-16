import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome.js'
import { InputInfo } from './pages/InputInfo.js';
import { Dashboard } from './pages/Dashboard.js'
import 'react-calendar/dist/Calendar.css';
import './styles/calendar.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path='/'
          index element={<Welcome/>}
        />
        <Route 
          path='/info'
          index element={<InputInfo/>}
        />
        <Route 
          path='/dashboard'
          index element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
}

