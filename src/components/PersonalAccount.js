import { useEffect, useState } from "react";

function PersonalAccount({ onLogOut, loggedInUser }) {

   const [userName, setUserName] = useState('')
   // ЭТО НАДО ИЗМЕНИТЬ МБ
   const [theme, setTheme] = useState('light')

   useEffect(() => {
      fetch('http://backend/index.php/user/userinfo/' + loggedInUser, {
         method: 'GET'
      })
         .then(response => response.json())
         .then(response => {
            // ТАКЖЕ НАДО ПРИ ЗАГРУЗКЕ КОМПОНЕНТА УСТАНОВИТЬ ТЕМУ, КОТОРАЯ СТОИТ У ПОЛЬЗОВАТЕЛЯ
            setUserName(response['FirstName'])
            setTheme(response['Theme']) // получить также тему
         })
   }, [loggedInUser])

   const onLogOutHandle = () => {
      setUserName('')
      onLogOut()
   }

   const handleChangeTheme = () => {

      // Определяем новое значение темы
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme)

      // отправить http запрос на изменении самой темы у текущего пользователя
      fetch('http://backend/index.php/user/changeTheme/' + loggedInUser, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: JSON.stringify({ Theme: newTheme })
      })
         .then(response => response.json())
         .then(response => console.log(response))
   }

   const changeThemeButtonText = theme === 'light' ? 'Светлая тема' : 'Темная тема';

   return (
      <div className={theme === 'dark' ? 'darkBackground' : ''}>
         <div className={"header " + (theme === 'dark' ? "darkHeader" : '')}>
            <div onClick={handleChangeTheme} className={"header__theme " + (theme === 'dark' ? "darkButton" : '')}>{changeThemeButtonText}</div>
            <div onClick={onLogOutHandle} className={"header__exit " + (theme === 'dark' ? "darkButton" : '')}>Выйти</div>
         </div>
         <div className={"text " + (theme === 'dark' ? 'darkText' : '')}>Добро пожаловать в личный кабинет, {userName}!</div>
      </div>
   )
}

export default PersonalAccount