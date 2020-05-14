/// <reference types="next" />
/// <reference types="next/types/global" />
type HeadProp = {
	title?: string;
	description?: string;
	url?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogUrl?: string;
	ogImages?: OpenGraphImages[];
	ogSiteName?: string;
	twHandle?: string;
	twSite?: string;
};

type NavLink = {
	key?: number,
	href: string;
	icon: JSX.Element;
};

type FileMetadata = {
	file_id?: string;
	sha256?: string,
	md5?: string,
	filename: string;
	type?: string;
	owner?: string | null,
	protected?: boolean;
	hidden?: boolean;
	downloads?: number;
	views?: number;
	uploaded?: string;
	expires?: string;
	bytes?: number;

	curUpload?: number;
	maxUpload?: number;
	
	timeInitiated?: number;

	complete?: boolean;
};

type RootState = {
	authorization: null | AuthorizationState,
	uploadHistory: null | UploadHistoryState,
	uploadOption: null | UploadOptionState,
};

type AuthorizationState = {
	loggedIn: boolean;
	authorization: string | null;
	username: string | null;
	display_name: string | null;
	profile_id: string | null;
	flags: {
		admin: boolean,
		moderator: boolean,
		banned: boolean,
	},
};

type UploadHistoryState = {
	uploadList: FileMetadata[];
};

type UploadOptionState = {
	hidden: boolean;
	protected: boolean;
};

interface User {
	profile: string;
	username: string;
};

interface Authorization {
	user: User;
	authorization: string;
};

interface ErrorMessage {
	status: number;
	message: string;
};