describe('Login Tests with Fixture', () => {
  beforeEach(() => {
    cy.fixture('user').as('users');
  });

  it('should show error on invalid login', function () {
    cy.login(this.users.invalidUser.email, this.users.invalidUser.password, false);
    cy.get('.login-form > form p').should('contain.text', 'Your email or password is incorrect!');
  });

  it('should login successfully with valid credentials', function () {
    cy.login(this.users.validUser.email, this.users.validUser.password);
    cy.get('.shop-menu .nav > li > a').should('contain.text', 'Logged in as');
  });
});
