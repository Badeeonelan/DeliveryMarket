import { useEffect, useState } from "react";
import { IProduct } from "../interfaces/Product.interface";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";

interface menuLoaderValues {
	products: IProduct[];
	isLoading: boolean;
	isLoadError: string | null;
}

export default function useMenuLoader(): menuLoaderValues {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadError, setIsLoadError] = useState<string | null>(null);
	
	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
			setProducts(data);
		} catch (e) {
			if (e instanceof AxiosError || e instanceof Error) {
				setIsLoadError(e.message)
			}
		} finally {
			setIsLoading(false);
		}
	};
	
	useEffect(() => {
		getMenu();
	}, [])
	
	return { products, isLoading, isLoadError };
}