import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../Button/Button";
import styles from './MenuLayout.module.css';
import cn from "classnames";
import { useDispatch } from "react-redux";
import { TAppDispatch, useAppSelector } from "../../../store/store";
import { IUserInfo, userActions, userSlice } from "../../../store/user.slice";
import axios from "axios";
import { PREFIX } from "../../../helpers/API";
import { useEffect, useState } from "react";
import {cartSlice} from "../../../store/cart.slice";

export function MenuLayout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<TAppDispatch>();
	const user = useAppSelector(userSlice.selectors.selectUser);
	const [isLoading, setIsLoading] = useState(false);
	const jwt_token = useAppSelector(userSlice.selectors.selectJwt);
	const cart = useAppSelector(cartSlice.selectors.selectCart);
	
	const getUser = async () => {
		try {
			setIsLoading(true);
			
			const response = await axios.get<IUserInfo>(`${PREFIX}/user/profile`, {
				headers: {
					Authorization: `Bearer ${jwt_token}`
				}
			})
			dispatch(userSlice.actions.addUser(response.data))
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false)
		}
	}
	
	useEffect(() => {
		getUser();
	}, []);
	
	const logout = () => {
		dispatch(userActions.removeJwt());
		navigate('/auth/login')
	}

	return (
		<div className={cn(styles['layout'])}>
			<div className={cn(styles['drawer'])}>
				<div className={cn(styles["drawer__header"])}>
					<img src="/user-image.png" alt="" className="drawer__user-image" />
					<div className={cn(styles["drawer__user-info"])}>
						{user && !isLoading
							? (<><div className={cn(styles["drawer__user-name"])}>{user.name}</div>
								<div className={cn(styles["drawer__user-email"])}>{user.email}</div></>)
							: <>Загружаем</>}
					</div>
				</div>
				
				<nav className={cn(styles["drawer__menu"])}>
					<ul className={cn(styles["drawer__menu-list"])}>
						<li className="drawer__menu-item">
							<NavLink to="/" className={({ isActive }) => cn(styles["drawer__menu-link"], {
								[styles['active']]: isActive
							})}>
								<img src="/icons/document.png" alt="" />
								<span>Меню</span>
							</NavLink>
						</li>
						<li className="drawer__menu-item">
							<NavLink to="/cart" className={({ isActive }) => cn(styles["drawer__menu-link"], {
								[styles['active']]: isActive
							})}>
								<img src="/icons/bag.png" alt="" />
								<span>Корзина {
									cart.reduce((acc, product) => acc += product.count, 0)
								}</span>
							</NavLink>
						</li>
					</ul>
				</nav>
				
				<Button modifier="small" className={cn(styles["button--exit"])} onClick={logout}>
					<img src="/icons/exit.svg" alt="" />
					<span>Выйти</span>
				</Button>
				
			</div>
			
			<div className={styles['content']}>
				<Outlet/>
			</div>
		</div>
	)
}