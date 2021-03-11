import { UseStore } from 'zustand';

export interface RootStore {
	upload_option: UseStore<UploadOptionState & Record<string | number | symbol, unknown>>;
	upload_history: UseStore<UploadHistoryState & Record<string | number | symbol, unknown>>;
	auth: UseStore<AuthState & Record<string | number | symbol, unknown>>;
}

export enum UploadHistoryAction {
	COMPLETE,
	PROGRESS,
	DELETE,
	ERROR,
	CLEAR
}

export enum UploadOptionAction {
	TOGGLE_HIDDEN,
	TOGGLE_PROTECTED,
	SET
}

export enum AuthAction {
	LOGIN,
	LOGOUT
}