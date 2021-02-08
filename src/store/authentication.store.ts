import create, { State } from 'zustand'
import { AuthenticationAction } from '../../enums';
import { logIn, logOut } from './authentication.action';

import { setCookie } from 'nookies';

const defaultState: AuthenticationState & State = {
	dispatch: (args) => args,
	key: null,
	user_id: null,
	username: null,
	email: null,
	admin: null,
	banned: null,
	loggedIn: false,
};

const reducer = (state: AuthenticationState & State,
	action: { type: AuthenticationAction} & AuthenticationState): any => {

	switch (action.type) {
		case AuthenticationAction.LOGIN:
			return logIn(action);

		case AuthenticationAction.LOGOUT:
			return {
				...logOut(action),
			};

		default:
			return state;
	}
};

const useStore = create<AuthenticationState & State>((set) => ({
	...defaultState,
	dispatch: (args: any): any => {
		set((state) => reducer(state, args));
		setCookie(null, 'authentication', JSON.stringify(args), {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
		});
	},
}));

export {
	useStore as authenticationStore,
};