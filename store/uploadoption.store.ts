import { Action } from 'redux'
import { RootAction, UploadOptionAction } from './_store.types';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

const initialState: UploadOptionState = {
	protected: true,
	hidden: true,
};

type StateAction = Action<RootAction> & UploadOptionState;

export const UploadOptionReducer =
	(state: UploadOptionState = initialState, action: StateAction) => {
		
	switch (action.type.action) {
		/* TOGGLE_HIDDEN */
		case UploadOptionAction.TOGGLE_HIDDEN:
			state = action;
			action.type = null;
			setCookie(null, 'uploadOption', JSON.stringify(state), null);
			
			return state;

		/* TOGGLE_PROTECTED */
		case UploadOptionAction.TOGGLE_PROTECTED:
			state = action;
			action.type = null;
			setCookie(null, 'uploadOption', JSON.stringify(state), null);
			
			return state;

		/* DEFAULT */
		default:
			return state ? state : initialState;
	}
};

export type uploadOptionState = ReturnType<typeof UploadOptionReducer>;