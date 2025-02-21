import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	jwt: string | null;
}

const initialState: UserState = {
	jwt: null,
} 

export const userSlice = createSlice({
	name: 'user',
	initialState,
	selectors: {
		selectJwt: (state) => state.jwt
	},
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
		},
		removeJwt: (state) => {
			state.jwt = null;		
		}
	}
})

export default userSlice.reducer;
export const userActions = userSlice.actions;