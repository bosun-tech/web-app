import * as yup from 'yup';

import {
	CODE_MIN_LENGTH,
	CODE_REQUIRED,
	CODE_TYPE,
	USERNAME_INVALID,
	USERNAME_REQUIRED,
} from './schema-errors';

export const confirmUserSchema = yup.object({
	username: yup.string().email(USERNAME_INVALID).required(USERNAME_REQUIRED),
	code: yup
		.number()
		.typeError(CODE_TYPE)
		.test(
			'minLength',
			CODE_MIN_LENGTH,
			(val) => (val && val.toString().length >= 6) || false,
		)
		.required(CODE_REQUIRED),
});
