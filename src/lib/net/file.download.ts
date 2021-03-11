import { config } from '../../res/config';

export const downloadFile = async (file: FileLong, file_id: string) => {
	const data = new Promise((resolve) => {
		fetch(`${config.server}/api/file/${file_id}`, {
			method: 'get'
		}).then(async (res) => {
			if(res.status == 200) {
				const blob = await res.blob();

				const a = document.createElement('a');
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

export const downloadFileStream = async (file: FileLong, file_id: string) => {
	const data = new Promise((resolve) => {
		fetch(`${config.server}/api/stream/${file_id}`, {
			method: 'get'
		}).then(async (res) => {
			if(res.status == 200) {
				const blob = await res.blob();

				const a = document.createElement('a');
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