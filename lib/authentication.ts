import fetch from 'node-fetch';
import qs from 'qs';
import config from '../res/config.json';

export const registerRequest = async (form: HTMLFormElement) => {
	const request = {
		email: form.email.value,
		username: form.username.value,
		password: form.password.value
	};

	const reqData
		= new Promise<any>(async (resolve) => {
			
		await fetch(`${config.server}/auth/register`, {
			method: 'post',
			body: qs.stringify(request),
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				resolve({ status: null, data: JSON.parse(data)});
			} else {
				resolve({ status: res.status, data});
			}
		});
	});

	return reqData;
};

export const logInRequest = async (form: HTMLFormElement) => {
	const request = {
		email: form.email.value,
		password: form.password.value
	};
	
	const reqData
		= new Promise<any>(async (resolve) => {

		await fetch(`${config.server}/auth/login`, {
			method: 'post',
			body: qs.stringify(request),
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then(async (res) => {
			const data = await res.text();
			if(res.status == 200) {
				resolve({ status: null, data: JSON.parse(data)});
			} else {
				resolve({ status: res.status, data});
			}
		});
	});

	return reqData;
};
