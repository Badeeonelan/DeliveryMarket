import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, defer, LoaderFunctionArgs, RouterProvider } from 'react-router-dom'
import { Cart } from './pages/Cart/Cart.tsx'
import { Unmatched } from './pages/unmatched/unmatched.tsx'
import { MenuLayout } from './components/Layout/Menu/MenuLayout.tsx'
import Product from './pages/Product/Product.tsx'
import { IProduct } from './interfaces/Product.interface.ts'
import { PREFIX } from './helpers/API.ts'
import axios from 'axios'
import AuthLayout from './components/Layout/Auth/AuthLayout.tsx'
import Registration from './pages/Registration/Registration.tsx'
import Login from './pages/Login/Login.tsx'
import RequireAuth from './helpers/RequireAuth.tsx'
import AuthContextProvider from './context/AuthContext'

const Menu = lazy(() => import('./pages/Menu/Menu.tsx'))

const routes = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><MenuLayout /></RequireAuth>,
		children: [
			{
				element: <Suspense fallback={<>Идет загрузка йоу</>}><Menu /></Suspense>,
				index: true
			},
			{
				path: 'cart',
				element: <Cart/>
			},
			{
				path: 'product/:id',
				element: <Product />,
				errorElement: <Unmatched/>,
				loader: async ({ params }: LoaderFunctionArgs) => {
					return defer({
						data: new Promise(resolve => {
						setTimeout(() => {
							axios.get<IProduct>(`${PREFIX}/products/${params.id}`)
								.then(res => {
									resolve(res)
								})
						}, 2000)
						})
					})
					
				}
			}
		]
	},

	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'register',
				element: <Registration/>
			},
			{
				path: 'login',
				element: <Login/>
			}
		]
	},
	
	{
		path: '*',
		element: <Unmatched/>
	}
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthContextProvider>
			<RouterProvider router={routes}/>
		</AuthContextProvider>
   </StrictMode>,
)
