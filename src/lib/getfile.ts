import config from '../res/config.json';

export const authorizedFile = async (file_id: string, key: string | null) => {
	const data = await new Promise<any | null>(async (resolve) => {
		await fetch(`${config.server}/api/file/${file_id}`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${key}`
			},
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				resolve(JSON.parse(data));
			} else {
				resolve(null);
			}
		});
	});

	return data;
};

export const prefetchFile = async (file_id: string, key: string | null) => {
	const data = new Promise<FileData | null>(async (resolve) => {
		await fetch(`${config.server_alt}/info/${file_id}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${key}`
			},
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				resolve(JSON.parse(data));
			} else {
				resolve(null);
			}
		});
	});
	
	return data;
};

export const getFile = async (file_id: string, key: string | null) => {
	const data = new Promise<FileData | null>(async (resolve) => {
		await fetch(`${config.server}/info/${file_id}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${key}`
			},
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				resolve(JSON.parse(data));
			} else {
				resolve(null);
			}
		});
	});
	
	return data;
};