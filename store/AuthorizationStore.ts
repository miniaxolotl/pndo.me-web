/**
 * AuthenticationStore.ts
 * - Handles state of user authentication.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

import { Action } from 'redux'
import { AuthorizationAction, RootAction } from './_types';

const initialState: AuthorizationState = {
	loggedIn: false,
	admin: false,
	token: null,
	user: null,
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