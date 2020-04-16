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
import config from '../config.json';

export const attemptLogin = async (username: string, password: string) => {

	let requstBody = {
		username,
		password
	};

	let data: ErrorMessage;

	await fetch(`${config.api}/auth/login`, {
		method: 'post',
		body: qs.stringify(requstBody),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	}).then(async (res) => {
		try {
			const responceData = JSON.parse(await res.text());
			
			if(res.status == 200) {
				data = {
					message: responceData,
					status: res.status,
				};
			} else {
				throw(null);
			}
		} catch(err) {
			console.log(err);
			
			data = {
				status: 500,
				message: "a bruh moment occured...",
			};
		}
	});

	return data;
};

export const attemptRegister = async (username: string, password: string) => {

	let requstBody = {
		username,
		password
	};

	let data: ErrorMessage;

	await fetch(`${config.api}/auth/register`, {
		method: 'post',
		body: qs.stringify(requstBody),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	}).then(async (res) => {
		try {
			const responceData = JSON.parse(await res.text());
			
			if(res.status == 200) {
				data = {
					message: responceData,
					status: res.status,
				};
			} else {
				throw(null);
			}
		} catch(err) {
			data = {
				status: 500,
				message: "a bruh moment occured...",
			};
		}
	});
	
	return data;
};