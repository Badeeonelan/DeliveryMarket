import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const JWT_STORAGE_KEY = 'jwt';

export interface UserState {
	jwt: string | null;
}

const initialState: UserState = {
	jwt: loadState(JWT_STORAGE_KEY) ?? null,
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