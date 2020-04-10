/// <reference types="next" />
/// <reference types="next/types/global" />

type UploadResponce = {
	id: string;
	name: string;
	url?: string;
	type?: string;
	downlods?: number;
	views?: number;
	bytes?: number;
	uploaded?: string;
	expires?: string;
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
};