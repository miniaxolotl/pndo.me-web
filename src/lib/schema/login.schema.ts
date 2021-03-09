import joi from 'joi';

export const LoginSchema = joi.object({
	email: joi.string()
		.optional()
		.email({ tlds: { allow: false } }),

	password: joi.string()
		.required()
		.min(6)
		.max(32)
});