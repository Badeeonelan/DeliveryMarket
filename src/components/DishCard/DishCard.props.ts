import { HTMLAttributes } from "react";

export default interface DishCardProps extends HTMLAttributes<HTMLDivElement> {
	productId: number;
	title: string;
	description: string;
	image: string;
	price: number;
	rating: number;
}