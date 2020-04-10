import { SyntheticEvent, InputHTMLAttributes, FormHTMLAttributes } from "react";
import qs from "qs";

export const dragIn = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();
	
	const screen = document.getElementById("screen") as HTMLDivElement;
	screen.classList.remove("display-hidden");
};

export const dragOut = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();

	const screen = document.getElementById("screen") as HTMLDivElement;
	screen.classList.add("display-hidden");
};

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

export const upload = async (event: any) => {
	event.preventDefault();
	event.stopPropagation();
	
	var form = document.getElementById('form') as HTMLFormElement;
	var formData = new FormData(form);
	
	return sendFile(formData);
};

export const sendFile = async (formData: FormData) => {

	let responce = null;

		console.log(window.location.hostname);
		
	await fetch('http://'+window.location.hostname+":5656/api/upload", {
		method: 'post',
		body: formData,
	}).then(async (res) => {
		const data: any = JSON.parse(await res.text());

		responce = data;
	});

	return responce;
};