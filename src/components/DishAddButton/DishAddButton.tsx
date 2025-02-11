import DishAddButtonProps from "./DishAddButton.props";
import styles from './DishAddButton.module.css';
import cn from "classnames";

export default function DishAddButton({ className, ...props }: DishAddButtonProps) {
	return (
		<button {...props} type="button" className={cn(styles['button'], className)}>
			<img src="/icons/cart.svg" alt="" />
		</button>
	);
}