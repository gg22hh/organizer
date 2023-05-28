import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../components/Auth.module.css'
import { Button, IconButton, InputAdornment, OutlinedInput, Switch } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Auth = () => {
	const [inOrUp, setInOrUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate()

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

	const handleSubmitForm = () => {
		const data = {
			name,
			surname,
			login,
			password
		}

		navigate('/organizer')
		console.log(data)
	}
	const handleSubmitLoginForm = () => {	
		if (login === 'example' & password === 'qwerty') {
			navigate('/organizer')
		} 
	}
  return (
    <div>
			<h1 className={s.title}>Добро пожаловать</h1>
      <div className={s.switch}>
        <button>Регистрация</button>
        <Switch value={inOrUp} onChange={() => setInOrUp(!inOrUp)} />
        <button>Вход</button>
      </div>
      {inOrUp ? (
        <form className={s.form} onSubmit={handleSubmitForm}>
          <h3>Регистрация</h3>
          <OutlinedInput
            placeholder="Имя"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
					<OutlinedInput
            placeholder="Фамилия"
            variant="outlined"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
					<OutlinedInput
						placeholder="Логин"
						variant="outlined"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
          <OutlinedInput
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button type="submit" variant="outlined">
            Зарегистрироваться
          </Button>
        </form>
      ) : (
        <form className={s.form}>
          <h3>Войти</h3>
          <OutlinedInput
						placeholder="Логин"
						variant="outlined"
						value={login}
						onChange={(e) => setLogin(e.target.value)}
					/>
          <OutlinedInput
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
						value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button onClick={() => handleSubmitLoginForm()} variant="outlined">
            Войти
          </Button>
        </form>
      )}
    </div>
  );
};
