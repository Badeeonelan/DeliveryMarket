export function loadState(key: string) {
	try {
		const data = localStorage.getItem(key)
		if (!data) {
			return undefined;
		} 
		return JSON.parse(data);
	} catch (error) {
		console.error(error)
		return undefined;
	}
}

export function saveState<T>(key: string, data: T) {
	const stringifyedData = JSON.stringify(data);
	localStorage.setItem(key, stringifyedData);
}