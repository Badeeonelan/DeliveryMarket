import { MouseEvent } from 'react';
import DishAddButton from '../DishAddButton/DishAddButton';
import styles from './DishCard.module.css';
import DishCardProps from './DishCard.props';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TAppDispatch } from '../../store/store';
import { cartAction } from '../../store/cart.slice';

export default function DishCard({ productId, title, description, image, price, rating, ...props }: DishCardProps) {
	const dispatch = useDispatch<TAppDispatch>();
	
	const addToCart = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartAction.add(productId))
	}
	
	return (
		<Link to={`/product/${productId}`}>
			<div className={styles['dish-card']} {...props}>
				<div className={styles["dish-card__body"]}>
					<img src={image} alt="" className={styles["dish-card__image"]} />
					<div className={styles["dish-card__price"]}>
						{price}<span>&nbsp;₽</span>
					</div>
					<DishAddButton className={styles['dish-card__add-button']} onClick={addToCart}/>
					<div className={styles["dish-card__rating"]}>
						<span>{rating}</span>
						<img src="/icons/star.svg" alt="" />
					</div>
				</div>
				<div className={styles["dish-card__info"]}>
					<div className={styles["dish-card__name"]}>{title}</div>
					<div className={styles["dish-card__description"]}>{description}</div>
				</div>
			</div>
		</Link>
	);
}