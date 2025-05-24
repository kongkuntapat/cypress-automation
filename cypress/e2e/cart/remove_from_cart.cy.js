describe('Remove from Cart Tests', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com/');

    cy.get('.product-image-wrapper').first().trigger('mouseover');
    cy.contains('Add to cart').first().click();

    cy.get('.modal-content').should('be.visible');
    cy.contains('Continue Shopping').click();

    cy.visit('https://automationexercise.com/view_cart');
  });

  it('should remove a product from cart and verify cart is updated or empty', () => {
    cy.get('body').then($body => {
      if ($body.find('.cart_info tbody tr').length > 0) {
        // ถ้ามีสินค้าก่อนลบ
        cy.get('.cart_info tbody tr').its('length').then(initialCount => {
          cy.get('.cart_info tbody tr').first().find('.cart_quantity_delete').click();
          cy.wait(1000);

          // ตรวจสอบว่าหลังลบสินค้าแล้ว
          cy.get('body').then($bodyAfter => {
            if ($bodyAfter.find('.cart_info tbody tr').length > 0) {
              cy.get('.cart_info tbody tr').its('length').should('be.lessThan', initialCount);
            } else {
              // กรณีตะกร้าว่าง ไม่มีสินค้าเลย
              cy.contains('Cart is empty!').should('be.visible');
            }
          });
        });
      } else {
        // กรณีไม่มีสินค้าเลยก่อนเทสต์ (อาจ error หรือแจ้ง)
        cy.log('No products in cart to remove');
      }
    });
  });
});
