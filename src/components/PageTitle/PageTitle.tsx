import PageTitleProps from "./PageTitle.props";
import styles from './PageTitle.module.css';

export default function PageTitle({ children, ...props }: PageTitleProps) {
	return (
		<h2 {...props} className={styles['page-title']}>{children}</h2>
	);
}