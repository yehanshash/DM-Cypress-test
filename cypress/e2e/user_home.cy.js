describe('User Wishlist', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/user/login');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('.login-btn button[type="submit"]').click();
    });

    it('should add a product to the wishlist', () => {
        // Selecting the first product
        cy.wait(2000);
        cy.get('.product-img a').first().click({ force: true });

        cy.wait(2000);
        // Clicking the "Add to Wishlist" button
        cy.get('a[href*="/wishlist"]').click({ multiple: true, force: true });

        // Verifying the success message
        cy.get('.alert-success').contains('Product successfully added to wishlist').should('be.visible');
    });

    it('should remove a product from the wishlist', () => {
        // Navigating to the wishlist page
        cy.wait(2000);
        cy.visit('http://127.0.0.1:8000/wishlist');

        // Clicking the "Remove" button for the first item in the wishlist
        cy.wait(2000);
        cy.get('.shopping-item .remove').first().click({force: true});

        // Verifying the success message
        cy.get('.alert-success').contains('Wishlist successfully removed').should('be.visible');
    });

    it('should add a review for the first product', () => {
        // Selecting the first product
        cy.wait(2000);
        cy.get('.product-img a').first().click({ force: true });

        // Clicking the "Reviews" tab
        cy.contains('Reviews').click();

        // Adding five stars
        cy.get('.star-rating__input').eq(4).click({force: true}); // Assuming index 4 corresponds to 5 stars

        // Entering review text
        cy.get('textarea[name="review"]').type('This is a great product!');

        // Submitting the review
        cy.contains('Submit').click();

        // Verifying the success message
        cy.get('.alert-success').contains('hank you for your feedback').should('be.visible');
    });

    it('should add a comment to the first blog post', () => {

        cy.visit('http://127.0.0.1:8000/blog');

        // Clicking on the first blog post
        cy.get('.more-btn').first().click();

        // Entering comment text
        cy.get('textarea[name="comment"]').type('This is a great post!');

        // Submitting the comment
        cy.contains('Post Comment').click();

        // Verifying the success message
        cy.get('.alert-success').contains('Thank you for your comment').should('be.visible');
    });
});
