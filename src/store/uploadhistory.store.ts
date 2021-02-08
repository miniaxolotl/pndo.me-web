import create, { State } from 'zustand'
import { UploadHistoryAction } from '../../enums';
import { addItem, clearList, deleteItem, progressItem } from './uploadhistory.action';

import { setCookie } from 'nookies';

const defaultState: UploadHistoryState & State = {
	dispatch: (args) => args,
	history: [],
	file: null,
	file_id: null,
};

const reducer = (state: UploadHistoryState & State,
	action: { type: UploadHistoryAction} & UploadHistoryState): any => {

	switch (action.type) {
		case UploadHistoryAction.ADD:
			return addItem(state, action);

		case UploadHistoryAction.DELETE:
			return deleteItem(state, action);

		case UploadHistoryAction.PROGRESS:
			return progressItem(state, action);

		case UploadHistoryAction.CLEAR:
			return clearList(state, action);

		default:
			return action;
	}
};

const useStore = create<UploadHistoryState & State>((set) => ({
	...defaultState,
	dispatch: (args: any): any => {
		set((state) => reducer(state, args));
		setCookie(null, 'upload-history', JSON.stringify(args), {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
		});
	},
}));

export {
	useStore as uploadHistoryStore,
};