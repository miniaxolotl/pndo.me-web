export enum AuthorizationAction {
	LOAD,
	LOGIN,
	LOGOUT,
	REGISTER,
};

export enum UploadHistoryAction {
	LOAD,
	ADD,
	PROGRESS,
	DELETE,
	CLEANUP,
};

export enum ActionGroup {
	AUTHORIZATION,
	UPLOAD_HISTORY,
	ROOT,
};

export type RootAction = {
	group: ActionGroup,
	action?: AuthorizationAction | UploadHistoryAction,
};