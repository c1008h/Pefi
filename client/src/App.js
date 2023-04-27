import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome.js'
import { InputInfo } from './pages/InputInfo.js';

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
      </Routes>
    </Router>
  );
}

