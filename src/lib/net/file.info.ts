import fetch from 'node-fetch';

import { config } from '../../res/config';

export const prefetchFile = async (_file_id: string, _key) => {
	const _file_info = await new Promise((resolve) => {
		fetch(`${config.canonical}/api/info/file/${_file_id}`, {
			method: 'get',
			headers: {
				cookie: `session_id=${_key}`
			}
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				resolve(JSON.parse(data));
			} else {
				resolve(null);
			}
		});
	});
	
	return _file_info;
};

export const prefetchAlbum = async (_album_id: string, _key) => {
	const _album_info = await new Promise((resolve) => {
		fetch(`${config.canonical}/api/info/album/${_album_id}`, {
			method: 'get',
			headers: {
				cookie: `session_id=${_key}`
			}
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				resolve(JSON.parse(data));
			} else {
				resolve(null);
			}
		});
	});
	
	return _album_info;
};

export const getUserFiles = async (user_id: string, _options, _key) => {
	const _album_info = await new Promise((resolve) => {
		fetch(`${config.canonical}/api/user/${user_id}/file`, {
			method: 'post',
			body: _options,
			headers: {
				cookie: `session_id=${_key}`
			}
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				resolve(JSON.parse(data));
			} else {
				resolve(null);
			}
		});
	});
	
	return _album_info;
};