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
			state.uploadList
				= state.uploadList.filter((e) =>
				e.timeInitiated != (action as any).data.timeInitiated);

			(action as any).data.timeInitiated = -1;

			state.uploadList
				= [...state.uploadList, (action as any).data];
				
			setCookie(null, 'uploadHistory',
				JSON.stringify(state.uploadList), null);
				
			return state;

		/* DELETE */
		case UploadHistoryAction.DELETE:
			state.uploadList = state.uploadList
			.filter((e) => e.file_id != (action as any).file_id);
			
			setCookie(null, 'uploadHistory',
				JSON.stringify(state.uploadList), null);
			
			return state;

		/* CLEANUP */
		case UploadHistoryAction.CLEANUP:
			state.uploadList
				= state.uploadList.filter((e) => e.timeInitiated > 0);

			setCookie(null, 'uploadHistory',
				JSON.stringify(state.uploadList), null);

			return state;
	
		/* PROGRESS */
		case UploadHistoryAction.PROGRESS:
			state.uploadList = state.uploadList
			.filter((e) => e.timeInitiated != (action as any).item.delta);

			const item: FileMetadata = {
				filename: (action as any).item.filename,
				timeInitiated: (action as any).item.delta,
				curUpload: (action as any).item.progress.loaded,
				maxUpload: (action as any).item.progress.total,
			};

			state.uploadList = [...state.uploadList, item];

			return state;

		/* DEFAULT */
		default:
			return state ? state : initialState;
	}
};

export type uploadHistoryState = ReturnType<typeof UploadHistoryReducer>;