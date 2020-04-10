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
import { ActionGroup, RootAction } from './_types';
import { AuthorizationReducer } from './AuthorizationStore';
import { HistoryReducer } from './HistoryStore';

const initialState: RootState = {
	authorization: null,
	history: null,
};

type StateAction = Action<RootAction> & RootState;

export const reducer =
	(state: RootState = initialState, action: StateAction) => {

	switch (action.type.group) {
		/* AUTHORIZATION */
		case ActionGroup.AUTHORIZATION:
			return state;

		/* HISTORY */
		case ActionGroup.HISTORY:
			return state;

		/* DEFAULT */
		default:
			state.authorization = 
				AuthorizationReducer(state.authorization, action as any);
			state.history = 
				HistoryReducer(state.history, action as any);
				
			return state;
	}
};

export type rootState = ReturnType<typeof reducer>;