import { useEffect } from "react"

function HomePage() {

   useEffect(() => {
      // функция, которая будет выполнена при монтировании компонента
      fetch('http://auth-register-backend/index.php/users', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         }
      })
         .then(response => response.text())
         .then(responseText => {
            const selectorTable = document.querySelector('.home-page__table')
            selectorTable.innerHTML = responseText
         })

      fetch('http://auth-register-backend/index.php/users/statistics', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         }
      })
         .then(response => response.text())
         .then(responseText => {
            const selectorStatistics = document.querySelector('.home-page__statistics')
            selectorStatistics.innerHTML = responseText
         })
   }, [])

   const onSearchClick = () => {

      const selectorResult = document.querySelector('.home-page__search-result')
      const selectorInput = document.querySelector('.home-page__search-field')
      const requestURL = 'http://auth-register-backend/index.php?username=' + selectorInput.value
      fetch(requestURL, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         }
      })
         // ТУТ НАДО УЧИТЫВАТЬ ЕСЛИ СТРОКА ПРИДЕТ ПУСТАЯ И СООБЩАТЬ ЧТО ЗАПИСИ ПО ЭТОМУ ЛОГИНУ НЕ НАЙДЕНО
         .then(response => response.json())
         .then(responseJson => {
            if (responseJson === null) {
               selectorResult.textContent = 'Записи по этому логину не найдено'
            }
            else {
               const htmlContent = `
               <div>
                   <p>First Name: ${responseJson.FirstName}</p>
                   <p>Last Name: ${responseJson.LastName}</p>
                   <p>Email: ${responseJson.Email}</p>
                   <p>Password: ${responseJson.Password}</p>
                   <p>Age: ${responseJson.AgeLimit}</p>
                   <p>Gender: ${responseJson.Gender}</p>
                   <p>AcceptRules: ${responseJson.AcceptRules}</p>
                   <p>Theme: ${responseJson.Theme}</p>
                   <p>Created: ${responseJson.Created}</p>
               </div>`;
               selectorResult.innerHTML = htmlContent;
            }
         })
   }

   return (
      <>
         <div className="home-page__title">HomePage</div>
         <div className="home-page__table"></div>
         <div className="home-page__statistics"></div>
         <div className="home-page__search-form">
            <div className="home-page__search-bottom">
               <input placeholder="Введите логин" className="home-page__search-field" />
               <button onClick={onSearchClick} className="home-page__search-button">Искать</button>
            </div>
            <div className="home-page__search-result"></div>
         </div>
      </>
   )
}

export default HomePage