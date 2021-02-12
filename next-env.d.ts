/// <reference types="next" />
/// <reference types="next/types/global" />

interface AuthResponce {
	payload: UserData;
	authorization: string;
}

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

interface RootState extends BaseState {
	auth: AuthState;
};