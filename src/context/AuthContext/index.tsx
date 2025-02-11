import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthContextProvider({ children }: { children: ReactNode}) {
	const [isAuth, setIsAuth] = useState<boolean>(() => {
		if (localStorage.getItem('jwt')) {
			return true;
		}
		return false;
	});
	
	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			{children}
		</AuthContext.Provider>
	);
}