import fetch from 'node-fetch';
import axios from 'axios';
import config from '../res/config.json';

export const getFile = async (file_id: string, authorization) => {
	let data: any = {};
	
	await fetch(config.api_local+"/f/info/"+file_id, {
		method: "post",
		headers: {
			authorization: `Bearer ${authorization?.authorization}`
		},
	}).then(async (res) => {
		data = await res.json();
		data.status = res.status;
	}).catch((e) => {
		// do nothing
	});

	return data;
}

export const getBlob = async (file_id: string, authorization) => {
	let data: any = {};
	
	await fetch(config.api_local+"/f/info/"+file_id, {
		method: "post",
		headers: {
			authorization: `Bearer ${authorization.authorization}`
		}
	}).then(async (res) => {
		data = await res.blob();
		data.blob = window.URL.createObjectURL(data);
	}).catch((e) => {
		console.log(e);
	});

	return data;
}

export const downloadFile = async (event, filedata, authorization) => {
	event.preventDefault();
	event.stopPropagation();

	const target = event.target;

	let data: any = {};
	
	await fetch(config.api_file+"/download/"+filedata.file_id, {
		method: "post",
		headers: {
			authorization: `Bearer ${authorization.authorization}`
		}
	}).then(async (res) => {
		const data = await res.blob();
		
		var a = document.createElement("a");

		const url = window.URL.createObjectURL(data);

		a.href = url;
		a.download = filedata.filename;
		a.click();
	});

	// await axios.request({
	// 	method: 'get',
	// 	url: config.api_file+"/download/"+filedata.file_id,
	// 	headers: {
	// 		Authorization: `Bearer ${authorization.authorization}`
	// 	},
	// }).then(async (res) => {
	// 	data = res.data;

	// 	console.log(res);
	// 	// console.log(data);
	// 	var a = document.createElement("a");

	// 	const url = window.URL.createObjectURL(data);

    //     a.href = url;
    //     a.download = filedata.filename;
	// 	document.body.appendChild(a);
    //     a.click();
	// }).catch((e) => {
	// 	data = null;
	// });

	return data;
}