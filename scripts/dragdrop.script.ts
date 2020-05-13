import { SyntheticEvent, InputHTMLAttributes, FormHTMLAttributes } from "react";
import axios from 'axios';
import config from "../res/config.json";

/**
 * Enable screeen on drag in
 * @param event Triggered aevent
 */
export const dragIn = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();
	
	const screen = document.getElementById("screen") as HTMLDivElement;
	screen.classList.remove("display-hidden");
};

/**
 * Disable screeen on drag out
 * @param event Triggered aevent
 */
export const dragOut = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();

	const screen = document.getElementById("screen") as HTMLDivElement;
	screen.classList.add("display-hidden");
};

/**
 * Start upload on drop event
 * @param event Triggered aevent
 */
export const drop
	= (event: SyntheticEvent<HTMLDivElement>,
	progressFunc, authorization, uploadOption) => {

	event.preventDefault();
	event.stopPropagation();

	const screen = document.getElementById("screen") as HTMLDivElement;
	screen.classList.add("display-hidden");

	var form = document.getElementById('form') as HTMLFormElement;
	var fileInput = document.getElementById('upload_file') as HTMLInputElement;

	fileInput.files = (event as unknown as DragEvent).dataTransfer.files;
	var formData = new FormData(form);

	return sendFile(formData, progressFunc, authorization, uploadOption);
};

/**
 * Start upload on click event
 * @param event Triggered event
 */
export const upload
	= async (event: any, progressFunc, authorization, uploadOption) => {
	event.preventDefault();
	event.stopPropagation();
	
	var form = document.getElementById('form') as HTMLFormElement;
	var formData = new FormData(form);
	const file = formData.get('upload_file');

	if(event && (file as File).size > 0) {
		return sendFile(formData, progressFunc, authorization, uploadOption);
	} 
	
	return null;
};

/**
 * Send a file to specified server
 * @param formData File to send
 */
export const sendFile
	= async (formData: FormData, progressFunc, authorization, uploadOption) => {

	formData.set('protected', '0');
	let data: { status: number, message: FileMetadata & string } = {
		status: null,
		message: null
	};
		
	const file = formData.get('upload_file') as File;
	formData.set('protected', uploadOption.protected);
	formData.set('hidden', uploadOption.hidden);
	const timeInitiated = new Date().getTime();

	await axios.request({
		method: 'post',
		url: `${config.api}/api/file/upload`,
		data: formData,
		headers: {
			Authorization: `Bearer ${authorization}`
		},
		onUploadProgress: (e) =>
			progressFunc(e, { filename: file.name, timeInitiated} ),
	}).then(async (res: any) => {
		data.status = res.status;

		data.message = res.data;
		data.message.timeInitiated = timeInitiated;
		data.message.curUpload = 1;
		data.message.maxUpload = 1;

		data.message.filename = res.data.filename;
		data.message.file_id = res.data.file_id;
		
		if(!data.message.bytes) { throw(null); }
	}).catch((err) => {
		console.log(err);
		(data as any) = {
			status: 500,
			message: "a bruh moment occured...",
		};
	});

	return data;
};