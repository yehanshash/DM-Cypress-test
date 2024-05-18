describe('Add Brand', () => {
    beforeEach(() => {
        // Login before each test
        cy.viewport(1920, 1080);
        cy.visit('http://127.0.0.1:8000/login'); // Assuming the login page is the default page
        cy.get('input[name="email"]').type('admin@gmail.com');
        cy.get('input[name="password"]').type('1111');
        cy.get('button[type="submit"]').click();
        cy.visit('http://127.0.0.1:8000/admin');
    });

    it('should show validation error for empty fields in admin panel Brand', () => {
        // Navigate to the Add Brand Page
        cy.contains('Brands').click();
        cy.contains('Add Brand').click();

        // Submit the form without filling out any fields
        cy.get('button[type="submit"]').click();

        // Check validation errors for empty fields
        cy.get('input[name="title"]').siblings('.text-danger').should('be.visible');

        // Check that no success message is displayed
        cy.get('.alert-success').should('not.exist');
    });

    it('should add a Brand successfully in admin panel', () => {
        // Navigate to the Add Brand Page
        cy.contains('Brands').click();
        cy.contains('Add Brand').click();

        // Fill out the form
        cy.get('input[name="title"]').type('Test admin Brand');
        cy.get('select[name="status"]').select('Active'); // Select a status


        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message
        cy.get('.alert-success').contains('Brand successfully created').should('be.visible');
    });

    it('should edit a Brand successfully in admin panel', () => {
        // Navigate to the Brand Page
        cy.contains('Brands').click();
        cy.get('.collapse-item').contains('Brand').click();

        // Navigate to the Edit Brand Page
        cy.get('.sorting_asc').click();
        cy.get('.fa-edit').first().click();

        // Change status to inactive
        cy.get('select[name="status"]').select('Inactive');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check success message for Brand update
        cy.get('.alert-success').contains('Brand successfully updated').should('be.visible');
    });

    it('should show confirmation dialog when deleting a Brand and cancel in admin panel Brand', () => {
        // Navigate to the Brand Page
        cy.contains('Brands').click();
        cy.get('.collapse-item').contains('Brand').click();

        // Click delete button for the added Brand
        cy.get('.sorting_asc').click();
        cy.get('.fa-trash-alt').last().click();

        // Check if the confirmation dialog is displayed
        cy.get('.swal-modal').should('be.visible');

        // Click cancel button in the confirmation dialog
        cy.get('.swal-button--cancel').click();

        // Click OK on the confirmation dialog to close it
        cy.get('.swal-button--confirm').click();

        // Check that the Brand is not deleted
        cy.contains('Test admin Brand').last().should('exist');

    });

    it('should delete a Brand successfully in admin panel Brand', () => {
        // Navigate to the Brand Page
        cy.contains('Brands').click();
        cy.get('.collapse-item').contains('Brand').click();

        // Click delete button for the added Brand
        cy.get('.sorting_asc').click();
        cy.get('.fa-trash-alt').last().click();

        // Confirm deletion
        cy.get('.swal-button--danger').click();

        // Check success message for Brand deletion
        cy.get('.alert-success').contains('Brand successfully deleted').should('be.visible');
    });
});
