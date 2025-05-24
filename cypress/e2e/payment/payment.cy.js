describe('Payment Tests', () => {
  beforeEach(() => {
    cy.fixture('user').then(user => {
      cy.login(user.validUser.email, user.validUser.password);
    });

    cy.visit('https://automationexercise.com/checkout');

    cy.get('body').then($body => {
      if ($body.find('.cart_info tbody tr').length === 0) {
        cy.visit('https://automationexercise.com/');
        cy.get('.product-image-wrapper').first().trigger('mouseover');
        cy.contains('Add to cart').first().click();
        cy.get('.modal-content').should('be.visible');
        cy.contains('Continue Shopping').click();
        cy.visit('https://automationexercise.com/checkout');
      }
    });
  });

  it('should fill payment details and confirm order', () => {
    cy.get('textarea').type('Please deliver between 9am and 5pm.');

    cy.contains('a', 'Place Order').click();

    cy.url().should('include', '/payment');

    cy.get('input[name="name_on_card"]').type('Test User');
    cy.get('input[name="card_number"]').type('4111111111111111');
    cy.get('input[name="cvc"]').type('123');
    cy.get('input[placeholder="MM"]').type('12');
    cy.get('input[placeholder="YYYY"]').type('2025');

    cy.contains('button', 'Pay and Confirm Order').click();

    // ตรวจสอบข้อความยืนยันแบบไม่สนใจตัวพิมพ์ใหญ่เล็ก
    cy.contains(/order placed!/i).should('be.visible');
    cy.contains(/congratulations! your order has been confirmed!/i).should('be.visible');
  });
});
