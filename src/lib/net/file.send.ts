import { uid } from 'uid/single';

import { config } from '../../res/config';

export const fileSend = async (_files: FileList, _key: string,
	flags: UploadOptionState, progressFunc: (args: any) => void) => {

	const formData = new FormData();
	for(let i = 0; i<_files.length; i++) {
		formData.append('file', _files.item(i));
	}
	formData.set('protected', flags.protected.toString());
	formData.set('hidden', flags.hidden.toString());

	const request = new XMLHttpRequest();
	request.open('post', `${config.canonical}/api/file`);
	request.withCredentials = true;

	const temp_id = uid();
	const initiated = new Date().getTime();
	const responce = await new Promise<any>((resolve) => {
		request.upload.addEventListener('progress', (progress) => {
			progressFunc({
				_initiated: initiated,
				_temp_id: temp_id,
				_progress: progress,
				_files
			});
		});
		request.addEventListener('load', async (_event) => {
			const data = JSON.parse((_event.target as XMLHttpRequest).responseText);
			resolve({
				...data,
				complete: true,
				progress: 100,
				temp_id: temp_id,
				initiated
			});
		});
		request.addEventListener('error', async (_event) => {
			resolve({
				_initiated: initiated,
				_temp_id: temp_id,
				_files,
				error: true
			});
		});

		request.send(formData);
	});

	return responce;
};

export const addToAlbum = async (_file: File, album_id: string, _key: string,
	flags: UploadOptionState, progressFunc: (args: any) => void) => {

	const formData = new FormData();

	formData.append('file', _file);
	
	formData.set('protected', (flags.protected == true).toString());
	formData.set('hidden', (flags.hidden == true).toString());
	formData.set('album', album_id);

	const request = new XMLHttpRequest();
	request.open('post', `${config.canonical}/api/file`);
	request.withCredentials = true;

	const temp_id = uid();
	const initiated = new Date().getTime();
	const responce = await new Promise<any>((resolve) => {
		request.upload.addEventListener('progress', (progress) => {
			progressFunc({
				_initiated: initiated,
				_temp_id: temp_id,
				_progress: progress,
				_file
			});
		});
		request.addEventListener('load', async (_event) => {
			const data = JSON.parse((_event.target as XMLHttpRequest).responseText);
			resolve({
				...data,
				complete: true,
				progress: 100,
				temp_id: temp_id,
				initiated
			});
		});
		request.addEventListener('error', async (_event) => {
			resolve({
				_initiated: initiated,
				_temp_id: temp_id,
				_file,
				error: true
			});
		});

		request.send(formData);
	});

	return responce;
};