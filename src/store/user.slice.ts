import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const JWT_STORAGE_KEY = 'jwt';

export interface IUserInfo {
	id: number;
	email: string;
	passwordHash: string;
	address: string;
	name: string;
	restoreToken: any;
	phone: string;
}

export interface UserState {
	jwt: string | null;
	userInfo: IUserInfo | null;
}

const initialState: UserState = {
	jwt: loadState(JWT_STORAGE_KEY) ?? null,
	userInfo: null
} 

export const userSlice = createSlice({
	name: 'user',
	initialState,
	selectors: {
		selectJwt: (state) => state.jwt,
		selectUser: (state) => state.userInfo
	},
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
		},
		removeJwt: (state) => {
			state.jwt = null;		
		},
		addUser: (state, action: PayloadAction<IUserInfo>) => {
			state.userInfo = action.payload;
		}
	}
})

export default userSlice.reducer;
export const userActions = userSlice.actions;