import { NavLink, Outlet } from "react-router-dom";
import Button from "../../Button/Button";
import styles from './MenuLayout.module.css';
import cn from "classnames";

export function MenuLayout() {
	
	return (
		<div className={cn(styles['layout'])}>
			<div className={cn(styles['drawer'])}>
				<div className={cn(styles["drawer__header"])}>
					<img src="/user-image.png" alt="" className="drawer__user-image" />
					<div className={cn(styles["drawer__user-info"])}>
						<div className={cn(styles["drawer__user-name"])}>Андрей Голобурдо</div>
						<div className={cn(styles["drawer__user-email"])}>gaa3538@gmail.com</div>
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
								<span>Корзина</span>
							</NavLink>
						</li>
					</ul>
				</nav>
				
				<Button modifier="small" className={cn(styles["button--exit"])}>
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