/**
 * RootStore.ts
 * - Root level store.
 * - Filters actions to sub-stores.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

import { Action } from 'redux'
import { RootAction, ActionGroup, UploadOptionAction } from './_store.types';
import { AuthorizationReducer } from './authorization.store';
import { UploadHistoryReducer } from './uploadhistory.store';
import { UploadOptionReducer } from './uploadoption.store';


const initialState: RootState = {
	authorization: null,
	uploadHistory: null,
	uploadOption: null,
};

type StateAction = Action<RootAction> & RootState
	& UploadHistoryState & AuthorizationState
	& UploadOptionState;

export const reducer =
	(state: RootState = initialState, action: StateAction) => {

	switch (action.type.group) {
		/* AUTHORIZATION */
		case ActionGroup.AUTHORIZATION:
			state.authorization = 
				AuthorizationReducer(state.authorization, action);
			return state;

		/* HISTORY */
		case ActionGroup.UPLOAD_HISTORY:
			state.uploadHistory = 
				UploadHistoryReducer(state.uploadHistory, action);
			return state;
			/* HISTORY */

		case ActionGroup.UPLOAD_OPTION:
			state.uploadOption = 
				UploadOptionReducer(state.uploadOption, action);
			return state;

		/* DEFAULT */
		default:
			state.authorization
				= AuthorizationReducer(state.authorization, action);
			state.uploadHistory
				= UploadHistoryReducer(state.uploadHistory, action);
			state.uploadOption = 
				UploadOptionReducer(state.uploadOption, action);
			
			return state;
	}
};

export type rootState = ReturnType<typeof reducer>;