import { Outlet } from "react-router-dom";
import styles from './AuthLayout.module.css';
import cn from "classnames";

export default function AuthLayout() {
	return (
		<div className={cn(styles["content"])}>
			<aside className={cn(styles["aside"])}>
				<img src="/auth-logo.svg" alt="" className="aside-logo__image" />
			</aside>
			
			<main className={cn(styles["main"])}>
				<Outlet/>
			</main>
		</div>
	)
}