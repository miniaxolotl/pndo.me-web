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

import { AuthorizationReducer } from './AuthorizationStore';
import { HistoryReducer } from './HistoryStore';
import { ActionGroup, RootAction } from './_types';

const initialState: RootState = {
	authorization: null,
	history: null,
};

type StateAction = Action<RootAction> & RootState
	& HistoryState & AuthorizationState;

export const reducer =
	(state: RootState = initialState, action: StateAction) => {

	switch (action.type.group) {
		/* AUTHORIZATION */
		case ActionGroup.AUTHORIZATION:
			state.authorization = 
				AuthorizationReducer(state.authorization, action);
			return state;

		/* HISTORY */
		case ActionGroup.HISTORY:
			state.history = 
				HistoryReducer(state.history, action);
			return state;

			
		case ActionGroup.ROOT:
			state.authorization
				= AuthorizationReducer(state.authorization, action);
			state.history = 
				HistoryReducer(state.history, action);
			
			return state;

		/* DEFAULT */
		default:
			return state;
	}
};

export type rootState = ReturnType<typeof reducer>;