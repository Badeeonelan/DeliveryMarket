import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import { useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		user: userSlice
	}
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<TRootState>();