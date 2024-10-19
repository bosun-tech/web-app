import { IRefreshSessionResponse } from '../auth/IRefreshSessionResponse';
import { ISignInResponse } from '../auth/ISignInResponse';
import { ISignUpResponse } from '../auth/ISignUpResponse';
import { ISuccessfulAuthenticationResponse } from '../auth/ISuccessfulAuthenticationResponse';

import { ApiRequestConfig } from '@/services/api.service';

export interface IAuthService {
	signUp: (
		username: string,
		password: string,
		config?: ApiRequestConfig,
	) => Promise<ISignUpResponse>;
	signIn: (
		username: string,
		password: string,
		config?: ApiRequestConfig,
	) => Promise<ISignInResponse>;
	confirmUser: (
		username: string,
		code: string,
		config?: ApiRequestConfig,
	) => Promise<ISuccessfulAuthenticationResponse>;
	confirmPassword: (
		username: string,
		newPassword: string,
		code: string,
		config?: ApiRequestConfig,
	) => Promise<ISuccessfulAuthenticationResponse>;
	resendConfirmationCode: (
		username: string,
		config?: ApiRequestConfig,
	) => Promise<ISuccessfulAuthenticationResponse>;
	forgotPassword: (
		username: string,
		config?: ApiRequestConfig,
	) => Promise<ISuccessfulAuthenticationResponse>;
	refreshToken: (
		username: string,
		refreshToken: string,
		config?: ApiRequestConfig,
	) => Promise<IRefreshSessionResponse>;
}
