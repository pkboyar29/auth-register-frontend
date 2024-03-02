import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PersonalAccount({ loggedInUser, logOut }) {

	const [userName, setUserName] = useState('')
	const [theme, setTheme] = useState('light')

	const navigate = useNavigate()

	useEffect(() => {
		if (loggedInUser !== "") {
			fetch('http://backend-php/index.php/user/userinfo/' + loggedInUser, {
				method: 'GET'
			})
				.then(response => response.json())
				.then(responseJson => {
					setUserName(responseJson['FirstName'])
					setTheme(responseJson['Theme'])
				})
		}
	}, [])

	const onLogOutHandle = () => {
		setUserName('')
		setTheme('light')
		logOut()
		navigate('/auth')
	}

	const handleChangeTheme = () => {

		// Определяем новое значение темы
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme)

		// отправить http запрос на изменении самой темы у текущего пользователя
		fetch('http://backend-php/index.php/user/changeTheme/' + loggedInUser, {
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
			{loggedInUser !== "" ? (
				<>
					<div className={"header " + (theme === 'dark' ? "darkHeader" : '')}>
						<div onClick={handleChangeTheme} className={"header__theme " + (theme === 'dark' ? "darkButton" : '')}>{changeThemeButtonText}</div>
						<div onClick={onLogOutHandle} className={"header__exit " + (theme === 'dark' ? "darkButton" : '')}>Выйти</div>
					</div>
					<div className={"text " + (theme === 'dark' ? 'darkText' : '')}>Добро пожаловать в личный кабинет, {userName}!</div>
				</>
			) : (
				<p className="notAuthText">Вы не авторизованы. <Link to="/auth">Авторизоваться.</Link></p>
			)}
		</div>
	)
}

export default PersonalAccount