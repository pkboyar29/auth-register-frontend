import { useState } from 'react';
import { useForm } from 'react-hook-form';

function FormAuth({ onSwitchToRegister, onSwitchToPersonalAccount, onLoginSuccess }) {

   // Хуки useState
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   // Хук useForm
   const {
      register,
      formState: { errors, isValid },
      handleSubmit
   } = useForm({
      mode: "onBlur"
   });

   // функция обратного вызова (та функция, которую можно передать как параметр в другую функцию)
   const onSubmit = (data) => {
      // передача на сервер json строки
      fetch('http://backend/index.php/user/auth', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: JSON.stringify(data)
      })
         .then(response => {
            // проверяем код состояния ответа (http reponse code status)
            const label_password = document.getElementById("label_password")
            const label_login = document.getElementById("label_login")
            switch (response.status) {
               case 200:
                  const loginFromInput = data['login'] // получаем правильный, подтвержденный логин из input
                  onLoginSuccess(loginFromInput)
                  onSwitchToPersonalAccount() // переключение на личный кабинет
                  return
               case 403:
                  label_login.textContent = ""
                  label_password.textContent = "Неверный пароль."
                  return
               case 404:
                  label_password.textContent = ""
                  label_login.textContent = "Пользователя не существует."
                  return
            }
         })
      // .then(response => response.json()) // преобразуем ответ в json
      // .then(response => console.log(response))
   }

   return (

      <div style={{ marginTop: '100px' }}>
         {/* функция handleSubmit принимает как параметр callback функцию */}
         <form onSubmit={handleSubmit(onSubmit)} className="form">

            <div className="form__title">Форма авторизации</div>

            {/* Login */}
            <label>
               <div className="label">
                  <div className="label__title">Логин</div>
                  <input
                     {...register('login', {
                        required: 'Логин не указан'
                     })}
                     type="text"
                     autoComplete="off"
                  />

               </div>

               <div id="label_login" style={{ height: 40 }}>
                  {errors?.login && <p className="error">{errors?.login?.message || "Error!"}</p>}
               </div>
            </label>

            {/* Password */}
            <label>
               <div className="password__input">
                  <div>Пароль</div>

                  <input
                     {...register('password', {
                        required: 'Пароль не указан'
                     })}
                     type={showPassword ? 'text' : 'password'}
                     autoComplete="off"
                  />

                  <img className="show" onClick={togglePasswordVisibility} src={showPassword ? "/img/eye.svg" : "/img/eye-off.svg"} />

               </div>

               <div id="label_password" style={{ height: 40 }}>
                  {errors?.password && <p className="error">{errors?.password?.message || "Error!"}</p>}
               </div>
            </label>

            {/* SUBMIT BUTTON */}
            <input className="submit_button" type="submit" value="Авторизоваться" disabled={!isValid} />


            <div className="switch">
               <div>Еще не зарегестрированы?</div>
               <div className="link" onClick={onSwitchToRegister}>Зарегестрироваться.</div>
            </div>

         </form>
      </div>
   )
}

export default FormAuth;