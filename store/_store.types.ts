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

export enum UploadOptionAction {
	TOGGLE_HIDDEN,
	TOGGLE_PROTECTED,
};

export enum ActionGroup {
	AUTHORIZATION,
	UPLOAD_HISTORY,
	UPLOAD_OPTION,
	ROOT,
};

export type RootAction = {
	group: ActionGroup,
	action?: AuthorizationAction | UploadHistoryAction | UploadOptionAction,
};