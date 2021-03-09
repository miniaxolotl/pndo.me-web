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

interface BaseState {
	dispatch: (action: { type: any }) => any;
}

interface UploadOptionState extends BaseState {
	protected: boolean;
	hidden: boolean;
}

interface AuthState extends UserData, BaseState {
	authorization: string | null;
	loggedIn: boolean;
}