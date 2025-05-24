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
    cy.get('body').then(($body) => {
      if ($body.find('.cart_info tbody tr').length > 0) {
        cy.get('.cart_info tbody tr')
          .its('length')
          .then((initialCount) => {
            // คลิกปุ่มลบชิ้นแรก
            cy.get('.cart_info tbody tr')
              .first()
              .find('.cart_quantity_delete')
              .click();

            // รอจนกว่าแถวของตะกร้าจะเปลี่ยนแปลง
            cy.get('.cart_info tbody tr').should(($newRows) => {
              const newCount = $newRows.length;
              // ถ้ายังมีสินค้าอยู่ ให้จำนวนลดลง
              if (newCount > 0) {
                expect(newCount).to.be.lessThan(initialCount);
              } else {
                // ถ้าเหลือ 0 แถว ให้เห็นข้อความ “Cart is empty!”
                cy.contains('Cart is empty!').should('be.visible');
              }
            });
          });
      } else {
        cy.log('No products in cart to remove');
      }
    });
  });
});
