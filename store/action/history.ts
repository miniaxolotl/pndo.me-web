import { State } from 'zustand';
import { HistoryAction } from '../../types';

export const addItem = (state: HistoryState & State,
		action: { type: HistoryAction} & HistoryState) => {

	state.history = state.history
	.filter(item => {
		return ((item.initiated != action.file!.initiated) && !item.inProgress)
	});
		
	action.history = [...state.history, action.file!];
		
	return action;
};

export const deleteItem = (state: HistoryState & State,
	action: { type: HistoryAction} & HistoryState) => {

	action.history
		= state.history.filter(item => item.file_id != action.file_id);

	return action;
};

export const progressItem = (state: HistoryState & State,
	action: { type: HistoryAction} & HistoryState) => {
	
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

export const clearList = (_state: HistoryState & State,
	action: { type: HistoryAction} & HistoryState) => {

	action.history = [];

	return action;
};

export const cleanList = (state: HistoryState & State,
	action: { type: HistoryAction} & HistoryState) => {
		
	action.history = state.history
	.filter(item => {
		return (item.progress == 100 && !item.inProgress);
	});
			
	return action;
};
