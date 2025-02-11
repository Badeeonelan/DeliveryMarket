import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	isPassword?: boolean;
	isValid?: boolean;
	className?: string;
}