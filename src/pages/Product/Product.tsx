import { Await, useLoaderData } from "react-router-dom";
import { IProduct } from "../../interfaces/Product.interface";
import DishCard from "../../components/DishCard/DishCard";
import { Suspense } from "react";

export default function Product() {
	const product = useLoaderData() as { data: IProduct};
	
	return (
		<div>
			<Suspense fallback={'Загружаем'}>
				<Await resolve={product.data}>
					{({data}) => (
						<DishCard
							productId={data.id}
							title={data.name}
							description={data.ingredients.join(', ')}
							image={data.image}
							price={data.price}
							rating={data.rating}
						/>
					)}
				</Await>
			</Suspense>
		</div>
	);
}