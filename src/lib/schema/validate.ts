import RegisterSchema from './register.schema';

export const validateEmail = (data) => {
	const { error } = RegisterSchema.validate({ email: data });
	if(error) {
		return error.details[0].message;
	} else {
		return null;
	}
};

export const validateUsername = (data) => {
	const { error } = RegisterSchema.validate({ username: data });
	if(error) {
		return error.details[0].message;
	} else {
		return null;
	}
};

export const validatePassword = (data) => {
	const { error } = RegisterSchema.validate({ password: data });
	if(error) {
		return error.details[0].message;
	} else {
		return null;
	}
};