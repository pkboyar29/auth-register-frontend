import { useForm } from 'react-hook-form';
import { useState } from 'react';

function FormRegister({ onSwitchToAuth, onRegisterSuccess }) {

   // Хуки useState
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
   };

   // Хук useForm
   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      getValues
   } = useForm({
      mode: "onBlur"
   });

   // функция обратного вызова (та функция, которую можно передать как параметр в другую функцию)
   const onSubmit = (data) => {
      delete data.confirmPassword

      // передача на сервер json строки
      fetch('http://backend/index.php/user/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: JSON.stringify(data)
      })
         .then(response => onRegisterSuccess(data['login']))
      // .then(response => console.log(response))
      // onRegisterSuccess(data['login'])
   }

   return (
      <div style={{ marginTop: '100px' }}>
         {/* функция handleSubmit принимает как параметр callback функцию */}
         <form onSubmit={handleSubmit(onSubmit)} className="form">

            <div className="form__title">Форма регистрации</div>

            {/* First Name */}
            <label>
               <div className="label">
                  <div className="label__title">Имя</div>
                  <input
                     {...register('firstName', {
                        required: "Поле обязательно к заполнению",
                        minLength: {
                           value: 2,
                           message: "Минимальное количество символов: 2"
                        },
                        maxLength: {
                           value: 15,
                           message: "Максимальное количество символов: 15"
                        },
                        pattern: {
                           value: /^[A-Za-zА-Яа-яЁё]+$/,
                           message: "Допускаются только буквы"
                        }
                     })}
                     type="text"
                     autoComplete="off"
                  />
               </div>
               <div style={{ height: 40 }}>
                  {errors?.firstName && <p className="error">{errors?.firstName?.message || "Error!"}</p>}
               </div>
            </label>
            {/* Last Name */}
            <label>
               <div className="label">
                  <div className="label__title">Фамилия</div>
                  <input
                     {...register('lastName', {
                        required: "Поле обязательно к заполнению",
                        minLength: {
                           value: 2,
                           message: "Минимальное количество символов: 2"
                        },
                        maxLength: {
                           value: 15,
                           message: "Максимальное количество символов: 15"
                        },
                        pattern: {
                           value: /^[A-Za-zА-Яа-яЁё\s\-]+$/, // Разрешаем буквы, пробелы и дефисы
                           message: "Допускаются только буквы, пробелы и дефисы"
                        }
                     })}
                     type="text"
                     autoComplete="off"
                  />
               </div>

               <div style={{ height: 40 }}>
                  {errors?.lastName && <p className="error">{errors?.lastName?.message || "Error!"}</p>}
               </div>
            </label>
            {/* Email */}
            <label>
               <div className="label">
                  <div className="label__title">Email</div>
                  <input
                     {...register('email', {
                        required: "Поле обязательно к заполнению",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "Неверный формат email"
                        }
                     })}
                     type="email"
                     autoComplete="off"
                  />
               </div>

               <div style={{ height: 40 }}>
                  {errors?.email && <p className="error">{errors?.email?.message || "Error!"}</p>}
               </div>
            </label>

            {/* Login */}
            <label>
               <div className="label">
                  <div className="label__title">Логин</div>
                  <input
                     {...register('login', {
                        required: "Поле обязательно к заполнению",
                        minLength: {
                           value: 6,
                           message: "Минимальное количество символов: 6"
                        },
                        maxLength: {
                           value: 15,
                           message: "Максимальное количество символов: 15"
                        },
                        pattern: {
                           value: /^[a-zA-Z0-9]+$/,
                           message: "Допускаются только латинские буквы и цифры"
                        }
                     })}
                     type="text"
                     autoComplete="off"
                  />
               </div>

               <div style={{ height: 40 }}>
                  {errors?.login && <p className="error">{errors?.login?.message || "Error!"}</p>}
               </div>
            </label>

            {/* Password */}
            <label>
               <div className="password__input">
                  <div>Пароль</div>
                  <input
                     {...register('password', {
                        required: "Поле обязательно к заполнению",
                        minLength: {
                           value: 8,
                           message: "Минимальная длина пароля: 8 символов"
                        },
                        pattern: {
                           value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                           message: "Пароль должен содержать по крайней мере одну прописную букву, одну строчную букву, одну цифру и один специальный символ (!@#$%^&*)"
                        }
                     })}
                     type={showPassword ? 'text' : 'password'}
                     autoComplete="off"
                  />
                  <img className="show" onClick={togglePasswordVisibility} src={showPassword ? "/img/eye.svg" : "/img/eye-off.svg"} />
               </div>

               <div style={{ height: 40 }}>
                  {errors?.password && <p className="error">{errors?.password?.message || "Error!"}</p>}
               </div>
            </label>

            {/* Confirm password */}
            <label>
               <div className="password__input">
                  <div>Подтвердите пароль</div>

                  <input
                     {...register('confirmPassword', {
                        required: "Поле обязательно к заполнению",
                        validate: {
                           matchesPreviousPassword: (value) => {
                              const { password } = getValues();
                              return password === value || "Пароли не совпадают";
                           }
                        }
                     })}
                     type={showConfirmPassword ? 'text' : 'password'}
                     autoComplete="off"
                  />

                  <img className="show" onClick={toggleConfirmPasswordVisibility} src={showConfirmPassword ? "/img/eye.svg" : "/img/eye-off.svg"} />

               </div>

               <div style={{ height: 40 }}>
                  {errors?.confirmPassword && <p className="error">{errors?.confirmPassword?.message || "Error!"}</p>}
               </div>
            </label>

            {/* RADIO BUTTONS: GENDER */}
            <div>
               <div className="gender__title">Пол</div>

               <div className="gender__list">
                  <label>
                     <input
                        {...register('gender')}
                        type="radio"
                        value="male"
                        defaultChecked />
                     Мужской
                  </label>

                  <label>
                     <input
                        {...register('gender')}
                        type="radio"
                        value="female" />
                     Женский
                  </label>
               </div>
            </div>

            {/* DROPDOWN MENU: AGE */}
            <div className="age__title">Возраст</div>
            <select className="age__select" {...register('age', { required: "Выберите возраст" })}>
               <option value="">Выберите возраст</option>
               <option value="18">Мне 18 лет</option>
               <option value="not18">Нет 18 лет</option>
            </select>

            {/* ACCEPT RULES */}
            <label className="accept__label">
               <input
                  {...register('acceptRules')}
                  type="checkbox"
               />
               Принимаю правила соглашения
            </label>

            {/* SUBMIT BUTTON */}
            <input className="submit_button" type="submit" value="Зарегестрироваться" disabled={!isValid} />

            <div className="switch">
               <div>Уже зарегестрированы?   </div>
               <div className="link" onClick={onSwitchToAuth}>Тогда авторизуйтесь.</div>
            </div>

         </form>

      </div>
   )
}

export default FormRegister;