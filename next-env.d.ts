/// <reference types="next" />
/// <reference types="next/types/global" />

interface FileData {
	file_id: string;
	sha256: string;
	md5: string;
	filename: string;
	type: string;
	bytes: number;
	user_id: string;
	protected: boolean;
	hidden: boolean;
	expire_date: string;
	downloads: number;
	views: number;
	create_date: Date | number;
	deleted: boolean;

	inProgress?: boolean;
	progress?: number;
	initiated?: Date;
}

interface UserData {
	user_id: string | null;
	username: string | null;
	password?: string;
	email: string | null;
	admin: boolean | null;
	banned: boolean | null;
}

interface AuthenticationResponce {
	payload: UserData;
	authorization: string;
}

interface BaseState {
	dispatch: (action: { type: any }) => any;
};

interface AuthenticationState extends BaseState, UserData {
	key: string | null,
	loggedIn: boolean | null;
};

interface UploadOptionState extends BaseState {
	protected: boolean;
	hidden: boolean;
};

interface UploadHistoryState extends BaseState {
	history: FileData[];
	file: FileData | null;
	file_id: string | null;
};