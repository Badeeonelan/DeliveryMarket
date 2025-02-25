import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
	id: number;
	count: number;
}

export interface CartState {
	products: CartItem[];
}

const initialState: CartState = {
	products: []
} 

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	selectors: {
		selectCart: (state) => state.products
	},
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const existed = state.products.find((el) => el.id == action.payload);
			
			if (!existed) {
				state.products.push({ id: action.payload, count: 1 });
			} else {
				state.products.forEach((el) => {
					if (el.id == action.payload) {
						el.count += 1;
					}
				})
			}
		},
		
		remove: (state, action: PayloadAction<number>) => {
			state.products.forEach((product) => {
				if (product.id == action.payload) {
					product.count -= 1;
					
					if (product.count == 0) {
						state.products.filter((el) => {
							return el.id !== product.id;
						})
					}
				}
			})
		}
	}
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;