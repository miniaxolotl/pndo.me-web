import create, { State } from 'zustand'
import { OptionAction } from '../types';

import { setCookie } from 'nookies';

const defaultState: OptionState & State = {
	dispatch: (args) => args,
	protected: false,
	hidden: true,
};

const reducer = (state: OptionState & State,
	action: { type: OptionAction} & OptionState): any => {

	switch (action.type) {
		case OptionAction.TOGGLE_PROTECTED:
			action.protected = !state.protected;
			action.hidden = action.protected ? true : state.hidden;
			return action;

		case OptionAction.TOGGLE_HIDDEN:
			action.hidden = !state.hidden;
			return action;

		case OptionAction.SET:
			return action;

		default:
			return state;
	}
};

const useStore = create<OptionState & State>((set) => ({
	...defaultState,
	dispatch: (args: any): any => {
		set((state) => reducer(state, args));
		setCookie(null, 'upload-option', JSON.stringify(args), {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
			sameSite: true,
		});
	},
}));

export {
	useStore as optionStore,
};