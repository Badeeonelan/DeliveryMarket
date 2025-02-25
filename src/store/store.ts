import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_STORAGE_KEY } from "./user.slice";
import { useSelector } from "react-redux";
import { saveState } from "./storage";

export const store = configureStore({
	reducer: {
		user: userSlice
	}
});

store.subscribe(() => {
	saveState(JWT_STORAGE_KEY, store.getState().user.jwt);
})

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<TRootState>();