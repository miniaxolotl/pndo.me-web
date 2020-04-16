import { Action } from 'redux'
import { AuthorizationAction, RootAction } from './_store.types';

const initialState: AuthorizationState = {
	loggedIn: false,
	token: null,
	username: null,
};

type StateAction = Action<RootAction> & AuthorizationState;

export const AuthorizationReducer =
	(state: AuthorizationState = initialState, action: StateAction) => {

	switch (action.type.action) {
		/* LOGIN */
		case AuthorizationAction.LOGIN:
			return state;

		/* LOGOUT */
		case AuthorizationAction.LOGOUT:
			return state;

		/* DEFAULT */
		default:
			return state ? state : initialState;
	}
};

export type authorizationState = ReturnType<typeof AuthorizationReducer>;