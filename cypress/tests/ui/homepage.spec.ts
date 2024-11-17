const questions = [
	{
		question: 'What is Stellar?',
		answer:
			'Stellar is a blockchain network designed to make financial transactions fast, secure, and low-cost, especially across borders. It’s like the internet for payments, allowing you to send money anywhere in the world as easily as sending an email.',
	},
	{
		question: 'What is an Anchor?',
		answer:
			'An anchor is a trusted bridge between traditional money and the Stellar network. Anchors hold your money in the form of cash or bank deposits and issue digital assets on Stellar that you can use for transactions. Think of them as gateways that connect the financial world to the Stellar network.',
	},
	{
		question: 'Are you an anchor?',
		answer:
			'No, we’re not an anchor. We simply provide a handy platform that helps you find the best anchor for your needs, without requiring any technical know-how or hunting around.',
	},
	{
		question: 'Do you charge for using your app?',
		answer:
			'Nope! We don’t charge you a thing. Any fees you pay are directly between you and the anchor you choose.',
	},
	{
		question: 'Why do I need to connect my Stellar Account?',
		answer:
			'To ensure security, some anchors use Stellar’s recommended protocols, which require verifying that you own the account you want to use. This is done by validating your signature. Don’t worry—your private key stays safe on your device, and neither the anchor nor we can see anything beyond the signed transaction. Plus, this verification is free since it doesn’t go to the network.',
	},
	{
		question: 'What if I don’t see an anchor in my location?',
		answer:
			'If there’s no anchor available in your area, just let us know! We’ll do our best to add it as soon as we can.',
	},
	{
		question: 'Will there be more features?',
		answer:
			'Yes, definitely! We’re constantly working on new features to help you make the best, most informed choices. Stay tuned—there’s a lot more to come!',
	},
];

const resourcesSection = [
	{
		title: 'Getting Started',
		route: '/',
	},
	{
		title: 'Documentation',
		route: '/',
	},
	{
		title: 'FAQs',
		route: '/',
	},
];
const connectSection = [
	{
		title: 'About Us',
		route: '/',
	},
	{
		title: 'Community Forum',
		route: '/',
	},
	{
		title: 'Subscribe',
		route: '/',
	},
	{
		title: 'Contact Us',
		route: '/',
	},
];
const exploreSection = [
	{
		title: 'Find Anchors',
		route: '/',
	},
	{
		title: 'Stellar Basics',
		route: '/',
	},
	{
		title: 'Security Tips',
		route: '/',
	},
	{
		title: 'Latest Updates',
		route: '/',
	},
];
const followUsSection = [
	{
		title: 'Twitter',
		route: '/',
	},
	{
		title: 'Youtube',
		route: '/',
	},
	{
		title: 'LinkedIn',
		route: '/',
	},
	{
		title: 'Instagram',
		route: '/',
	},
];

const slideInformation = [
	{
		title: 'Connect your Wallet',
		description: 'Connect your Stellar Account.',
	},
	{
		title: 'Select Your Country',
		description:
			'Choose the country where you want to initiate your operation.',
	},
	{
		title: 'Select the Anchor',
		description:
			'Pick from the available anchors in your chosen country to begin your transaction.',
	},
	{
		title: 'Select the Operation',
		description:
			'Choose your desired operation: deposit, withdraw, check transactions or view anchor fees.',
	},
	{
		title: 'Complete the Data',
		description:
			'Fill in the necessary information to perform your chosen action in the selected anchor.',
	},
	{
		title: 'Operation Completed!',
		description: 'Congrats! Your operation is completed!',
	},
];

describe('Home page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Should find the Header component', () => {
		cy.get('.bosun-logo-header').should('exist');
		cy.get('.home-header').contains('Home');
		cy.get('.contact-us-header').contains('Contact Us');
		cy.get('.connect-button-header').contains('Connect');
		cy.get('.language-button-header').should('exist');
	});

	it('Should find the Hero component', () => {
		cy.get('.hero-main-title').contains(
			'Seamlessly Discover and Interact with Stellar Anchors',
		);
		cy.get('.hero-paragraph-text').contains(
			'Effortlessly on-ramp and off-ramp funds, connect your wallet, select your country, and securely sign transactions—all in one place.',
		);
		cy.get('.start-exploring-anchors').contains('Start Exploring Anchors');
		cy.get('.assets-image').should('exist');
	});

	it('Should find the How It Works component', () => {
		cy.get('.how-it-works-main-title').contains('How It Works?');
		slideInformation.forEach(({ title, description }, index) => {
			cy.get('.slick-next').click({ multiple: true, force: true });
			cy.get(`[data-test="slide-title-${index}"]:visible`)
				.should('be.visible')
				.and('have.text', title);

			cy.get(`[data-test="slide-description-${index}"]:visible`)
				.should('be.visible')
				.and('have.text', description);
		});
	});

	it('Should find the About Us component', () => {
		cy.get('.about-us-main-title').contains('About Us');
		cy.get('.about-us-main-paragraph-text').contains(
			`At Bosun, we make it easy to connect with the Stellar network. Our platform lets you find and interact with trusted Stellar anchors, on-ramp and off-ramp funds, and manage your transactions—all in a few simple steps. We prioritize${' '}security and simplicity, so you can confidently explore the world of decentralized finance.`,
		);
		cy.get('.about-us-people-image').should('exist');
		cy.get('.about-us-secondary-paragraph-text').contains(
			'Join us as we bridge the gap between traditional finance and the Stellar network, making it easier than ever to operate in the world of decentralized finance.',
		);
	});

	it('Should find the FAQ component', () => {
		questions.forEach(({ question, answer }) => {
			cy.contains(question).should('be.visible').and('have.text', question);

			cy.contains(question).click();
			cy.contains(answer).should('be.visible').and('have.text', answer);
		});
	});

	it('Should find the Footer component', () => {
		resourcesSection.forEach(({ title, route }, index) => {
			cy.get(`[data-test="footer-resources-section-${index}"]`)
				.should('have.text', title)
				.and('have.attr', 'href')
				.and('include', route);
		});
		connectSection.forEach(({ title, route }, index) => {
			cy.get(`[data-test="footer-connect-section-${index}"]`)
				.should('have.text', title)
				.and('have.attr', 'href')
				.and('include', route);
		});
		exploreSection.forEach(({ title, route }, index) => {
			cy.get(`[data-test="footer-explore-section-${index}"]`)
				.should('have.text', title)
				.and('have.attr', 'href')
				.and('include', route);
		});
		followUsSection.forEach(({ title, route }, index) => {
			cy.get(`[data-test="footer-follow-us-section-${index}"]`)
				.should('have.text', title)
				.and('have.attr', 'href')
				.and('include', route);
		});
	});
});
