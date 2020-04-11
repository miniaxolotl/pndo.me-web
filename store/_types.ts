/**
 * _types.ts
 * - Collection of store types.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-04-10
 */

export enum AuthorizationAction {
	LOAD,
	LOGIN,
	LOGOUT,
	REGISTER,
}

export enum HistoryAction {
	LOAD,
	ADD,
	PROGRESS,
	DELETE,
	CLEANUP,
}

export enum ActionGroup {
	AUTHORIZATION,
	HISTORY,
	DISPLAY,
	ROOT,
}

export type RootAction = {
	group: ActionGroup,
	action?: AuthorizationAction | HistoryAction,
};