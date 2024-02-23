//import logo from './logo.svg';
import FormRegister from './components/FormRegister';
import FormAuth from './components/FormAuth';
import PersonalAccount from './components/PersonalAccount';
import { useState } from 'react';

function App() {

  const [formMode, setFormMode] = useState('auth')
  const [loggedInUser, setLoggedInUser] = useState('')

  return (
    <div className="App">
      {formMode === 'auth' ? (<FormAuth onSwitchToRegister={() => setFormMode('register')}
        onSwitchToPersonalAccount={() => setFormMode('personal-account')}
        onLoginSuccess={(login) => setLoggedInUser(login)} />) :
        formMode === 'register' ? (<FormRegister onSwitchToAuth={() => setFormMode('auth')} onRegisterSuccess={(login) => {
          alert("Регистрация успешна!")
          setLoggedInUser(login)
          setFormMode('personal-account')
        }} />) :
          <PersonalAccount onLogOut={() => setFormMode('auth')} loggedInUser={loggedInUser} />}
    </div>
  );
}

export default App;