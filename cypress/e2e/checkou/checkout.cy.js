describe('Checkout Page Tests', () => {
  beforeEach(() => {
    cy.fixture('user').then(user => {
      cy.login(user.validUser.email, user.validUser.password);
    });

    // ไปหน้า cart ก่อน เพื่อเช็คว่ามีสินค้าไหม
    cy.visit('https://automationexercise.com/cart');

    // ถ้าตะกร้าว่างให้เพิ่มสินค้าเข้าไปก่อน
    cy.get('body').then($body => {
      if ($body.find('.cart_info tbody tr').length === 0) {
        cy.visit('https://automationexercise.com/');
        cy.get('.product-image-wrapper').first().trigger('mouseover');
        cy.contains('Add to cart').first().click();
        cy.get('.modal-content').should('be.visible');
        cy.contains('Continue Shopping').click();

        // กลับไปหน้า cart อีกครั้ง
        cy.visit('https://automationexercise.com/cart');
      }
    });

    // จากนั้นไปหน้า checkout
    cy.visit('https://automationexercise.com/checkout');
  });

  it('should display checkout sections and allow placing order', () => {
    cy.contains('Address Details').should('be.visible');
    cy.contains('Review Your Order').should('be.visible');

    cy.get('textarea').type('Please deliver between 9am and 5pm.');

    cy.contains('a', 'Place Order').should('be.visible').click();

    // รอหน้า /payment โหลด (หรือข้อความยืนยัน)
    cy.url().should('include', '/payment');

    // ตรวจสอบข้อความหรือ element บนหน้าจ่ายเงินต่อไป
    cy.contains('Payment').should('be.visible');
  });
});
