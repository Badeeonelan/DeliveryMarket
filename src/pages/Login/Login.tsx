import { FormEvent, useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import cn from 'classnames';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { ILoginResponse } from '../../interfaces/LoginResponse.interface';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TAppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export interface ILoginForm {
	email: {
		value: string;
	};
	password: {
		value: string;
	}
}

export default function Login() {
	const [loginError, setLoginError] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch<TAppDispatch>();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & ILoginForm;
		sendLogin(target.email.value, target.password.value);
	}
	
	const sendLogin = async (email: string, password: string) => {
		try {
			setLoginError(null);
			const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			dispatch(userActions.addJwt(data.access_token));
			navigate('/');
		} catch (error) {
			if (error instanceof AxiosError) {
				setLoginError(error.response?.data.message);
			}
		}
	};
	
	return (
		<div className={cn(styles['login'])}>
			<h1 className={cn(styles['login__title'])}>Вход</h1>
			{loginError && (<div className={cn(styles['error'])}>{loginError}</div>)}
			<form
				className={cn(styles["login__form"], styles["form"])}
				onSubmit={onSubmit}
			>
				<fieldset className={cn(styles['form__fields'])}>
					<legend className='visually-hidden'>Пользовательские данные</legend>
					<div className={cn(styles["form__field"])}>
						<label htmlFor="email">Ваш email</label>
						<Input id='email' name='email' placeholder='Email' maxLength={20} minLength={5} required className={cn(styles['form__input'])} />
					</div>
					<div className={cn(styles["form__field"])}>
						<label htmlFor="password">Ваш пароль</label>
						<Input type='password' id='password' name='password' placeholder='Пароль' maxLength={20} minLength={3} required className={cn(styles['form__input'])} />
					</div>
				</fieldset>
				<Button modifier='big' type='submit'>Вход</Button>
			</form>
			<div className={cn(styles["login__extra"])}>
				<p>Нет аккаунта?</p>
				<a href="/" className={cn(styles['login__register-link'])}>Зарегистрироваться</a>
			</div>
		</div>
	);
}