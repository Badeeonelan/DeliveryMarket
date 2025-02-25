import { ButtonHTMLAttributes, MouseEvent } from "react";

export default interface DishAddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: (e: MouseEvent) => void;
}