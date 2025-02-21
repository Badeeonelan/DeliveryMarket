import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { userSlice } from "../store/user.slice";

export default function RequireAuth({ children }: { children: ReactNode}) {
	// const jwt = localStorage.getItem('jwt');
	const jwt = useAppSelector(userSlice.selectors.selectJwt)
	
	if (!jwt) {
		return <Navigate to='/auth/login' replace={true} />
	}
	
	return children;
}