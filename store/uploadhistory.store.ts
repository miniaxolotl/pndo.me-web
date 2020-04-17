import { Action } from 'redux'
import { RootAction, UploadHistoryAction } from './_store.types';
import { setCookie } from 'nookies';

const initialState: UploadHistoryState = {
	uploadList: [],
};

type StateAction = Action<RootAction> & UploadHistoryState;

export const UploadHistoryReducer =
	(state: UploadHistoryState = initialState, action: StateAction) => {
		
	switch (action.type.action) {
		/* ADD */
		case UploadHistoryAction.ADD:
			state.uploadList =
				state.uploadList.filter((i) =>
				i.timeInitiated != (action as any).payload.timeInitiated);
			
			state.uploadList
				= [...state.uploadList, (action as any).payload];
			(state.uploadList as any).type = undefined;
				
			setCookie(null, 'uploadHistory',
				JSON.stringify(state), null);
				
			return state;

		/* DELETE */
		case UploadHistoryAction.DELETE:
			state.uploadList =
				state.uploadList.filter((i) =>
				i.file_id != (action as any).file_id);
			
			setCookie(null, 'uploadHistory',
				JSON.stringify(state), null);
			
			return state;

		/* CLEANUP */
		case UploadHistoryAction.CLEANUP:
			state.uploadList =
				state.uploadList.filter((i) =>
				(i.curUpload == i.maxUpload) && i.filename && i.bytes);

			setCookie(null, 'uploadHistory',
				JSON.stringify(state), null);

			return state;

		/* PROGRESS */
		case UploadHistoryAction.PROGRESS:
			state.uploadList = state.uploadList.filter((e) =>
				e.timeInitiated != (action as any).payload.timeInitiated);

			const upload: FileMetadata = {
				filename: (action as any).payload.filename,
				timeInitiated: (action as any).payload.timeInitiated,
				curUpload: (action as any).payload.progress.loaded,
				maxUpload: (action as any).payload.progress.total,
			};

			state.uploadList = [...state.uploadList, upload];
				
			return state;

		/* DEFAULT */
		default:
			return state ? state : initialState;
	}
};

export type uploadHistoryState = ReturnType<typeof UploadHistoryReducer>;