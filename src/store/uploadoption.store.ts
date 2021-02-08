import create, { State } from 'zustand'
import { UploadOptionAction } from '../../enums';

import { setCookie } from 'nookies';

const defaultState: UploadOptionState & State = {
	dispatch: (args) => args,
	protected: false,
	hidden: true,
};

const reducer = (state: UploadOptionState & State,
	action: { type: UploadOptionAction} & UploadOptionState): any => {

	switch (action.type) {
		case UploadOptionAction.TOGGLE_PROTECTED:
			action.protected = !state.protected;
			action.hidden = action.protected ? true : state.hidden;
			return action;

		case UploadOptionAction.TOGGLE_HIDDEN:
			action.hidden = !state.hidden;
			return action;

		case UploadOptionAction.SET:
			return action;

		default:
			return action;
	}
};

const useStore = create<UploadOptionState & State>((set) => ({
	...defaultState,
	dispatch: (args: any): any => {
		set((state) => reducer(state, args));
		setCookie(null, 'upload-option', JSON.stringify(args), {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
		});
	},
}));

export {
	useStore as uploadOptionStore,
};