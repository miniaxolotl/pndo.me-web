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

export const downloadFile = async (file: FileData, key: string | null) => {
	const data = new Promise<HTMLAnchorElement | null>(async (resolve) => {
		await fetch(`${config.server}/file/${file.file_id}`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${key}`
			},
		}).then(async (res) => {
			if(res.status == 200) {
				const blob = await res.blob();

				const a = document.createElement("a");
				a.href = URL.createObjectURL(blob);
				a.download = file.filename;

				resolve(a);
			} else {
				resolve(null);
			}
		});
	});
	
	// const request = new XMLHttpRequest();
	// request.open('post', `${config.server}/file/${file.file_id}`);
	// request.setRequestHeader('Authorization', `Bearer ${key}`);
	// request.responseType = 'blob';

	// const data = new Promise<any | null>(async (resolve) => {
	// 	request.addEventListener('load', async (res) => {

	// 		var blob = res.currentTarget!.response;
			
	// 		const a = document.createElement("a");
	// 		a.href = URL.createObjectURL(blob);
	// 		a.download = file.filename;
	// 	});
		
	// 	request.addEventListener('error', async () => {
	// 		resolve(null);
	// 	});
	// });
	// request.send();


	return data;
};