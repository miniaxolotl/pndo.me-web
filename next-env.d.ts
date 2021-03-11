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

interface Album {
	album_id: string;
	title: string;
	files: number;
	bytes: number;
	protected: boolean;
	hidden: boolean;
	d_count: number;
	v_count: number;
	create_date: Date | string;
}

interface FileLong {
	album_id: string;
	file_id: string;
	sha256: string;
	md5: string;
	filename: string;
	type: string;
	bytes: number;
	protected: boolean;
	hidden: boolean;
	create_date: Date | string;
	expire_date: Date | string;
	v_count: number;
	d_count: number;
	ext: boolean;
}

interface FileShort {
	album_id?: string;
	file_id?: string;
	filename?: string;
	type?: string;
	bytes?: number;
	protected?: boolean;
	hidden?: boolean;
	d_count?: number;
	v_count?: number;
	create_date?: Date | number;
}

interface FileState extends FileShort {
	initiated?: number;
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
	new_upload: FileState;
}

interface AuthState extends UserData, BaseState {
	authorization: string | null;
	loggedIn: boolean;
}