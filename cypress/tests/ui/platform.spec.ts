describe('Platform Page', () => {
	beforeEach(() => {
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

			cy.get('#email-service-selector').should('exist');
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
			cy.get('#email-service-selector').click();
			cy.get('input[type="search"]').type('Anclap');
			cy.contains('Anclap').click();
			cy.get('#email-service-selector').should('contain.text', 'Anclap');
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
				cy.get('#email-service-selector').click();
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

	describe('Continue Button', () => {
		it('Should display a disabled Continue button when not connected', () => {
			cy.get('button').contains('Continue').should('be.disabled');
		});
	});

	describe('Responsive Layout', () => {
		it('Should display correctly on desktop', () => {
			cy.viewport(1024, 768);
			cy.get('.md\\:w-1\\/2').should('be.visible');
		});

		it('Should display correctly on mobile', () => {
			cy.viewport(375, 812);
			cy.get('.w-full').should('be.visible');
		});
	});
});
