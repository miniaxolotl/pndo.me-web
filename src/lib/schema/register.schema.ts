import joi from 'joi';

const RegisterSchema = joi.object({
	email: joi.string()
		.optional()
		.email({ tlds: { allow: false } }),

	username: joi.string()
		.optional()
		.alphanum()
		.lowercase()
		.min(3)
		.max(32),

	password: joi.string()
		.optional()
		.min(6)
		.max(32)
});

export default RegisterSchema;