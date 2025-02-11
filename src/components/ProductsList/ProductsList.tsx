import DishCard from "../DishCard/DishCard";
import { IProductsListProps } from "./ProductsList.props";

export default function ProductsList({ products, className }: IProductsListProps) {
	return products.map(p => (
							<li className={className} key={p.id}>
								<article>
									<DishCard
										productId={p.id}
										title={p.name}
										description={p.ingredients.join(', ')}
										image={p.image}
										price={p.price}
										rating={p.rating}
									/>
								</article>
							</li>
						))
}