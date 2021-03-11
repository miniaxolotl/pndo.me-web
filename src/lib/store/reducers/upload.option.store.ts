import { persist } from 'zustand/middleware';
import { useMemo } from 'react';
import create, { State } from 'zustand';

import { UploadOptionAction } from '../store.enum';

const defaultState: UploadOptionState & State = {
	dispatch: (_args) => _args,
	hidden: true,
	protected: false
};

const reducer = (state = defaultState, _state): any => {
	switch (_state.type) {
	case UploadOptionAction.TOGGLE_HIDDEN:
		return { hidden: !state.hidden };
	case UploadOptionAction.TOGGLE_PROTECTED:
		return { protected: !state.protected };
	case UploadOptionAction.SET:
		return { ..._state };
	}
};

const initStore = (_loadedState = defaultState) => {
	return create<UploadOptionState & State>(
		persist((_set, _get, _api) => {
			return {
				...defaultState,
				..._loadedState,
				dispatch: (_args) => _set((_state: any) => reducer(_state, _args))
			};
		}, {
			name: 'upload-option',
			getStorage: () => localStorage
		})
	);
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