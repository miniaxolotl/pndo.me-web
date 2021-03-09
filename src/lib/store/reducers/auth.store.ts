import { persist } from 'zustand/middleware';
import { useMemo } from 'react';
import create, { State } from 'zustand';

import { AuthAction } from '../store.enum';
import { cookieStorage } from '../../data/cookie.storage';

const defaultState: AuthState & State = {
	dispatch: (_args) => _args,
	loggedIn: false,
	user: null
};

const reducer = (state = defaultState, { type }): any => {
	switch (type) {
	case AuthAction.LOGIN:
		return { loggedIn: true };
	case AuthAction.LOGOUT:
		return { loggedIn: false };
	default:
		return state;
	}
};

const initStore = (_loadedState = defaultState) => {
	return create<AuthState & State>(persist((_set, _get) => ({
		...defaultState,
		..._loadedState,
		dispatch: (_args) => _set((_state: any) => reducer(_state, _args))
	}), {
		name: 'authentication',
		getStorage: () => cookieStorage
	}));
};

export const createStore = (_loadedState?) => {
	let _store, store;
	_store = store = initStore(_loadedState);

	if (_loadedState && store) {
		_store = initStore({
		  ...store.getState(),
		  ..._loadedState
		});
	}

	if (typeof window === 'undefined') return _store;
	if (!store) store = _store;
  
	return _store;
};

export const useHydrate = (_defaultState) => {
	const state = typeof _defaultState === 'string' ? JSON.parse(_defaultState) : _defaultState;
	const store = useMemo(() => createStore(state), [ state ]);
	return store;
};