// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// คำสั่งล็อกอิน รองรับทั้ง success และ failure
Cypress.Commands.add('login', (email, password, expectSuccess = true) => {
  cy.visit('https://automationexercise.com/login');
  cy.get('input[name="email"]').first().type(email);
  cy.get('input[name="password"]').first().type(password);
  cy.get('button[data-qa="login-button"]').click();

  if (expectSuccess) {
    cy.url().should('eq', 'https://automationexercise.com/');
  } else {
    cy.url().should('include', '/login');
  }
});

Cypress.Commands.add('addFirstProductToCart', () => {
  cy.visit('https://automationexercise.com/');
  cy.get('.product-image-wrapper').first().trigger('mouseover');
  cy.contains('Add to cart').first().click();
  cy.get('.modal-content').should('be.visible');
  cy.contains('Continue Shopping').click();
});

Cypress.Commands.add('proceedToCheckout', () => {
  cy.visit('https://automationexercise.com/view_cart');
  cy.contains('Proceed To Checkout').click();
});
