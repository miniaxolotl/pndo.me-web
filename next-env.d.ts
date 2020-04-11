/// <reference types="next" />
/// <reference types="next/types/global" />

type UploadResponce = {
	id: string | FileUID | number;
	name: string;
	url?: string;
	type?: string;
	downlods?: number;
	views?: number;
	bytes?: number;
	uploaded?: string;
	expires?: string;
	loaded?: number;
	total?: number;
	delta?: number;
};

type RootState = {
	authorization: null | AuthorizationState,
	history: null | HistoryState,
};

type AuthorizationState = {
	loggedIn: boolean;
	admin: boolean;
	token: string | null;
	user: string | null;
};

type HistoryState = {
	list: UploadResponce[];
	item?: UploadResponce;
	uid?: FileUID;
	id?: string;
	progress?: ProgressEvent;
};

type FileUID = {
	file: File,
	delta: number
}