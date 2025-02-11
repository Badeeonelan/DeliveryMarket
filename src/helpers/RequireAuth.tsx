import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext/AuthContext";

export default function RequireAuth({ children }: { children: ReactNode}) {
	const jwt = useContext(AuthContext);
	if (!jwt?.isAuth) {
		return <Navigate to='/auth/login' replace/>
	}
	
	return children;
}