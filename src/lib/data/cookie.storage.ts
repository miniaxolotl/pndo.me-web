import { parseCookies, setCookie } from 'nookies';

interface StateStorage {
    getItem: (name: string) => string | null | Promise<string | null>;
    setItem: (name: string, value: string) => void | Promise<void>;
}

const _getCookie = (_name: string): string | null | Promise<string | null> => {
	const cookies = parseCookies();
	if(cookies[_name]) { return cookies[_name]; }
	return null;
};

const _setCookie = (_name: string, _value: string): void | Promise<void> => {
	setCookie(null, _name, _value, {
		maxAge: 30 * 24 * 60 * 60,
		sameSite: 'strict',
		secure: 'true',
		path: '/'
	});
};

export const cookieStorage: StateStorage = {
	getItem: _getCookie,
	setItem: _setCookie
};