import config from '../res/config.json';

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

export const previewFile = async (file: FileData, key: string | null,
	dl: boolean) => {

	const url = `${config.server}/stream/${file.file_id}`;
	const data = new Promise<any>(async (resolve) => {
		await fetch(url, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${key}`
			},
		}).then(async (res) => {
			if(res.status == 200) {
				if(dl) {
					const blob = await res.blob();
					const uri = URL.createObjectURL(blob);

					resolve({ url, uri });
				}

				resolve({ url });
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

	return data;
};