import { State } from 'zustand';
import { useContext } from 'react';

import { createStore as _createAuthStore,
	useHydrate as _hydrateAuthStore } from './reducers/auth.store';
import { createStore as _createUploadOptionStore,
	useHydrate as _hydrateUploadOptionStore } from './reducers/upload.option.store';

import { RootStore } from './store.enum';
import { StoreContext } from './StoreProvider';

export const createAllStore = () => {
	return {
		upload_option: _createUploadOptionStore(),
		auth: _createAuthStore()
	};
};

export const hydrateAllStore = (_state: RootStore): RootStore => {
	return {
		upload_option: _hydrateUploadOptionStore(_state.upload_option),
		auth: _hydrateAuthStore(_state.auth)
	};
};

export const useUploadOption = (_selector: (_state: UploadOptionState & State) => any) => {
	const store = useContext(StoreContext).upload_option;
	const values = store(_selector);
	return values;
};

export const useAuth = (_selector: (_state: AuthState & State) => any) => {
	const store = useContext(StoreContext).auth;
	const values = store(_selector);
	return values;
};