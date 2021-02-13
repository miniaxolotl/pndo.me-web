import create, { State } from 'zustand'
import { HistoryAction } from '../types';
import { addItem, cleanList, clearList, deleteItem, progressItem } from './action/history';

import { setCookie } from 'nookies';

const defaultState: HistoryState & State = {
	dispatch: (args) => args,
	history: [],
	file: null,
	file_id: null,
};

const reducer = (state: HistoryState & State,
	action: { type: HistoryAction} & HistoryState): any => {

	switch (action.type) {
		case HistoryAction.ADD:
			return addItem(state, action);

		case HistoryAction.DELETE:
			return deleteItem(state, action);

		case HistoryAction.PROGRESS:
			return progressItem(state, action);

		case HistoryAction.CLEAR:
			return clearList(state, action);

		case HistoryAction.CLEAN:
			return cleanList(state, action);

		default:
			return state;
	}
};

const useStore = create<HistoryState & State>((set) => ({
	...defaultState,
	dispatch: (args: any): any => {
		set((state) => reducer(state, args));
		setCookie(null, 'upload-history', JSON.stringify(args), {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
			sameSite: true,
		});
	},
}));

export {
	useStore as historyStore,
};