export enum AuthorizationAction {
	LOAD,
	AUTHORIZE,
	LOGOUT,
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