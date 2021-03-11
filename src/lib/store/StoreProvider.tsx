import { createContext } from 'react';

import { RootStore } from './store.enum';

interface Props { 
	children: React.ReactNode;
	store: RootStore;
}

export const StoreContext = createContext<Props['store']>(null);

export const StoreProvider = ({ children, store }: Props) => {
	return(
		<StoreContext.Provider value={store}>
			{children}
		</StoreContext.Provider>
	);
};