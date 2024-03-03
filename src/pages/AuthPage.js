import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

function AuthPage({ onLoginSuccess }) {

	// Хук useState
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	// Хук useNavigate
	const navigate = useNavigate()

	// Хук useForm
	const {
		register,
		setError,
		formState: { errors, isValid },
		handleSubmit
	} = useForm({
		mode: "onBlur"
	});

	// функция обратного вызова (та функция, которую можно передать как параметр в другую функцию)
	const onSubmit = (data) => {
		// передача на сервер json строки
		fetch('http://backend-php/index.php/user/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				// проверяем код состояния ответа (http reponse code status)
				switch (response.status) {
					case 200:
						const loginFromInput = data['login'] // получаем правильный, подтвержденный логин из input
						onLoginSuccess(loginFromInput)
						navigate('/personal-account')
						return
					case 403:
						setError('password', {
							type: 'manual',
							message: 'Неверный пароль'
						})
						return
					case 404:
						setError('login', {
							type: 'manual',
							message: 'Пользователя с таким логином не существует'
						})
						return
				}
			})
	}

	return (

		<div style={{ marginTop: '50px' }}>
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
					<Link to="/register" className="link">Зарегестрироваться.</Link>
				</div>

			</form>
		</div>
	)
}

export default AuthPage;