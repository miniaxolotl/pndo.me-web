import { persist } from 'zustand/middleware';
import { useMemo } from 'react';
import create, { State } from 'zustand';

import { UploadHistoryAction } from '../store.enum';
import { ACTION_CHECK, ACTION_CLEAR, ACTION_COMPLETE, ACTION_DELETE, ACTION_PROGRESS } from './upload.history.action';

const defaultState: UploadHistoryState & State = {
	dispatch: (_args) => _args,
	file_list: [],
	new_upload: null
};

const reducer = (state = defaultState, _state): any => {
	switch (_state.type) {
	case UploadHistoryAction.PROGRESS:
		return ACTION_PROGRESS(state, _state);
	case UploadHistoryAction.COMPLETE:
		return ACTION_COMPLETE(state, _state);
	case UploadHistoryAction.CLEAR:
		return ACTION_CLEAR(state, _state);
	case UploadHistoryAction.DELETE:
		return ACTION_DELETE(state, _state);
	case UploadHistoryAction.CHECK:
		return ACTION_CHECK(state, _state);
	}
};

const initStore = (_loadedState = defaultState) => {
	return create<UploadHistoryState & State>(
		persist((_set, _get, _api) => {
			return {
				...defaultState,
				..._loadedState,
				dispatch: (_args) => _set((_state: any) => reducer(_state, _args))
			};
		}, {
			name: 'upload-history',
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