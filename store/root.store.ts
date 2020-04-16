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
import { RootAction, ActionGroup } from './_store.types';
import { AuthorizationReducer } from './authorization.store';
import { HistoryReducer } from './history.store';


const initialState: RootState = {
	authorization: null,
	uploadHistory: null,
};

type StateAction = Action<RootAction> & RootState
	& UploadHistoryState & AuthorizationState;

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
				HistoryReducer(state.uploadHistory, action);
			return state;

		/* DEFAULT */
		default:
			state.authorization
				= AuthorizationReducer(state.authorization, action);
			state.uploadHistory = 
				HistoryReducer(state.uploadHistory, action);
			
			return state;
	}
};

export type rootState = ReturnType<typeof reducer>;