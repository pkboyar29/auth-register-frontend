import { useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';

// pages
import RegisterPage from './pages/RegisterPage';
import AuthPage from './pages/AuthPage';
import PersonalAccountPage from './pages/PersonalAccountPage';
import HomePage from './pages/HomePage';

function App() {

  const [loggedInUser, setLoggedInUser] = useState('')

  return (
    <div className="App">

      {/* <header className="header-app">
        <Link className="header-app__link" to="/auth">Авторизация</Link>
        <Link className="header-app__link" to="/register">Регистрация</Link>
        <Link className="header-app__link" to="/personal-account">Личный кабинет</Link>
      </header> */}

      <Routes>
        <Route path="/" element={
          <HomePage />
        }></Route>
        <Route path="/auth" element={
          <AuthPage
            onLoginSuccess={(login) => {
              setLoggedInUser(login)
            }} />
        }></Route>
        <Route path="/register" element={
          <RegisterPage
            onRegisterSuccess={(login) => {
              alert("Регистрация успешна!")
              setLoggedInUser(login)
            }} />
        }></Route>
        <Route path="/personal-account" element={
          <PersonalAccountPage loggedInUser={loggedInUser}
            logOut={() => {
              setLoggedInUser('')
            }} />
        }></Route>

        {/* <Route path="/" element={<Navigate to="/auth" />} /> */}
      </Routes>
    </div>
  );
}

export default App;