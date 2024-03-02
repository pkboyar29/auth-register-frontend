import { useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';

// pages
import FormRegister from './pages/FormRegister';
import FormAuth from './pages/FormAuth';
import PersonalAccount from './pages/PersonalAccount';

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
        <Route path="/auth" element={
          <FormAuth
            onLoginSuccess={(login) => {
              setLoggedInUser(login)
            }} />
        }></Route>
        <Route path="/register" element={
          <FormRegister
            onRegisterSuccess={(login) => {
              alert("Регистрация успешна!")
              setLoggedInUser(login)
            }} />
        }></Route>
        <Route path="/personal-account" element={
          <PersonalAccount loggedInUser={loggedInUser}
            logOut={() => {
              setLoggedInUser('')
            }} />
        }></Route>
        {/* НИЖЕ КОСТЫЛЬ? */}
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  );
}

export default App;