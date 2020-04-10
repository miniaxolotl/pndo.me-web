/**
 * HistoryStore.ts
 * - Manages state of uopload history.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

import { Action } from 'redux'
import { HistoryAction, RootAction } from './_types';

const initialState: HistoryState = {
	list: [],
};

type StateAction = Action<RootAction> & HistoryState;

export const HistoryReducer =
	(state: HistoryState = initialState, action: StateAction) => {
		
	switch (action.type.action) {
		/* ADD */
		case HistoryAction.ADD:
			state.list = [...state.list, action.item];
			
			return state;

		/* DELETE */
		case HistoryAction.DELETE:
			return state;

		/* DEFAULT */
		default:
			return state ? state : initialState;
	}
};

export type historyState = ReturnType<typeof HistoryReducer>;