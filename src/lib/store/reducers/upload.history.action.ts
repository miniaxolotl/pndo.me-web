import { State } from 'zustand';
import { UploadHistoryAction } from '../store.enum';

type ActionType = { type: UploadHistoryAction } & UploadHistoryState;

export const ACTION_PROGRESS = (state: UploadHistoryState & State, action: ActionType) => {
	state.file_list = state.file_list.filter(item => {
		return (action.new_upload.temp_id.localeCompare(item.temp_id));
	});
	
	action.file_list = [ ...state.file_list, action.new_upload ];

	action.file_list = [ ...action.file_list.sort((a, b) => {
		return (b.initiated - a.initiated);
	}) ];
	
	return action;
};

export const ACTION_COMPLETE = (state: UploadHistoryState & State, action: ActionType) => {
	(action.new_upload as any).album = undefined;
	(action.new_upload as any).files = undefined;

	const _new_file: FileState = { 
		...action.new_upload
	};
	
	state.file_list = state.file_list.filter(item => {
		return (action.new_upload.temp_id.localeCompare(item.temp_id));
	});

	action.file_list = [ ...state.file_list, _new_file ];
	
	action.file_list = [ ...action.file_list.sort((a, b) => {
		return (b.initiated - a.initiated);
	}) ];
	
	return action;
};

export const ACTION_CLEAR = (state: UploadHistoryState & State, action: ActionType) => {
	state.file_list = state.file_list.filter(item => {
		return (item && action.new_upload && action.new_upload.temp_id.localeCompare(item.temp_id));
	});

	action.file_list = [ ...state.file_list ];
	
	action.file_list = [ ...action.file_list.sort((a, b) => {
		return (b.initiated - a.initiated);
	}) ];
	
	return action;
};