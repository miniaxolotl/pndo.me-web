import config from '../res/config.json';

export const sendFile = (file: File, key: string,
	flags: UploadOptionState, progressFunc: (args: any) => void) => {

	const formData = new FormData();
	formData.append("file", file);
	formData.set("protected", flags.protected.toString());
	// formData.set("hidden", flags.hidden.toString());

	const request = new XMLHttpRequest();
	request.open('post', `${config.server}/api/file`);
	request.setRequestHeader('Authorization', `Bearer ${key}`);

	const initiated = new Date().getTime();
	const reqData = new Promise<any | null>(async (resolve) => {
		request.upload.addEventListener('progress', (progress) => {
			progressFunc({progress, file, initiated});
		});
		
		request.addEventListener('load', async () => {
			resolve({
				...JSON.parse(request.responseText),
				inProgress: false,
				progress: 100,
				initiated: initiated,
			});
		});
		
		request.addEventListener('error', async () => {
			resolve(null);
		});
	});

	request.send(formData);

	// const reqData = new Promise<any | null>(async (resolve) => {
	// 	await fetch(`${config.server}/api/file`, {
	// 		method: 'post',
	// 		body: (formData as any),
	// 		headers: {
	// 			Authorization: `Bearer ${key}`
	// 		},
	// 	}).then(async (res) => {
	// 		const data = await res.text();
	// 		if(res.status == 200) {
	// 			resolve(JSON.parse(data));
	// 		} else {
	// 			resolve(null);
	// 		}
	// 	});
	// });
	
	return reqData;
};