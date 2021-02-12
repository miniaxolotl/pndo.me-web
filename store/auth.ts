import create, { State } from 'zustand'

import { setCookie } from 'nookies';

import { AuthAction } from '../types';
import { logIn, logOut } from './action/auth';

const defaultState: AuthState & State = {
	dispatch: (args) => args,
	loggedIn: false,
	user: null,
	key: null,
};

const reducer = (state: AuthState & State,
	action: { type: AuthAction} & AuthState): any => {

	switch (action.type) {
		case AuthAction.LOGIN:
			return logIn(action);

		case AuthAction.LOGOUT:
			return {
				...logOut(action),
			};

		default:
			return state;
	}
};

const useStore = create<AuthState & State>((set) => ({
	...defaultState,
	dispatch: (args: any): any => {
		set((state) => reducer(state, args));
		setCookie(null, 'authentication', JSON.stringify(args), {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
			sameSite: true,
		});
	},
}));

export {
	useStore as authStore,
};