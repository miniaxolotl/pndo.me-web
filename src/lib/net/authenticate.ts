import fetch from 'node-fetch';
import qs from 'qs';

import { config } from '../../res/config';

export const postRegister = async (form: HTMLFormElement) => {
	const request = {
		email: form.email.value,
		username: form.username.value,
		password: form.password.value
	};

	const responce = new Promise<any>((resolve) => {
		fetch(`${config.canonical}/api/auth/register`, {
			method: 'post',
			body: qs.stringify(request),
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				const token = JSON.parse(data);
				resolve(token);
			} else {
				resolve(null);
			}
		});
	});

	return responce;
};


export const postLogin = async (form: HTMLFormElement) => {
	const request = {
		email: form.email.value,
		password: form.password.value
	};

	const responce = new Promise<any>((resolve) => {
		fetch(`${config.canonical}/api/auth/login`, {
			method: 'post',
			body: JSON.stringify(request),
			headers: {
				'content-type': 'application/json'
			}
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				const token = JSON.parse(data);
				resolve(token);
			} else {
				resolve(null);
			}
		});
	});

	return responce;
};