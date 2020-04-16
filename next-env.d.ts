/// <reference types="next" />
/// <reference types="next/types/global" />

type FileMetadata = {
	file_id?: string;
	sha256?: string,
	md5?: string,
	filename: string;
	type?: string;
	owner?: string | null,
	protected?: boolean;
	hidden?: boolean;
	downloads?: number;
	views?: number;
	uploaded?: string;
	expires?: string;
	bytes?: number;

	curUpload?: number;
	maxUpload?: number;
	
	timeInitiated?: number;
};

type RootState = {
	authorization: null | AuthorizationState,
	uploadHistory: null | UploadHistoryState,
	uploadOption: null | UploadOptionState,
};

type AuthorizationState = {
	loggedIn: boolean;
	authorization: string | null;
	username: string | null;
	profile: string | null;
};

type UploadHistoryState = {
	uploadList: FileMetadata[];
};

type UploadOptionState = {
	hidden: boolean;
	protected: boolean;
};

interface User {
	profile: string;
	username: string;
};

interface Authorization {
	user: User;
	authorization: string;
};

interface ErrorMessage {
	status: number;
	message: string;
};