describe('Admin Review', () => {
    beforeEach(() => {
        // Login before each test
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/login'); // Assuming the login page is the default page
        cy.get('input[name="email"]').type('admin@gmail.com');
        cy.get('input[name="password"]').type('1111');
        cy.get('button[type="submit"]').click();
        cy.visit('http://127.0.0.1:8000/admin');
    });


    it('should edit a Review successfully in admin panel', () => {
        // Navigate to the Review Page
        cy.contains('Reviews').click();

        // Navigate to the Edit Review Page
        cy.get('.fa-edit').last().click();

        // Change status to inactive
        cy.get('select[name="status"]').select('Inactive');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message for Review update
        cy.get('.alert-success').contains('Review Successfully updated').should('be.visible');
    });

    it('should show confirmation dialog when deleting a Review and cancel in admin panel Review', () => {
        // Navigate to the Review Page
        cy.contains('Reviews').click();

        // Click delete button for the added Review
        cy.get('.fa-trash-alt').last().click();

        // Check if the confirmation dialog is displayed
        cy.get('.swal-modal').should('be.visible');

        // Click cancel button in the confirmation dialog
        cy.get('.swal-button--cancel').click();

        // Click OK on the confirmation dialog to close it
        cy.get('.swal-button--confirm').click();

        // Check that the Review is not deleted
        cy.contains('This is a great product!').last().should('exist');

    });

    it('should delete a Review successfully in admin panel Review', () => {
        // Navigate to the Review Page
        cy.contains('Reviews').click();

        // Click delete button for the added Review
        cy.get('.fa-trash-alt').last().click();

        // Confirm deletion
        cy.get('.swal-button--danger').click();

        // Check success message for Review deletion
        cy.get('.alert-success').contains('Successfully deleted review').should('be.visible');
    });
});
