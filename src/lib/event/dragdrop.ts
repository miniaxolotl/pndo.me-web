import { SyntheticEvent } from 'react';

import config from '../../res/config';

/**
 * Enable screeen on drag in
 * @param event Triggered aevent
 */
export const dragIn = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();
	
	const screen = document.getElementById('screen') as HTMLDivElement;
	screen.classList.remove('display-hidden');
};

/**
 * Disable screeen on drag out
 * @param event Triggered aevent
 */
export const dragOut = (event: SyntheticEvent<HTMLDivElement>) => {
	event.preventDefault();
	event.stopPropagation();

	const screen = document.getElementById('screen') as HTMLDivElement;
	screen.classList.add('display-hidden');
};

/**
 * Start upload on drop event
 * @param event Triggered aevent
 */
export const drop = (event: SyntheticEvent<HTMLDivElement>, progressFunc, authorization, uploadOption) => {

	event.preventDefault();
	event.stopPropagation();

	const screen = document.getElementById('screen') as HTMLDivElement;
	screen.classList.add('display-hidden');

	const form = document.getElementById('form') as HTMLFormElement;
	const fileInput = document.getElementById('upload_file') as HTMLInputElement;

	fileInput.files = (event as unknown as DragEvent).dataTransfer.files;
	const formData = new FormData(form);

	return sendFile(formData, progressFunc, authorization, uploadOption);
};
