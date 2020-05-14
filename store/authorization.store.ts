import { Action } from 'redux'
import { AuthorizationAction, RootAction } from './_store.types';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

const initialState: AuthorizationState = {
	loggedIn: false,
	authorization: null,
	username: null,
	display_name: null,
	profile_id: null,
	flags: {
		admin: false,
		moderator: false,
		banned: false,
	},
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