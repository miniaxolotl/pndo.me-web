import { State } from 'zustand';
import { UploadHistoryAction } from '../../enums';

export const addItem = (state: UploadHistoryState & State,
		action: { type: UploadHistoryAction} & UploadHistoryState) => {

	state.history = state.history
	.filter(item => {
		return ((item.initiated != action.file!.initiated) && !item.inProgress)
	});
		
	action.history = [...state.history, action.file!];
		
	return action;
};

export const deleteItem = (state: UploadHistoryState & State,
	action: { type: UploadHistoryAction} & UploadHistoryState) => {

	action.history
		= state.history.filter(item => item.file_id != action.file_id);

	return action;
};

export const progressItem = (state: UploadHistoryState & State,
	action: { type: UploadHistoryAction} & UploadHistoryState) => {

	state.history = state.history
	.filter(item => {
		return ((item.initiated != action.file!.initiated))
	});
	
	action.history = [...state.history, action.file!];
	
	action.history = action.history.sort((a, b) => {
		return ((a.initiated as any as number) - (b.initiated as any as number))
	});

	return action;
};

export const clearList = (_state: UploadHistoryState & State,
	action: { type: UploadHistoryAction} & UploadHistoryState) => {

	action.history = [];

	return action;
};
