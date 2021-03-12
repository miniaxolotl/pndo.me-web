import { config } from '../../res/config';

export const downloadAlbum = async (album: Album) => {
	const data = new Promise((resolve) => {
		fetch(`${config.canonical}/api/album/${album.album_id}`, {
			method: 'get'
		}).then(async (res) => {
			if(res.status == 200) {
				const blob = await res.blob();

				const a = document.createElement('a');
				a.href = URL.createObjectURL(blob);
				a.download = `${album.title}.zip`;

				resolve(a);
			} else {
				resolve(null);
			}
		});
	});

	return data;
};


export const downloadFile = async (file: FileLong, file_id: string) => {
	const data = new Promise((resolve) => {
		fetch(`${config.canonical}/api/file/${file_id}`, {
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
		fetch(`${config.canonical}/api/stream/${file_id}`, {
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