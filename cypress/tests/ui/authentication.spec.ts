import {
	CONFIRMATION_SENT_MESSAGE,
	SIGN_IN_SUCCESS_MESSAGE,
	SIGN_OUT_SUCCESS_MESSAGE,
	SIGN_UP_SUCCESS_MESSAGE,
} from '@context/auth-messages';

import { PASSWORD_REQUIRED } from '@components/auth/schemas/schema-errors';

describe('/auth', () => {
	const username = 'example@test.com';
	const password = 'Supersecret2024~';
	const code = '123456';

	describe('/auth/sign-in', () => {
		beforeEach(() => {
			cy.visit('/auth/sign-in');
		});
		it('Should be able to sign-in', () => {
			cy.signIn();
			cy.getBySel('toast-container').contains(SIGN_IN_SUCCESS_MESSAGE);
		});

		it('Should be able to visit sign-up', () => {
			cy.clickLinkAndVerifyUrl('link-sign-up', '/auth/sign-up');
		});
		it('Should be able to visit forgot password', () => {
			cy.clickLinkAndVerifyUrl('link-forgot-password', '/auth/forgot-password');
		});
		it('Should be able to visit confirm user', () => {
			cy.clickLinkAndVerifyUrl('link-confirm-user', '/auth/confirm-user');
		});
		it('Username field validation', () => {
			cy.validateUsername('sign-in-username', 'form-input-error-username');
		});
		it('Password field validation', () => {
			cy.getBySel('sign-in-password').focus().blur();
			cy.getBySel('form-input-error-password').contains(PASSWORD_REQUIRED);
		});
		it('If the user does not exist, it should show an error', () => {
			const errorResponse = {
				message: `${username} was not found`,
				error: 'Not Found',
				statusCode: 404,
			};
			cy.getInputAndType('sign-in-username', username);
			cy.getInputAndType('sign-in-password', password);
			cy.interceptApi(
				'/auth/sign-in',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-sign-in');
			cy.getBySel('sign-in-submit').click();
			cy.wait('@error-sign-in');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
		it('If the password is incorrect, it should show an error', () => {
			const errorResponse = {
				message: 'Invalid username or password',
				error: 'Unauthorized',
				statusCode: 401,
			};
			cy.getInputAndType('sign-in-username', username);
			cy.getInputAndType('sign-in-password', password);
			cy.interceptApi(
				'/auth/sign-in',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-sign-in');
			cy.getBySel('sign-in-submit').click();
			cy.wait('@error-sign-in');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
	});

	describe('/auth/sign-up', () => {
		beforeEach(() => {
			cy.visit('/auth/sign-up');
		});
		it('Should be able to sign-up', () => {
			cy.getInputAndType('sign-up-username', username);
			cy.getInputAndType('sign-up-password', password);
			cy.interceptApi(
				'/auth/sign-up',
				{ method: 'POST' },
				{ fixture: 'auth/sign-up.json' },
			).as('sign-up');
			cy.getBySel('sign-up-submit').click();
			cy.wait('@sign-up');
			cy.getBySel('toast-container').contains(SIGN_UP_SUCCESS_MESSAGE);
			cy.getBySel('toast-container').contains(CONFIRMATION_SENT_MESSAGE);
		});
		it('Should be able to visit sign-in', () => {
			cy.clickLinkAndVerifyUrl('link-sign-in', '/auth/sign-in');
		});
		it('Username field validation', () => {
			cy.validateUsername('sign-up-username', 'form-input-error-username');
		});
		it('Password field validation', () => {
			cy.validatePassword('sign-up-password', 'form-input-error-password');
		});
		it('If the user already exists, it should show an error', () => {
			const errorResponse = {
				message: 'User already signed up',
				error: 'Bad Request',
				statusCode: 400,
			};
			cy.getInputAndType('sign-up-username', username);
			cy.getInputAndType('sign-up-password', password);
			cy.interceptApi(
				'/auth/sign-up',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-sign-up');
			cy.getBySel('sign-up-submit').click();
			cy.wait('@error-sign-up');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
	});

	describe('/auth/forgot-password', () => {
		beforeEach(() => {
			cy.visit('/auth/forgot-password');
		});
		it('Should be able to use the forgot password form', () => {
			const successResponse = {
				success: true,
				message: 'Password reset instructions have been sent',
			};
			cy.visit('/auth/forgot-password');
			cy.getInputAndType('forgot-password-username', username);
			cy.interceptApi(
				'/auth/forgot-password',
				{ method: 'POST' },
				{ body: successResponse },
			).as('forgot-password');
			cy.getBySel('forgot-password-submit').click();
			cy.wait('@forgot-password');
			cy.getBySel('toast-container').contains(successResponse.message);
		});
		it('Should be able to visit confirm password', () => {
			cy.clickLinkAndVerifyUrl(
				'link-confirm-password',
				'/auth/confirm-password',
			);
		});
		it('Username field validation', () => {
			cy.validateUsername(
				'forgot-password-username',
				'form-input-error-username',
			);
		});
		it('If the user does not exist, it should show an error', () => {
			const errorResponse = {
				message: `${username} was not found`,
				error: 'Not Found',
				statusCode: 404,
			};
			cy.getInputAndType('forgot-password-username', username);
			cy.interceptApi(
				'/auth/forgot-password',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-forgot-password');
			cy.getBySel('forgot-password-submit').click();
			cy.wait('@error-forgot-password');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
	});

	describe('/auth/confirm-user', () => {
		beforeEach(() => {
			cy.visit('/auth/confirm-user');
		});
		const successResponse = {
			success: true,
			message: 'User successfully confirmed',
		};
		it('Should be able to use the confirm user form', () => {
			cy.getInputAndType('confirm-user-username', username);
			cy.getInputAndType('confirm-user-code', code);
			cy.interceptApi(
				'/auth/confirm-user',
				{ method: 'POST' },
				{ body: successResponse },
			).as('confirm-user');
			cy.getBySel('confirm-user-submit').click();
			cy.wait('@confirm-user');
			cy.getBySel('toast-container').contains(successResponse.message);
		});
		it('Should auto confirm the user if a query link is used', () => {
			cy.interceptApi(
				'/auth/confirm-user',
				{ method: 'POST' },
				{ body: successResponse },
			).as('confirm-user');
			cy.visit(`/auth/confirm-user?username=${username}&code=${code}`);
			cy.wait('@confirm-user');
			cy.getBySel('toast-container').contains(successResponse.message);
		});
		it('Should be able to visit confirm password', () => {
			cy.clickLinkAndVerifyUrl(
				'link-resend-confirmation-code',
				'/auth/resend-confirmation-code',
			);
		});
		it('Should be able to visit confirm password', () => {
			cy.clickLinkAndVerifyUrl('link-sign-in', '/auth/sign-in');
		});
		it('Username field validation', () => {
			cy.validateUsername('confirm-user-username', 'form-input-error-username');
		});
		it('Code field validation', () => {
			cy.validateCode('confirm-user-code', 'form-input-error-code');
		});
		it('If the user does not exist, it should show an error', () => {
			const errorResponse = {
				message: `${username} was not found`,
				error: 'Not Found',
				statusCode: 404,
			};
			cy.interceptApi(
				'/auth/confirm-user',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-confirm-user');
			cy.getInputAndType('confirm-user-username', username);
			cy.getInputAndType('confirm-user-code', code);
			cy.getBySel('confirm-user-submit').click();
			cy.wait('@error-confirm-user');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
		it('If the code is invalid, it should show an error', () => {
			const errorResponse = {
				message: 'Incorrect confirmation code',
				error: 'Unauthorized',
				statusCode: 401,
			};
			cy.interceptApi(
				'/auth/confirm-user',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-confirm-user');
			cy.getInputAndType('confirm-user-username', username);
			cy.getInputAndType('confirm-user-code', code);
			cy.getBySel('confirm-user-submit').click();
			cy.wait('@error-confirm-user');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
	});

	describe('/auth/confirm-password', () => {
		beforeEach(() => {
			cy.visit('/auth/confirm-password');
		});
		it('Should be able to use the confirm password form', () => {
			const successResponse = {
				success: true,
				message: 'Your password has been correctly updated',
			};
			cy.getInputAndType('confirm-password-username', username);
			cy.getInputAndType('confirm-password-password', password);
			cy.getInputAndType('confirm-password-code', code);
			cy.interceptApi(
				'/auth/confirm-password',
				{ method: 'POST' },
				{ body: successResponse },
			).as('confirm-password');

			cy.getBySel('confirm-password-submit').click();
			cy.wait('@confirm-password');
			cy.getBySel('toast-container').contains(successResponse.message);
		});
		it('Should be able to visit forgot password', () => {
			cy.clickLinkAndVerifyUrl('link-forgot-password', '/auth/forgot-password');
		});
		it('Should be able to visit sign in', () => {
			cy.clickLinkAndVerifyUrl('link-sign-in', '/auth/sign-in');
		});
		it('Username field validation', () => {
			cy.validateUsername(
				'confirm-password-username',
				'form-input-error-username',
			);
		});
		it('Password field validation', () => {
			cy.validatePassword(
				'confirm-password-password',
				'form-input-error-password',
			);
		});
		it('Code field validation', () => {
			cy.validateCode('confirm-password-code', 'form-input-error-code');
		});
		it('If the user does not exist, it should show an error', () => {
			const errorResponse = {
				message: `${username} was not found`,
				error: 'Not Found',
				statusCode: 404,
			};
			cy.interceptApi(
				'/auth/confirm-password',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-confirm-password');
			cy.getInputAndType('confirm-password-username', username);
			cy.getInputAndType('confirm-password-password', password);
			cy.getInputAndType('confirm-password-code', code);
			cy.getBySel('confirm-password-submit').click();
			cy.wait('@error-confirm-password');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
		it('If the code is invalid, it should show an error', () => {
			const errorResponse = {
				message: 'Incorrect confirmation code',
				error: 'Unauthorized',
				statusCode: 401,
			};
			cy.interceptApi(
				'/auth/confirm-password',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-confirm-password');
			cy.getInputAndType('confirm-password-username', username);
			cy.getInputAndType('confirm-password-password', password);
			cy.getInputAndType('confirm-password-code', code);
			cy.getBySel('confirm-password-submit').click();
			cy.wait('@error-confirm-password');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
	});

	describe('/auth/resend-confirmation-code', () => {
		beforeEach(() => {
			cy.visit('/auth/resend-confirmation-code');
		});
		it('Should be able to use the resend confirmation code form', () => {
			const successResponse = {
				success: true,
				message: 'A new code has been sent to your e-mail address',
			};
			cy.getInputAndType('resend-confirmation-code-username', username);
			cy.interceptApi(
				'/auth/resend-confirmation-code',
				{ method: 'POST' },
				{ body: successResponse },
			).as('resend-confirmation-code');
			cy.getBySel('resend-confirmation-code-submit').click();
			cy.wait('@resend-confirmation-code');
			cy.getBySel('toast-container').contains(successResponse.message);
		});
		it('Should be able to visit sign in', () => {
			cy.clickLinkAndVerifyUrl('link-confirm-user', '/auth/confirm-user');
		});
		it('Username field validation', () => {
			cy.validateUsername(
				'resend-confirmation-code-username',
				'form-input-error-username',
			);
		});
		it('If the user does not exist, it should show an error', () => {
			const errorResponse = {
				message: `${username} was not found`,
				error: 'Not Found',
				statusCode: 404,
			};
			cy.getInputAndType('resend-confirmation-code-username', username);
			cy.interceptApi(
				'/auth/resend-confirmation-code',
				{ method: 'POST' },
				{ body: errorResponse, statusCode: errorResponse.statusCode },
			).as('error-resend-confirmation-code');
			cy.getBySel('resend-confirmation-code-submit').click();
			cy.wait('@error-resend-confirmation-code');
			cy.getBySel('toast-container').contains(errorResponse.message);
		});
	});

	describe('RequireAuth', () => {
		it('If the user is logged in, it should let it access a protected resource', () => {
			cy.signIn();
			cy.visit('/about');
			cy.url().should('include', '/about');
		});
		it('If the access token expires, it should refresh the access token', () => {
			cy.signIn();
			cy.clearCookie('accessToken');
			cy.interceptApi(
				'/auth/refresh',
				{ method: 'POST' },
				{ fixture: '/auth/refresh.json' },
			).as('refresh');
			cy.visit('/about');
			cy.wait('@refresh');
			cy.url().should('include', '/about');
		});
		it('If the user is not logged in, it should not let it access a protected resource', () => {
			cy.visit('/about');
			cy.url().should('not.include', '/about');
		});
	});
});
