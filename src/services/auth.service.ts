import { ApiRequestConfig, apiService } from './api.service';

import { IRefreshSessionResponse } from '@/interfaces/auth/IRefreshSessionResponse';
import { ISignInResponse } from '@/interfaces/auth/ISignInResponse';
import { ISignUpResponse } from '@/interfaces/auth/ISignUpResponse';
import { ISuccessfulAuthenticationResponse } from '@/interfaces/auth/ISuccessfulAuthenticationResponse';
import { IApiService } from '@/interfaces/services/IApiService';
import { IAuthService } from '@/interfaces/services/IAuthService';

class AuthService implements IAuthService {
	api: IApiService<ApiRequestConfig>;
	constructor(api: IApiService<ApiRequestConfig>) {
		this.api = api;
	}
	async signIn(username: string, password: string, config?: ApiRequestConfig) {
		return await this.api.post<ISignInResponse>(
			'/auth/sign-in',
			{ username, password },
			config,
		);
	}
	async signUp(username: string, password: string, config?: ApiRequestConfig) {
		return await this.api.post<ISignUpResponse>(
			'/auth/sign-up',
			{ username, password },
			config,
		);
	}
	async confirmUser(username: string, code: string, config?: ApiRequestConfig) {
		return await this.api.post<ISuccessfulAuthenticationResponse>(
			'/auth/confirm-user',
			{ username, code },
			config,
		);
	}
	async confirmPassword(
		username: string,
		newPassword: string,
		code: string,
		config?: ApiRequestConfig,
	) {
		return await this.api.post<ISuccessfulAuthenticationResponse>(
			'/auth/confirm-password',
			{ username, newPassword, code },
			config,
		);
	}
	async resendConfirmationCode(username: string, config?: ApiRequestConfig) {
		return await this.api.post<ISuccessfulAuthenticationResponse>(
			'/auth/resend-confirmation-code',
			{ username },
			config,
		);
	}
	async forgotPassword(username: string, config?: ApiRequestConfig) {
		return await this.api.post<ISuccessfulAuthenticationResponse>(
			'/auth/forgot-password',
			{ username },
			config,
		);
	}
	async refreshToken(
		username: string,
		refreshToken: string,
		config?: ApiRequestConfig,
	) {
		return await this.api.post<IRefreshSessionResponse>(
			'/auth/refresh',
			{ username, refreshToken },
			config,
		);
	}
}

export const authService = new AuthService(apiService);
