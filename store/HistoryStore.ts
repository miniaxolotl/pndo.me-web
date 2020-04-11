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
import { parseCookies, setCookie } from 'nookies';

const initialState: HistoryState = {
	list: [],
};

type StateAction = Action<RootAction> & HistoryState;

export const HistoryReducer =
	(state: HistoryState = initialState, action: StateAction) => {
		
	switch (action.type.action) {
		/* ADD */

		case HistoryAction.ADD:
			state.list = state.list.filter((e) => e.delta != action.item.delta);
			action.item.delta = null;
			state.list = [...state.list, action.item];
			setCookie(null, 'history', JSON.stringify(state.list), null);

			return state;

		/* DELETE */
		case HistoryAction.DELETE:
			state.list = state.list.filter((e) => e.id != action.id);
			setCookie(null, 'history', JSON.stringify(state.list), null);
			
			return state;


		/* CLEANUP */
		case HistoryAction.CLEANUP:
			state.list = state.list.filter((e) => !e.delta);
			setCookie(null, 'history', JSON.stringify(state.list), null);
			
			return state;
	
		/* PROGRESS */
		case HistoryAction.PROGRESS:
			state.list = state.list.filter((e) => e.id != action.uid.delta);

			const item: UploadResponce = {
				id: action.uid.delta,
				name: action.uid.file.name,
				total: action.progress.total,
				loaded: action.progress.loaded,
				delta: action.uid.delta,
			};

			state.list = [...state.list, item];
			
			setCookie(null, 'history', JSON.stringify(state.list), null);

			return state;

		/* DEFAULT */
		default:

			return state ? state : initialState;
	}
};

export type historyState = ReturnType<typeof HistoryReducer>;