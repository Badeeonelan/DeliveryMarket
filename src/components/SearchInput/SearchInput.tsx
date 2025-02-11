import SearchInputProps from "./SearchInput.props";
import styles from './SearchInput.module.css';
import cn from "classnames";

export default function SearchInput({ className, ...props }: SearchInputProps) {
	return (
		<div className={styles["input-icon"]}>
			<input type="text" {...props} className={cn(styles['input'])} />
		</div>
	);
}