describe('Add to Cart Tests', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com/');
  });

  it('should add first product to cart and verify cart page has the product', () => {
    // เพิ่มสินค้าชิ้นแรก
    cy.get('.product-image-wrapper').first().trigger('mouseover');
    cy.contains('Add to cart').first().click();

    // รอ modal ขึ้นมา และคลิก Continue Shopping
    cy.get('.modal-content').should('be.visible');
    cy.contains('Continue Shopping').click();

    // เข้าไปหน้า Cart เพื่อเช็ครายการสินค้า
    cy.visit('https://automationexercise.com/view_cart');

    // ตรวจสอบว่ามีสินค้าปรากฏในตารางตะกร้า
    cy.get('.cart_info tbody tr').its('length').should('be.gte', 1);
  });
});
