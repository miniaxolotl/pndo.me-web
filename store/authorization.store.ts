import { Action } from 'redux'
import { AuthorizationAction, RootAction } from './_store.types';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

const initialState: AuthorizationState = {
	loggedIn: false,
	authorization: null,
	username: null,
	profile: null,
};

type StateAction = Action<RootAction> & AuthorizationState;

export const AuthorizationReducer =
	(state: AuthorizationState = initialState, action: StateAction) => {
		
	switch (action.type.action) {
		/* LOGIN */
		case AuthorizationAction.AUTHORIZE:
			state = action;
			action.type = null;
			setCookie(null, 'authorization', JSON.stringify(state), null);
			
			return state;

		/* LOGOUT */
		case AuthorizationAction.LOGOUT:
			state = initialState;
			destroyCookie(null, 'authorization');

			return state;

		/* DEFAULT */
		default:
			return state ? state : initialState;
	}
};

export type authorizationState = ReturnType<typeof AuthorizationReducer>;