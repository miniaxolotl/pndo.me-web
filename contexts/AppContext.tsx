import { createContext, useContext } from 'react';

const AppContext = createContext({});

export const AppWrapper = ({ children }: any) => {
	
	const state = {};
	
	return (
		<AppContext.Provider value={ state }>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
