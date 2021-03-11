import fetch from 'node-fetch';

import { config } from '../../res/config';

export const prefetchFile = async (_file_id: string) => {
	const _file_info = await new Promise((resolve) => {
		fetch(`${config.server}/api/info/file/${_file_id}`, {
			method: 'get'
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