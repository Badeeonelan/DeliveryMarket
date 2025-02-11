import { InputProps } from "./Input.props";
import styles from './Input.module.css';
import cn from "classnames";
import { forwardRef } from "react";


const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, ...props }, ref) {
	return <input className={cn({
		[styles['input']]: true,
		[styles['invalid']]: !isValid
	}, className)} {...props} ref={ref} />
})

export default Input;