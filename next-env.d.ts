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
};

interface AuthResponce {
	payload: UserData;
	authorization: string;
};

interface UserData {
	user_id: string;
	username: string;
	password?: string;
	email: string;
	admin: boolean;
	banned: boolean;
};

interface BaseState {
	dispatch: (action: { type: any }) => any;
};

interface AuthState extends BaseState {
	loggedIn: boolean;
	user: UserData | null;
	key: string | null,
};

interface OptionState extends BaseState {
	protected: boolean;
	hidden: boolean;
};

interface HistoryState extends BaseState {
	history: FileData[];
	file: FileData | null;
	file_id: string | null;
};