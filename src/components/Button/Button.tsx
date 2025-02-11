import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cl from 'classnames/bind';

const cx = cl.bind(styles);

function Button({ children, modifier = 'default', className = '', ...props }: ButtonProps) {
	
	return (
		<button className={cx(
			{
				'button': true,
				'button--big': modifier == 'big',
				'button--small': modifier == 'small',
				[className]: true
			}
		)} {...props}>
			{children}
		</button>
	)
}

export default Button;