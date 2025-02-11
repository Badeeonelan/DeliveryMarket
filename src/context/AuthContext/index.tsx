import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthContextProvider({ children }: { children: ReactNode}) {
	const [isAuth, setIsAuth] = useState<boolean>(() => {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			return true;
		}
		return false;
	});
	
	return (
		<AuthContext.Provider value={{isAuth: isAuth, setIsAuth: setIsAuth}}>
			{children}
		</AuthContext.Provider>
	);
}