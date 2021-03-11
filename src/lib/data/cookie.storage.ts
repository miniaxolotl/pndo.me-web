import { parseCookies, setCookie } from 'nookies';

interface StateStorage {
    getItem: (name: string, _ctx?) => string | null | Promise<string | null>;
    setItem: (name: string, value: string, _ctx?) => void | Promise<void>;
}

const _getCookie = (_name: string, _ctx = null): string | null | Promise<string | null> => {
	const cookies = parseCookies(_ctx);
	if(cookies[_name]) { return cookies[_name]; }
	return null;
};

const _setCookie = (_name: string, _value: string, _ctx = null): void | Promise<void> => {
	setCookie(_ctx, _name, _value, {
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