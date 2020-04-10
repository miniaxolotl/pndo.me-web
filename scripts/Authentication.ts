/**
 * Annotate Image.ts
 * Scripts for creating image annotations.
 * Notes:
 * - N/A
 * @author Elias Mawa <elias@emawa.io>
 * Created 20-02-21
 */

import fetch from 'node-fetch';
import qs from 'qs';

export const logIn = async (element: HTMLInputElement) => {
	const form = element.parentElement;
	
	let user =
		(document.getElementById('username') as HTMLInputElement).value;
	let password = 
		(document.getElementById('password') as HTMLInputElement).value;

	let req = {
		user,
		password
	};

	let responce = null;

	await fetch("http://localhost:5656/api/auth/login", {
		method: 'post',
		body: qs.stringify(req),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	}).then(async (res) => {
		const data: any = JSON.parse(await res.text());

		responce = data;
	});

	return responce;
};