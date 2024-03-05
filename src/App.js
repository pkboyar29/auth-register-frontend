import { Routes, Route, Navigate } from 'react-router-dom';

// pages
import RegisterPage from './pages/RegisterPage';
import AuthPage from './pages/AuthPage';
import PersonalAccountPage from './pages/PersonalAccountPage';
import HomePage from './pages/HomePage';

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/personal-account" element={<PersonalAccountPage />}></Route>
        {/* <Route path="/" element={<Navigate to="/auth" />} /> */}
      </Routes>
    </div>
  );
}

export default App;