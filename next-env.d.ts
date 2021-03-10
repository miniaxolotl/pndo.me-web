/// <reference types="next" />
/// <reference types="next/types/global" />

interface UserData {
	user_id: string;
	email: string;
	username: string;
	password?: string;
	admin: boolean;
	banned: boolean;
}

// interface FileLong {
// 	file_id: string;
// 	sha256: string;
// 	md5: string;
// 	filename: string;
// 	type: string;
// 	bytes: number;
// 	protected: boolean;
// 	hidden: boolean;
// 	create_date: Date | number;
// 	expire_date: Date | number;
// 	downloads: number;
// 	views: number;
// 	ext: boolean;
// }

interface FileShort {
	album_id: number;
	filename: number;
	type: boolean;
	bytes: boolean;
	sha256: string;
	md5: string;
	type: boolean;
	d_count: number;
	v_count: number;
	create_date: Date | number;
}

interface FileState extends FileShort {
	temp_id?: string;
	progress?: number;
	complete?: boolean;
	error?: boolean;
}

interface BaseState {
	dispatch: (action: any) => any;
}

interface UploadOptionState extends BaseState {
	protected: boolean;
	hidden: boolean;
}

interface UploadHistoryState extends BaseState {
	file_list: FileState[];
	file: FileState | null;
}

interface AuthState extends UserData, BaseState {
	authorization: string | null;
	loggedIn: boolean;
}