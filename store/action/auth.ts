import { AuthAction } from '../../types';

export const logIn = (action: { type: AuthAction} & AuthState) => {
	action.loggedIn = true;
	return action;
};

export const logOut = (action: { type: AuthAction} & AuthState) => {
	action.loggedIn = false;
	return action;
};