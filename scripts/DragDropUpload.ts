import { SyntheticEvent, InputHTMLAttributes, FormHTMLAttributes } from "react";
import qs from "qs";

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
export const drop = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();

	const screen = document.getElementById("screen") as HTMLDivElement;
	screen.classList.add("display-hidden");

	var form = document.getElementById('form') as HTMLFormElement;
	var fileInput = document.getElementById('file-input') as HTMLInputElement;

	fileInput.files = (event as unknown as DragEvent).dataTransfer.files;
	var formData = new FormData(form);

	return sendFile(formData);
};

/**
 * Start upload on click event
 * @param event Triggered event
 */
export const upload = async (event: any) => {
	event.preventDefault();
	event.stopPropagation();
	
	var form = document.getElementById('form') as HTMLFormElement;
	var formData = new FormData(form);
	
	return sendFile(formData);
};

/**
 * Send a file to specified server
 * @param formData File to send
 */
export const sendFile = async (formData: FormData) => {

	let responce = {
		status: null,
		data: null
	};
		
	await fetch('http://'+window.location.hostname+":5656/api/upload", {
		method: 'post',
		body: formData,
	}).then(async (res) => {
		const data: any = JSON.parse(await res.text());
		responce.status = res.status;
		responce.data = data;
	}).catch((e) => {
		// oof
		responce.status = 500;
	});

	return responce;
};