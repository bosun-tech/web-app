describe('Platform Page', () => {
	beforeEach(() => {
		cy.window().then((win) => {
			win.localStorage.setItem('publicKey', 'mock-public-key');
		});
		cy.visit('/platform');
	});
	describe('Platform Title', () => {
		it('Should display the Platform title', () => {
			cy.get('h1').should('contain.text', 'Platform');
		});
	});

	describe('Selectors', () => {
		it('Should display all three selectors with correct labels', () => {
			cy.get('#country-selector').should('exist');
			cy.get('label').should('contain.text', 'Select a country');

			cy.get('#anchor-service-selector').should('exist');
			cy.get('label').should('contain.text', 'Select an anchor');

			cy.get('#operation-selector').should('exist');
			cy.get('label').should('contain.text', 'Select an operation');
		});

		it('Should open country selector and select a country', () => {
			cy.get('#country-selector').click();
			cy.get('input[type="search"]').type('Spain');
			cy.contains('Spain').click();
			cy.get('#country-selector').should('contain.text', 'Spain');
		});

		it('Should open anchor selector and select an anchor', () => {
			cy.get('#anchor-service-selector').click();
			cy.get('input[type="search"]').type('Anclap');
			cy.contains('Anclap').click();
			cy.get('#anchor-service-selector').should('contain.text', 'Anclap');
		});

		it('Should open operation selector and select an operation', () => {
			cy.get('#operation-selector').click();
			cy.get('input[type="search"]').type('Deposit');
			cy.contains('Deposit').click();
			cy.get('#operation-selector').should('contain.text', 'Deposit');
		});

		describe('Filter Options', () => {
			it('Should filter country options when searching', () => {
				cy.get('#country-selector').click();
				cy.get('input[type="search"]').type('Spa');
				cy.get('li').should('have.length.greaterThan', 0);
				cy.get('li').should('contain.text', 'Spain');
			});

			it('Should filter anchor options when searching', () => {
				cy.get('#anchor-service-selector').click();
				cy.get('input[type="search"]').type('Myk');
				cy.get('li').should('have.length.greaterThan', 0);
				cy.get('li').should('contain.text', 'Mykobo');
			});

			it('Should filter operation options when searching', () => {
				cy.get('#operation-selector').click();
				cy.get('input[type="search"]').type('Tr');
				cy.get('li').should('have.length.greaterThan', 0);
				cy.get('li').should('contain.text', 'Transactions');
			});
		});
	});

	describe('Authorization Modal', () => {
		beforeEach(() => {
			cy.get('#continue-button').click();
		});

		it('Should display the authorization modal with correct title and text', () => {
			cy.get('h1').should('contain.text', 'We need your authorization');
			cy.get('p').should(
				'contain.text',
				'To connect with the Anchor, we need your authorization. A pop-up will appear for you to approve and continue.',
			);
		});

		it('Should display the authorization image', () => {
			cy.get('img[alt="Authorization illustration"]').should('be.visible');
		});

		it('Should have a working Got it button', () => {
			cy.window().then((win) => {
				win.localStorage.setItem('publicKey', 'mock-public-key');
			});
			cy.get('#got-it-button')
				.should('be.visible')
				.and('contain.text', 'Got it')
				.click();
			cy.get('h1').should('contain.text', 'Deposit');
		});
	});

	describe('Deposit Flow', () => {
		beforeEach(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('publicKey', 'mock-public-key');
			});
		});

		afterEach(() => {
			cy.window().then((win) => {
				win.localStorage.removeItem('publicKey');
			});
		});

		it('Should redirect to platform page when not authenticated', () => {
			cy.window().then((win) => {
				win.localStorage.removeItem('publicKey');
			});
			cy.visit('/platform/deposit');
			cy.url().should('include', '/platform');
		});

		it('Should redirect to platform page when user logs out', () => {
			cy.visit('/platform/deposit');
			cy.window().then((win) => {
				win.localStorage.removeItem('publicKey');
			});
			cy.url().should('include', '/platform');
		});

		it('Should display the initial deposit form when authenticated', () => {
			cy.get('#continue-button').click();
			cy.get('#got-it-button').click();

			cy.get('[data-testid="operation-form-container"]').should('be.visible');
			cy.get('[data-testid="operation-title"]').should(
				'contain.text',
				'Deposit',
			);
			cy.get('#deposit-interface-selector').should('be.visible');
		});

		it('Should show additional fields after clicking continue', () => {
			cy.get('#continue-button').click();
			cy.get('#got-it-button').click();
			cy.get('#deposit-continue-button').click();

			cy.get('#deposit-interface-selector').click();
			cy.get('input[type="search"]').type('Anclap');
			cy.contains('Anclap UI').click();
			cy.get('#deposit-interface-selector').should('contain.text', 'Anclap UI');

			cy.get('[data-testid="public-key-input"]').type(
				'GCOVVCPNDXQRGOILIRUTAF3HD2HB35BWMBRGJSQGCECU7WUBSTSFALPA',
			);
			cy.get('[data-testid="public-key-input"]').should(
				'have.value',
				'GCOVVCPNDXQRGOILIRUTAF3HD2HB35BWMBRGJSQGCECU7WUBSTSFALPA',
			);

			cy.get('[data-testid="memo-input"]').type('Test memo');
			cy.get('[data-testid="memo-input"]').should('have.value', 'Test memo');

			cy.get('[data-testid="email-input"]').type('test@example.com');
			cy.get('[data-testid="email-input"]').should(
				'have.value',
				'test@example.com',
			);
			cy.get('#deposit-continue-button').click();
		});

		it('Should show error when public key is empty', () => {
			cy.get('#continue-button').click();
			cy.get('#got-it-button').click();
			cy.get('#deposit-continue-button').click();

			cy.get('[data-testid="public-key-input"]').focus().blur();
			cy.get('#deposit-continue-button').click();
			cy.get('[data-testid="public-key-error"]').should(
				'contain.text',
				'Public key is required',
			);
			cy.get('[data-testid="operation-instructions"]').should('not.exist');
		});

		it('Should show error when public key does not start with G', () => {
			cy.get('#continue-button').click();
			cy.get('#got-it-button').click();
			cy.get('#deposit-continue-button').click();

			cy.get('[data-testid="public-key-input"]').type('A'.repeat(56));
			cy.get('[data-testid="public-key-error"]').should(
				'contain.text',
				'Public key must start with G',
			);
			cy.get('#deposit-continue-button').click();
			cy.get('[data-testid="operation-instructions"]').should('not.exist');
		});

		it('Should show error when public key is not 56 characters', () => {
			cy.get('#continue-button').click();
			cy.get('#got-it-button').click();
			cy.get('#deposit-continue-button').click();

			cy.get('[data-testid="public-key-input"]').type('G'.repeat(55));
			cy.get('[data-testid="public-key-error"]').should(
				'contain.text',
				'Public key must be 56 characters long',
			);
			cy.get('#deposit-continue-button').click();
			cy.get('[data-testid="operation-instructions"]').should('not.exist');
		});

		it('Should show red border when public key is invalid', () => {
			cy.get('#continue-button').click();
			cy.get('#got-it-button').click();
			cy.get('#deposit-continue-button').click();

			cy.get('[data-testid="public-key-input"]').type('invalid');
			cy.get('[data-testid="public-key-input"]').should(
				'have.class',
				'border-red-500',
			);
		});

		it('Should accept valid public key and allow form submission', () => {
			cy.get('#continue-button').click();
			cy.get('#got-it-button').click();
			cy.get('#deposit-continue-button').click();

			cy.get('[data-testid="public-key-input"]').type('G'.repeat(56));
			cy.get('[data-testid="public-key-error"]').should('not.exist');
			cy.get('[data-testid="public-key-input"]').should(
				'not.have.class',
				'border-red-500',
			);
			cy.get('#deposit-continue-button').click();
			cy.get('[data-testid="operation-instructions"]').should('exist');
		});

		describe('Deposit Instructions', () => {
			beforeEach(() => {
				cy.get('#continue-button').click();
				cy.get('#got-it-button').click();
				cy.get('#deposit-continue-button').click();

				cy.get('[data-testid="public-key-input"]').type(
					'GCOVVCPNDXQRGOILIRUTAF3HD2HB35BWMBRGJSQGCECU7WUBSTSFALPA',
				);

				cy.get('#deposit-continue-button').click();
			});

			it('Should display deposit instructions after form submission', () => {
				cy.get('[data-testid="operation-instructions"]').should('be.visible');
				cy.get('[data-testid="instructions-title"]').should(
					'contain.text',
					'Deposit Instructions',
				);

				cy.get('[data-testid="transaction-id"]').should(
					'contain.text',
					'abcd1234efgh5678',
				);
				cy.get('[data-testid="estimated-time"]').should(
					'contain.text',
					'5 minutes',
				);
				cy.get('[data-testid="amount"]').should('contain.text', '100,000');

				cy.get('[data-testid="bank-info"]').should(
					'contain.text',
					'Make a payment to Bank: 121122676 Account: 887765458',
				);
				cy.get('[data-testid="account-number"]').should(
					'contain.text',
					'887765458',
				);
			});
		});

		describe('Anchor Info Section', () => {
			beforeEach(() => {
				cy.get('#continue-button').click();
				cy.get('#got-it-button').click();
				cy.get('#deposit-continue-button').click();

				cy.get('[data-testid="public-key-input"]').type(
					'GCOVVCPNDXQRGOILIRUTAF3HD2HB35BWMBRGJSQGCECU7WUBSTSFALPA',
				);

				cy.get('#deposit-continue-button').click();
			});

			it('Should display anchor logo and name correctly', () => {
				cy.get('[data-testid="anchor-info-container"] img')
					.should(
						'have.attr',
						'src',
						'https://home.anclap.com/wp-content/uploads/2023/01/Ico.svg',
					)
					.and('have.attr', 'alt', 'Anclap logo')
					.and('have.class', 'w-12')
					.and('have.class', 'h-12')
					.and('have.class', 'rounded-lg');
				cy.get('[data-testid="anchor-info-container"]')
					.find('h3')
					.should('contain.text', 'Anclap');
			});

			it('Should display countries correctly', () => {
				cy.viewport(1024, 768);
				cy.get('[data-testid="anchor-info-container"]')
					.find('p')
					.first()
					.should(
						'contain.text',
						'Argentina / Chile / Colombia / Mexico / Peru',
					);
			});

			it('Should display all info sections with correct data', () => {
				cy.viewport(1024, 768);
				cy.get('[data-testid="anchor-info-container"]').within(() => {
					cy.contains('Description')
						.next()
						.should('contain.text', 'Best rates, best service');
					cy.contains('Crypto Assets')
						.next()
						.should('contain.text', 'ARS, PEN, USDC, XLM');
					cy.contains('Fiat Assets')
						.next()
						.should('contain.text', '$ARS, $USD');
					cy.contains('Payment Rails')
						.next()
						.should('contain.text', 'Cash, Card, Bank Transfer, Local Method');
				});
			});
		});
	});

	describe('Withdraw Flow', () => {
		beforeEach(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('publicKey', 'mock-public-key');
			});
			cy.get('#operation-selector').click();
			cy.get('input[type="search"]').type('Withdraw');
			cy.contains('Withdraw').click();
			cy.get('#continue-button').click();
			cy.get('#got-it-button').click();
		});

		afterEach(() => {
			cy.window().then((win) => {
				win.localStorage.removeItem('publicKey');
			});
		});

		it('Should redirect to platform page when not authenticated', () => {
			cy.window().then((win) => {
				win.localStorage.removeItem('publicKey');
			});
			cy.visit('/platform/withdraw');
			cy.url().should('include', '/platform');
		});

		it('Should redirect to platform page when user logs out', () => {
			cy.visit('/platform/withdraw');
			cy.window().then((win) => {
				win.localStorage.removeItem('publicKey');
			});
			cy.url().should('include', '/platform');
		});

		it('Should display the initial withdraw form when authenticated', () => {
			cy.get('[data-testid="operation-form-container"]').should('be.visible');
			cy.get('[data-testid="operation-title"]').should(
				'contain.text',
				'Withdraw',
			);
			cy.get('#withdraw-interface-selector').should('be.visible');
		});

		it('Should show additional fields after clicking continue', () => {
			cy.get('#withdraw-continue-button').click();

			cy.get('#withdraw-interface-selector').click();
			cy.get('input[type="search"]').type('Anclap');
			cy.contains('Anclap UI').click();
			cy.get('#withdraw-interface-selector').should(
				'contain.text',
				'Anclap UI',
			);

			cy.get('[data-testid="public-key-input"]').type(
				'GCOVVCPNDXQRGOILIRUTAF3HD2HB35BWMBRGJSQGCECU7WUBSTSFALPA',
			);
			cy.get('[data-testid="public-key-input"]').should(
				'have.value',
				'GCOVVCPNDXQRGOILIRUTAF3HD2HB35BWMBRGJSQGCECU7WUBSTSFALPA',
			);

			cy.get('[data-testid="memo-input"]').type('Test memo');
			cy.get('[data-testid="memo-input"]').should('have.value', 'Test memo');

			cy.get('[data-testid="email-input"]').type('test@example.com');
			cy.get('[data-testid="email-input"]').should(
				'have.value',
				'test@example.com',
			);
			cy.get('#withdraw-continue-button').click();
		});

		it('Should show error when public key is empty', () => {
			cy.get('#withdraw-continue-button').click();

			cy.get('[data-testid="public-key-input"]').focus().blur();
			cy.get('#withdraw-continue-button').click();
			cy.get('[data-testid="public-key-error"]').should(
				'contain.text',
				'Public key is required',
			);
			cy.get('[data-testid="operation-instructions"]').should('not.exist');
		});

		it('Should show error when public key does not start with G', () => {
			cy.get('#withdraw-continue-button').click();

			cy.get('[data-testid="public-key-input"]').type('A'.repeat(56));
			cy.get('[data-testid="public-key-error"]').should(
				'contain.text',
				'Public key must start with G',
			);
			cy.get('#withdraw-continue-button').click();
			cy.get('[data-testid="operation-instructions"]').should('not.exist');
		});

		it('Should show error when public key is not 56 characters', () => {
			cy.get('#withdraw-continue-button').click();

			cy.get('[data-testid="public-key-input"]').type('G'.repeat(55));
			cy.get('[data-testid="public-key-error"]').should(
				'contain.text',
				'Public key must be 56 characters long',
			);
			cy.get('#withdraw-continue-button').click();
			cy.get('[data-testid="operation-instructions"]').should('not.exist');
		});

		it('Should show red border when public key is invalid', () => {
			cy.get('#withdraw-continue-button').click();

			cy.get('[data-testid="public-key-input"]').type('invalid');
			cy.get('[data-testid="public-key-input"]').should(
				'have.class',
				'border-red-500',
			);
		});

		it('Should accept valid public key and allow form submission', () => {
			cy.get('#withdraw-continue-button').click();

			cy.get('[data-testid="public-key-input"]').type('G'.repeat(56));
			cy.get('[data-testid="public-key-error"]').should('not.exist');
			cy.get('[data-testid="public-key-input"]').should(
				'not.have.class',
				'border-red-500',
			);
			cy.get('#withdraw-continue-button').click();
			cy.get('[data-testid="operation-instructions"]').should('exist');
		});

		describe('Withdraw Instructions', () => {
			beforeEach(() => {
				cy.get('#withdraw-continue-button').click();

				cy.get('[data-testid="public-key-input"]').type(
					'GCOVVCPNDXQRGOILIRUTAF3HD2HB35BWMBRGJSQGCECU7WUBSTSFALPA',
				);

				cy.get('#withdraw-continue-button').click();
			});

			it('Should display withdraw instructions after form submission', () => {
				cy.get('[data-testid="operation-instructions"]').should('be.visible');
				cy.get('[data-testid="instructions-title"]').should(
					'contain.text',
					'Withdraw Instructions',
				);

				cy.get('[data-testid="transaction-id"]').should(
					'contain.text',
					'abcd1234efgh5678',
				);
				cy.get('[data-testid="estimated-time"]').should(
					'contain.text',
					'5 minutes',
				);
				cy.get('[data-testid="amount"]').should('contain.text', '100,000');

				cy.get('[data-testid="bank-info"]').should(
					'contain.text',
					'Make a payment to Bank: 121122676 Account: 887765458',
				);
				cy.get('[data-testid="account-number"]').should(
					'contain.text',
					'887765458',
				);
			});
		});
	});

	describe('Rate Converter Flow', () => {
		beforeEach(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('publicKey', 'mock-public-key');
			});
			cy.get('#operation-selector').click();
			cy.get('input[type="search"]').type('Get Rates');
			cy.contains('Get Rates').click();
			cy.get('#continue-button').click();
		});

		afterEach(() => {
			cy.window().then((win) => {
				win.localStorage.removeItem('publicKey');
			});
		});

		it('Should display the rate converter title and form elements', () => {
			cy.get('h1').should('contain.text', 'Rate Converter');
			cy.get('h2').first().should('contain.text', 'You send');
			cy.get('[data-testid="send-amount-input"]').should('have.value', '0.00');

			cy.get('h2').last().should('contain.text', 'You get');
			cy.get('[data-testid="get-amount-input"]').should('have.value', '0.00');

			cy.get('#get-rate-button')
				.should('be.visible')
				.and('have.text', 'Get Rate');
		});

		it('Should display currency indicators with location icons', () => {
			cy.get('[data-testid="send-amount-input"]')
				.parent()
				.find('svg')
				.should('be.visible');
			cy.get('[data-testid="send-amount-input"]')
				.parent()
				.find('span')
				.should('contain.text', 'ARS');

			cy.get('[data-testid="get-amount-input"]')
				.parent()
				.find('svg')
				.should('be.visible');
			cy.get('[data-testid="get-amount-input"]')
				.parent()
				.find('span')
				.should('contain.text', '$ ARS');
		});

		it('Should allow input in send amount field', () => {
			cy.get('[data-testid="send-amount-input"]')
				.clear()
				.type('100.50')
				.should('have.value', '100.50');
		});

		it('Should have readonly get amount field', () => {
			cy.get('[data-testid="get-amount-input"]').should(
				'have.attr',
				'readonly',
			);
		});
	});

	describe('Transactions Flow', () => {
		beforeEach(() => {
			cy.window().then((win) => {
				win.localStorage.setItem('publicKey', 'mock-public-key');
			});
			cy.get('#operation-selector').click();
			cy.get('input[type="search"]').type('Transactions');
			cy.contains('Transactions').click();
			cy.get('#continue-button').click();
		});

		afterEach(() => {
			cy.window().then((win) => {
				win.localStorage.removeItem('publicKey');
			});
		});

		it('Should display the transactions page title', () => {
			cy.get('h1').should('contain.text', 'Transactions');
		});

		it('Should display the search transactions input', () => {
			cy.get('[data-testid="transaction-search-input"]')
				.should('be.visible')
				.and('have.attr', 'placeholder', 'Search transactions');
		});

		it('Should display transaction items with correct information', () => {
			cy.get('[data-testid="transaction-item"]').should('have.length', 7);

			cy.get('[data-testid="transaction-item"]')
				.first()
				.within(() => {
					cy.contains('Deposit').should('be.visible');
					cy.contains('$100').should('be.visible');
					cy.contains('Transaction ID: a123456').should('be.visible');
					cy.contains('2 minutes ago').should('be.visible');
				});

			cy.get('[data-testid="transaction-item"]')
				.eq(1)
				.within(() => {
					cy.contains('Withdrawal').should('be.visible');
					cy.contains('$200').should('be.visible');
					cy.contains('Transaction ID: b123457').should('be.visible');
					cy.contains('3 hours ago').should('be.visible');
				});
		});

		it('Should filter transactions based on search input', () => {
			cy.get('[data-testid="transaction-search-input"]').type('a123456');
			cy.get('[data-testid="transaction-item"]').should('have.length', 1);
			cy.contains('Transaction ID: a123456').should('be.visible');

			cy.get('[data-testid="transaction-search-input"]').clear().type('b123');
			cy.get('[data-testid="transaction-item"]').should('have.length', 1);
			cy.contains('Transaction ID: b123457').should('be.visible');

			cy.get('[data-testid="transaction-search-input"]').clear();
			cy.get('[data-testid="transaction-item"]').should('have.length', 7);
		});

		it('Should be case insensitive when filtering transactions', () => {
			cy.get('[data-testid="transaction-search-input"]').type('A123456');
			cy.get('[data-testid="transaction-item"]').should('have.length', 1);
			cy.contains('Transaction ID: a123456').should('be.visible');

			cy.get('[data-testid="transaction-search-input"]').clear().type('B123');
			cy.get('[data-testid="transaction-item"]').should('have.length', 1);
			cy.contains('Transaction ID: b123457').should('be.visible');

			cy.get('[data-testid="transaction-search-input"]').clear();
			cy.get('[data-testid="transaction-item"]').should('have.length', 7);
		});

		it('Should show no results when search matches nothing', () => {
			cy.get('[data-testid="transaction-search-input"]').type('nonexistent');
			cy.get('[data-testid="transaction-item"]').should('have.length', 0);
		});
	});
});
