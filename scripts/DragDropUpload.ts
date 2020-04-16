import { SyntheticEvent, InputHTMLAttributes, FormHTMLAttributes } from "react";
import axios from 'axios';
import config from "../config.json";

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
export const drop = (event: SyntheticEvent<HTMLDivElement>, progressFunc) => {
	event.preventDefault();
	event.stopPropagation();

	const screen = document.getElementById("screen") as HTMLDivElement;
	screen.classList.add("display-hidden");

	var form = document.getElementById('form') as HTMLFormElement;
	var fileInput = document.getElementById('upload_file') as HTMLInputElement;

	fileInput.files = (event as unknown as DragEvent).dataTransfer.files;
	var formData = new FormData(form);

	return sendFile(formData, progressFunc);
};

/**
 * Start upload on click event
 * @param event Triggered event
 */
export const upload = async (event: any, progressFunc) => {
	event.preventDefault();
	event.stopPropagation();
	
	var form = document.getElementById('form') as HTMLFormElement;
	var formData = new FormData(form);
	
	return sendFile(formData, progressFunc);
};

/**
 * Send a file to specified server
 * @param formData File to send
 */
export const sendFile = async (formData: FormData, progressFunc) => {

	formData.set('protected', '0');
	let responce: { status: number, data: UploadResponce } = {
		status: null,
		data: null
	};
		
	const file = formData.get('upload_file');
	const delta = new Date().getMilliseconds();

	await axios.request({
		method: 'post',
		url: `${config.server}/api/file/upload`,
		data: formData,
		onUploadProgress: (e) => progressFunc(e, { file, delta }),
	}).then(async (res: any) => {
		responce.status = res.status;
		responce.data = res.data;
		responce.data.timeInitiated = delta;
		responce.data.nUploaded = 1;
		responce.data.totalUploaded = 1;

		responce.data.filename = res.data.filename;
		responce.data.id = res.data.uuid;
	}).catch((err) => {
		responce.status = 500;
	});

	return responce;
};