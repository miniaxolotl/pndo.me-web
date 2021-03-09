/// <reference types="next" />
/// <reference types="next/types/global" />

interface BaseState {
	dispatch: (action: { type: any }) => any;
}

interface UploadOptionState extends BaseState {
	protected: boolean;
	hidden: boolean;
}

interface AuthState extends BaseState {
	user: Record<string, unknown>;
	loggedIn: boolean | null;
}