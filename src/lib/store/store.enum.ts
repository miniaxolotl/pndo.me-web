import { UseStore } from 'zustand';

export interface RootStore {
	upload_option: UseStore<UploadOptionState & Record<string | number | symbol, unknown>>;
	auth: UseStore<AuthState & Record<string | number | symbol, unknown>>;
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