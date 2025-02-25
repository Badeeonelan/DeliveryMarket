import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Registration.module.css";
import cn from "classnames";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import { useDispatch } from "react-redux";
import { TAppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

export interface IRegisterForm {
	email: {
		value: string;
	},
	name: {
		value: string;
	}
	password: {
		value: string;
	}
}

export interface IRegisterSuccess {
	access_token: string;
}

export interface IRegisterFailed {
	message: string;
	error: string;
	statusCode: number;
}

export type IRegisterResponse = IRegisterSuccess | IRegisterFailed;

export default function Registration() {
	const [registerError, setRegisterError] = useState<string | null>(null);
	const dispatch = useDispatch<TAppDispatch>();
	const navigate = useNavigate();
	
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as typeof e.target & IRegisterForm;
		register(target.email.value, target.name.value, target.password.value);
	}
	
	const register = async (email: string, name: string, password: string) => {	
		try {
			setRegisterError(null);
			const { data } = await axios.post<IRegisterResponse>(`${PREFIX}/auth/register`, {
					email,
					name,
					password
			});
			if ('access_token' in data) {
				dispatch(userActions.addJwt(data.access_token));
				navigate('/');
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				setRegisterError(error.response?.data.message)
			}
		}
	}
	
	return (
		<div className={cn(styles['login'])}>
			<h1 className={cn(styles['login__title'])}>Регистрация</h1>
			{registerError && (<div className={cn(styles['error'])}>{registerError}</div>)}
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
					<div className={cn(styles["form__field"])}>
						<label htmlFor="password">Вашe имя</label>
						<Input type='text' id='name' name='name' placeholder='Имя' maxLength={20} minLength={3} required className={cn(styles['form__input'])} />
					</div>
				</fieldset>
				<Button modifier='big' type='submit'>Зарегистрироваться</Button>
			</form>
			<div className={cn(styles["login__extra"])}>
				<p>Есть аккаунт?</p>
				<Link to="/auth/login" className={cn(styles['login__register-link'])}>Войти</Link>
			</div>
		</div>
	);
}