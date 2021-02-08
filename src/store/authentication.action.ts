import { AuthenticationAction } from '../../enums';

export const logIn = (action: { type: AuthenticationAction} & AuthenticationState) => {
	action.loggedIn = true;
	return action;
};

export const logOut = (action: { type: AuthenticationAction} & AuthenticationState) => {
	action.loggedIn = false;
	return action;
};