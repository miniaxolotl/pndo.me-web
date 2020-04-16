import { Action } from 'redux'
import { RootAction, UploadHistoryAction } from './_store.types';

const initialState: UploadHistoryState = {
	uploadList: [],
};

type StateAction = Action<RootAction> & UploadHistoryState;

export const UploadHistoryReducer =
	(state: UploadHistoryState = initialState, action: StateAction) => {
		
	switch (action.type.action) {
		/* ADD */
		case UploadHistoryAction.ADD:
			return state;

		/* DELETE */
		case UploadHistoryAction.DELETE:
			return state;

		/* CLEANUP */
		case UploadHistoryAction.CLEANUP:
			return state;
	
		/* PROGRESS */
		case UploadHistoryAction.PROGRESS:
			return state;

		/* DEFAULT */
		default:
			return state ? state : initialState;
	}
};

export type uploadHistoryState = ReturnType<typeof UploadHistoryReducer>;