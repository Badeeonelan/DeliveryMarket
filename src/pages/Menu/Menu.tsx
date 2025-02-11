import PageTitle from "../../components/PageTitle/PageTitle";
import SearchInput from "../../components/SearchInput/SearchInput";
import styles from './Menu.module.css'
import ProductsList from "../../components/ProductsList/ProductsList";
import useMenuLoader from "../../hooks/useMenuLoader";


export default function Menu() {
	const { products, isLoading, isLoadError } = useMenuLoader();
	
	return (
		<>
			<header className={styles['header']}>
				<PageTitle>Меню</PageTitle>
				<SearchInput placeholder="Введите блюдо или состав"/>
			</header>
			<main className={styles['content']}>
				<section className={styles["menu"]}>
					{!isLoadError && isLoading && (<p>Идет загрузка меню...</p>)}
					{isLoadError && (<p>Произошла ошибка: {isLoadError}</p>)}
					
					{!isLoading && !isLoadError && products.length && (
						<ul className={styles['menu-list']}>
							{!isLoading && !isLoadError && <ProductsList products={products} className={styles['menu-item']} />}
						</ul>
					)}
				</section>
			</main>
		</>
	);
}